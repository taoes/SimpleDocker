package main

import (
	_ "SimpleDocker/routers"
	"SimpleDocker/src/api"
	_ "SimpleDocker/src/auth"
	_ "SimpleDocker/src/context"
	"SimpleDocker/src/utils"
	"encoding/json"
	"errors"
	"flag"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/context"
	"net/http"
	"strconv"
	"strings"
)

var port = flag.Int("port", 4050, "help message for flagname")

// 跨域配置
var beforeFilterHandleFunc = func(ctx *context.Context) {
	origin := ctx.Input.Header("Origin")
	ctx.Output.Header("Access-Control-Allow-Methods", "OPTIONS,DELETE,POST,GET,PUT,PATCH")
	ctx.Output.Header("Access-Control-Max-Age", "3600")
	ctx.Output.Header("Access-Control-Allow-Headers", "x-requested-with,X-Custom-Header,accept,Content-Type,Access-Token,authorization")
	ctx.Output.Header("Access-Control-Allow-Credentials", "true")
	ctx.Output.Header("Access-Control-Allow-Origin", origin)

	// options请求，返回200
	if ctx.Input.Method() == http.MethodOptions {
		ctx.Output.SetStatus(http.StatusOK)
		_ = ctx.Output.Body([]byte("SUPPORT OPTIONS"))
	} else {
		url := ctx.Input.URL()
		if url != "/api/system/login" && !strings.HasPrefix(url, "/ws") {
			header := ctx.Input.Header("Authorization")
			if header == "" {
				ctx.Output.Status = 200
				respData := utils.PackageError(errors.New("登录过期"))
				marshal, _ := json.Marshal(respData)
				_ = ctx.Output.Body(marshal)
			}
		}
	}
}

func main() {
	flag.Parse()

	beego.BConfig.CopyRequestBody = true
	beego.BConfig.WebConfig.Session.SessionOn = true

	// 配置静态资源
	beego.SetStaticPath("/", "./static")

	// 配置路由
	beego.Include(&api.DockerController{})
	beego.Include(&api.ContainerController{})
	beego.Include(&api.ImageController{})
	beego.Include(&api.VolumeController{})
	beego.Include(&api.NetworkController{})
	beego.Include(&api.LoginController{})
	beego.Include(&api.FileController{})
	beego.Include(&api.TerminalController{})

	// 添加CORS 以及权限校验
	beego.InsertFilter("/*", beego.BeforeRouter, beforeFilterHandleFunc)

	// 启动服务
	beego.Run(":" + strconv.Itoa(*port))
}
