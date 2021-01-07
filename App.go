package main

import (
	"SimpleDocker/api"
	_ "SimpleDocker/context"
	_ "SimpleDocker/routers"
	"flag"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/astaxie/beego/plugins/cors"
	"io/ioutil"
	"os/exec"
	"strconv"
)

var port = flag.Int("port", 4050, "help message for flagname")

func stopCommand() {
	// 读取PID
	file, err := ioutil.ReadFile("/tmp/lock.simple.docker")
	if err != nil {
		return
	}
	pid, err := strconv.Atoi(string(file))
	if err != nil {
		logs.Info("PID 读取失败，无法关闭进程")
		return
	}

	// 执行Kill
	command := fmt.Sprintf("kill -9 %d", pid)
	logs.Info("Command = %s", command)
	exec.Command(command)
}

func main() {
	flag.Parse()

	// 配置静态资源
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
