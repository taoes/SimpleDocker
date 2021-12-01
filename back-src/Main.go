package main

import (
	_ "SimpleDocker/back-src/config"
	"github.com/astaxie/beego"
)

func main() {
	// 解析参数

	// 运行服务
	beego.Run(":3364")
}
