package controller

import (
	authResp "SimpleDocker/controller/auth"
	authService "SimpleDocker/service/auth"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Login  POST 登录接口
func Login(api *gin.Context) {
	var req authResp.LoginRequest
	err := api.BindJSON(&req)
	if err != nil {
		api.JSON(http.StatusNotFound, &authResp.LoginResponse{
			Status: 400,
			Msg:    "JSON序列化错误",
		})
		return
	}

	loginResponse := authService.Login(req.Username, req.Password)
	api.JSON(http.StatusOK, loginResponse)
}

// Logout  POST 退出接口
func Logout(api *gin.Context) {
	resp := authResp.LogoutResponse{
		Status: 0,
		Msg:    "OK",
	}
	api.JSON(http.StatusOK, resp)
}
