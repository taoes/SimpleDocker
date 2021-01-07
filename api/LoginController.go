package api

import (
	"SimpleDocker/docker"
	"SimpleDocker/utils"
	"github.com/astaxie/beego"
	"strings"
)

type LoginController struct {
	beego.Controller
}

// router /api/docker/login
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
