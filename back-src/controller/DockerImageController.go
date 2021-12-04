package controller

import (
	authService "SimpleDocker/service/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Docker 镜像相关

type DockerImageController struct {
}

func GetImageList(api *gin.Context) {
	list := authService.ImageList("123")
	api.JSON(http.StatusOK, list)
}
