package api

import (
	"SimpleDocker/src/api/model"
	"SimpleDocker/src/auth"
	"SimpleDocker/src/db"
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"crypto/md5"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"strings"
)

type LoginController struct {
	beego.Controller
}

// @router /api/docker/login [post]
func (c *LoginController) Login() {
	var authConfig types.AuthConfig
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &authConfig)
	authInfo, err := docker.Login(authConfig)
	if err != nil {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,密码无效")
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(authInfo)
	c.ServeJSON()
}

// SystemLogin 系统登录服务
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

	// 真实密码
	realPassword := db.ReadFromConfig("password")

	// MD5密码
	passwordMd5 := fmt.Sprintf("%X", md5.Sum([]byte(name+"+"+password)))

	logs.Info(realPassword)
	logs.Info(passwordMd5)
	// 验证密码
	if name == "admin" && passwordMd5 == realPassword {
		token, _ := auth.GeneratorToken(name)
		c.Data["json"] = utils.PackageData(token)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageErrorMsg("账号或密码错误")
	db.Del("token")
	c.ServeJSON()
}

// SystemLogout 系统退出
// @router /api/system/logout
func (c *LoginController) SystemLogout() {
	c.DestroySession()
	c.Data["json"] = utils.PackageData("退出成功")
	db.Del("token")
	c.ServeJSON()
}

// @router /api/system/update/password [post]
func (c *LoginController) UpdatePassword() {
	var resetReq model.ResetPasswordRequest
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &resetReq)
	nP := resetReq.NewPassword
	oP := resetReq.OldPassword

	if oP = strings.Trim(oP, " "); oP == "" {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,原密码错误")
		c.ServeJSON()
		return
	}

	if nP = strings.Trim(nP, " "); nP == "" {
		c.Data["json"] = utils.PackageErrorMsg("登录失败,新密码无效")
		c.ServeJSON()
		return
	}

	err := auth.UpdatePassword(oP, nP)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.PackageData("密码更新成功")
	}
	c.ServeJSON()
}
