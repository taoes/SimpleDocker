package config

import (
	"SimpleDocker/controller"
	"SimpleDocker/utils"
	"github.com/gin-gonic/gin"
)

// 初始化服务
func init() {
	engine := gin.Default()

	initAuthController(engine)

	err := engine.Run(":3363")
	if err != nil {
		utils.LogError("启动服务出现错误,"+err.Error())
	}else{
		utils.LogInfo("启动服务出现成功¬")
	}
}

// 初始化授权相关Controller
func initAuthController(engine *gin.Engine) {
	group := engine.Group("/auth")
	group.POST("/login", controller.Login)
	group.POST("/logout", controller.Logout)
}
