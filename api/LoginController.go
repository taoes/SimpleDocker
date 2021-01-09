package api

import (
	"SimpleDocker/api/model"
	"SimpleDocker/auth"
	"SimpleDocker/docker"
	"SimpleDocker/utils"
	"encoding/json"
	"github.com/astaxie/beego"
	"strings"
)

type LoginController struct {
	beego.Controller
}

// @router /api/docker/login
func (c *LoginController) Login() {

	name := c.Ctx.Input.Query("username")
	password := c.Ctx.Input.Query("password")

	if name = strings.Trim(name, " "); name == "" {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,用户名无效")
		c.ServeJSON()
		return
	}

	if name = strings.Trim(password, " "); password == "" {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,密码无效")
		c.ServeJSON()
		return
	}

	_, err := docker.Login(name, password)
	if err != nil {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,密码无效")
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

// @router /api/system/login [post]
func (c *LoginController) SystemLogin() {
	var loginReq model.LoginRequest
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &loginReq)
	name := loginReq.Username
	password := loginReq.Password

	if name = strings.Trim(name, " "); name == "" {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,用户名无效")
		c.ServeJSON()
		return
	}

	if password = strings.Trim(password, " "); password == "" {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,密码无效")
		c.ServeJSON()
		return
	}

	if name == "admin" && password == "123" {
		token, _ := auth.GeneratorToken()
		c.Data["json"] = utils.PackageData(token)
	} else {
		c.Data["json"] = utils.PackageErrorMsg("账号或密码错误")
	}
	c.ServeJSON()
}

// @router /api/system/logout
func (c *LoginController) SystemLogout() {
	c.DestroySession()
	c.Data["json"] = utils.PackageData("退出成功")
	c.ServeJSON()
}
