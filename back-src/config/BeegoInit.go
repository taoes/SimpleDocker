package config

import (
	"SimpleDocker/back-src/controller"
	"github.com/astaxie/beego"
)

// 初始化服务
func _init(){
	// 初始化静态资源地址
	beego.SetStaticPath("/", "/static")

	// 初始化过滤器
	beego.InsertFilter("/*", beego.BeforeRouter, AuthHandler)

	// 初始化Controller
	initWebController()
}

func initWebController()  {
	beego.Include(&controller.AuthController{})
	beego.Include(&controller.ConfigController{})
	beego.Include(&controller.ContainerTerminalController{})
	beego.Include(&controller.DockerContainerController{})
	beego.Include(&controller.DockerNetworkController{})
	beego.Include(&controller.DockerVolumeController{})
	beego.Include(&controller.StatusController{})
}
