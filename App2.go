package main

import (
	_ "SimpleDocker/routers"
	"SimpleDocker/src/api"
	_ "SimpleDocker/src/auth"
	_ "SimpleDocker/src/context"
	"github.com/astaxie/beego"
)

func main23() {

	beego.BConfig.CopyRequestBody = true
	beego.BConfig.WebConfig.Session.SessionOn = true

	// 配置静态资源
	beego.SetStaticPath("/", "./static")

	// 配置路由
	beego.Router("/container/", &api.TestController{})

	// 启动服务
	beego.Run(":8085")
}
