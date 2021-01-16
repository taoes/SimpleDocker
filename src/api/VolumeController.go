package api

import (
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"github.com/astaxie/beego"
	"strconv"
)

type VolumeController struct {
	beego.Controller
}

// 查询所有卷
// @router /api/volume [get]
func (c *VolumeController) GetVolumeList() {
	volumeList, err := docker.GetVolumeList()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(volumeList)
	c.ServeJSON()
}

// 创建新的卷
// @router /api/volume/new [get]
func (c *VolumeController) NewVolume() {
	name := c.Ctx.Input.Query("Name")
	driver := c.Ctx.Input.Query("driver")

	newVolume, err := docker.NewVolume(name, driver, map[string]string{})
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(newVolume)
	c.ServeJSON()
}

// 查询指定卷的信息
// @router /api/volume/:volumeId/info [get]
func (c *VolumeController) GetVolumeInfo(volumeId string) {
	volumeInfo, err := docker.VolumeInfo(volumeId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(volumeInfo)
	c.ServeJSON()
}

// 移除指定卷
// @router /api/volume/:volumeId/delete/:force [get]
func (c *VolumeController) RemoveVolume(volumeId string, force string) {
	forceValue, _ := strconv.ParseBool(force)
	err := docker.RemoveVolume(volumeId, forceValue)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

// 移除无用的卷
// @router /api/volume/prune [get]
func (c *VolumeController) PruneVolume() {
	_, err := docker.PruneVolume()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}
