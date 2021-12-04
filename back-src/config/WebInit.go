package config

import (
	"SimpleDocker/controller"
	"SimpleDocker/utils"
	"github.com/gin-gonic/gin"
)

// 初始化服务
func init() {
	engine := gin.Default()

	engine.Use(Cors())

	initAuthController(engine)

	err := engine.Run(":3364")
	if err != nil {
		utils.LogError("启动服务出现错误," + err.Error())
	} else {
		utils.LogInfo("启动服务出现成功¬")
	}
}

// 初始化授权相关Controller
func initAuthController(engine *gin.Engine) {
	group := engine.Group("/auth")
	group.POST("/login", controller.Login)
	group.POST("/logout", controller.Logout)

	// Docker 相关
	dockerGroup := engine.Group("/docker")
	dockerGroup.GET("/info", controller.GetDockerInfo)

	// 镜像相关
	imageGroup := engine.Group("/image")
	imageGroup.GET("/list", controller.GetImageList)

	// 容器相关
	containerGroup := engine.Group("/container")
	containerGroup.GET("/list", controller.GetContainerList)
}
