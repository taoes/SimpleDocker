package main

import (
	"SimpleDocker/api"
	_ "SimpleDocker/context"
	_ "SimpleDocker/routers"
	"flag"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"github.com/astaxie/beego/plugins/cors"
	"net/http"
	"strconv"
)

var port = flag.Int("port", 4050, "help message for flagname")

var success = []byte("SUPPORT OPTIONS")

var corsFunc = func(ctx *context.Context) {
	origin := ctx.Input.Header("Origin")
	ctx.Output.Header("Access-Control-Allow-Methods", "OPTIONS,DELETE,POST,GET,PUT,PATCH")
	ctx.Output.Header("Access-Control-Max-Age", "3600")
	ctx.Output.Header("Access-Control-Allow-Headers", "x-requested-with,X-Custom-Header,accept,Content-Type,Access-Token")
	ctx.Output.Header("Access-Control-Allow-Credentials", "true")
	ctx.Output.Header("Access-Control-Allow-Origin", origin)
	if ctx.Input.Method() == http.MethodOptions {
		// options请求，返回200
		ctx.Output.SetStatus(http.StatusOK)
		_ = ctx.Output.Body(success)
	}
}

func main() {
	flag.Parse()

	// 配置静态资源
	beego.InsertFilter("/*", beego.BeforeRouter, corsFunc)
	beego.SetStaticPath("/", "./static")

	// 配置路由
	beego.Include(&api.DockerController{})
	beego.Include(&api.ContainerController{})
	beego.Include(&api.ImageController{})
	beego.Include(&api.VolumeController{})
	beego.Include(&api.NetworkController{})

	// 添加CORS
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true}))

	// 启动服务
	beego.Run(":" + strconv.Itoa(*port))
}
