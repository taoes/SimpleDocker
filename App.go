package main

import (
	_ "SimpleDocker/routers"
	"SimpleDocker/src/api"
	"SimpleDocker/src/auth"
	"SimpleDocker/src/config"
	"SimpleDocker/src/context"
	_ "SimpleDocker/src/context"
	"SimpleDocker/src/db"
	"flag"
	"strconv"

	"github.com/astaxie/beego"
)

var port = flag.Int("port", 4050, "服务启动端口,默认值 4050")
var resPath = flag.String("res", "static", "静态资源的路径,默认值 static")

// 目前主分支属于开发分支，默认账号密码为 admin/123456
func main() {
	flag.StringVar(&db.RedisAddr, "redis-addr", "redis:6379", "Redis addr")
	flag.Parse()

	db.InitDB()
	auth.InitConfig()
	beego.BConfig.CopyRequestBody = true
	beego.BConfig.WebConfig.Session.SessionOn = true

	// 配置静态资源
	beego.SetStaticPath("/", context.Config.ExecDir+"/"+*resPath)

	// 配置路由
	beego.Include(&api.DockerController{})
	beego.Include(&api.ContainerController{})
	beego.Include(&api.ImageController{})
	beego.Include(&api.VolumeController{})
	beego.Include(&api.NetworkController{})
	beego.Include(&api.LoginController{})
	beego.Include(&api.FileController{})
	beego.Include(&api.TerminalController{})
	beego.Include(&api.SystemController{})
	beego.Include(&api.TestController{})

	// 添加CORS 以及权限校验 &&  启动服务
	beego.InsertFilter("/*", beego.BeforeRouter, config.Handler)
	beego.Run(":" + strconv.Itoa(*port))
}
