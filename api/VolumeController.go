package api

import (
	"SimpleDocker/docker/volume"
	"SimpleDocker/utils"
	"github.com/astaxie/beego"
)

type VolumeController struct {
	beego.Controller
}

// 查询所有卷
// @router /api/volume [get]
func (c *VolumeController) GetVolumeList() {
	volumeList, err := volume.GetVolumeList()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(volumeList)
	c.ServeJSON()
}

// 创建新的卷
// @router /api/volume/:name [put]
func (c *VolumeController) NewVolume(name string) {
	volume, err := volume.NewVolume(name)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(volume)
	c.ServeJSON()
}

// 查询指定卷的信息
// @router /api/volume/:volumeId [get]
func (c *VolumeController) GetVolumeInfo(volumeId string) {
	volume, err := volume.VolumeInfo(volumeId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(volume)
	c.ServeJSON()
}

// 移除指定卷
// @router /api/volume/:volumeId [delete]
func (c *VolumeController) RemoveVolume(volumeId string) {
	err := volume.RemoveVolume(volumeId, false)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}
