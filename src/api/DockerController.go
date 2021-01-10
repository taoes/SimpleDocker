package api

import (
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"github.com/astaxie/beego"
)

type DockerController struct {
	beego.Controller
}

/** 获取Docker的信息 */
// @router /api/docker/info [get]
func (c *DockerController) DockerInfo() {
	imageList, err := docker.GetDockerInfo()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(imageList)
	c.ServeJSON()
}

/** 获取Docker的版本信息 */
// @router /api/docker/version [get]
func (c *DockerController) GetVersion() {
	version := docker.GetVersion()
	c.Data["json"] = utils.PackageData(version)
	c.ServeJSON()
}

// @router /api/docker/ping [get]
func (c *DockerController) Ping() {
	resp, err := docker.Ping()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(resp)
	c.ServeJSON()
}
