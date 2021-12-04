package controller

import (
	authService "SimpleDocker/service/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

// 系统状态相关

func GetDockerInfo(api *gin.Context) {
	info, err := authService.DockerInfo()
	version := authService.DockerVersion()
	disk, err := authService.DiskUsage()
	if err != nil {
		api.JSON(http.StatusBadGateway, err.Error())
		return
	}
	if err != nil {
		api.JSON(http.StatusBadGateway, err.Error())
	} else {
		group := make(map[string]interface{},2)
		group["info"] = info
		group["version"] = version
		group["disk"] = disk
		api.JSON(http.StatusOK, group)
	}
}
