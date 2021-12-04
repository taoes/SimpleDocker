package controller

import (
	authService "SimpleDocker/service/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Docker 容器相关


func GetContainerList(api *gin.Context){
	search := api.Query("search")
	list := authService.ContainerList(search)
	api.JSON(http.StatusOK,list)
}