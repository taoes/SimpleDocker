package main

import (
	_ "SimpleDocker/routers"
	"SimpleDocker/src/api"
	_ "SimpleDocker/src/auth"
	"SimpleDocker/src/config"
	_ "SimpleDocker/src/context"
	"flag"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"os"
	"path/filepath"
	"strconv"
)

var port = flag.Int("port", 4050, "服务启动端口,默认值 4050")
var resPath = flag.String("res", "static", "静态资源的路径,默认值 static")

func main() {
	flag.Parse()
	ex, err := os.Executable()
	if err != nil {
		logs.Error(err)
		return
	}
	exPath := filepath.Dir(ex)

	beego.BConfig.CopyRequestBody = true
	beego.BConfig.WebConfig.Session.SessionOn = true

	// 配置静态资源
	beego.SetStaticPath("/", exPath+"/"+*resPath)

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
	beego.InsertFilter("/*", beego.BeforeRouter, config.Handler)

	// 启动服务
	beego.Run(":" + strconv.Itoa(*port))
}
