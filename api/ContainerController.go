package api

import (
	"SimpleDocker/docker/container"
	"SimpleDocker/utils"
	"github.com/astaxie/beego"
)

type ContainerController struct {
	beego.Controller
}

/** 获取容器列表 */
// @router /api/container [get]
func (c *ContainerController) Get() {
	containerList := container.GetContainerList()
	c.Data["json"] = containerList
	c.ServeJSON()
}

/** 启动一个新的容器 */
// @router /api/container/:imageName [put]
func (c *ContainerController) CreateNewContainer(imageName string) {
	containerId, err := container.NewContainer(imageName)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.PackageData(containerId)
	c.ServeJSON()
}

/** 启动容器 */
// @router /api/container/:containerId/start [get]
func (c *ContainerController) StartContainer(containerId string) {
	err := container.StartContainer(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 启动容器 */
// @router /api/container/:containerId/restart [get]
func (c *ContainerController) RestartContainer(containerId string) {
	err := container.RestartContainer(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 停止容器 */
// @router /api/container/:containerId/stop [get]
func (c *ContainerController) StopContainer(containerId string) {
	err := container.StopContainer(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 移除容器 */
// @router /api/container/:containerId [delete]
func (c *ContainerController) RemoveContainer(containerId string) {
	err := container.RemoveContainer(containerId, false)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 查看容器信息 */
// @router /api/container/:containerId/info [get]
func (c *ContainerController) GetContainerInfo(containerId string) {
	info, err := container.GetContainerInfo(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.PackageData(info)
	c.ServeJSON()
}

/** 查看容器日志 */
// @router /api/container/:containerId/log [get]
func (c *ContainerController) GetContainerLog(containerId string) {
	logs, err := container.GetContainerLog(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.PackageData(logs)
	c.ServeJSON()
}
