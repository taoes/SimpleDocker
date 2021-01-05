package api

import (
	"SimpleDocker/docker"
	"SimpleDocker/utils"
	"errors"
	"github.com/astaxie/beego"
	"strings"
)

type NetworkController struct {
	beego.Controller
}

/** 获取网络列表 */
// @router /api/network [get]
func (c *NetworkController) GetNetworkList() {
	networkList, err := docker.GetNetwork()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.PackageData(networkList)
	}
	c.ServeJSON()
}

/** 获取网络列表 */
// @router /api/network/:networkId/info [get]
func (c *NetworkController) GetNetworkInfo(networkId string) {
	networkList, err := docker.GetNetworkInfo(networkId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.PackageData(networkList)
	}
	c.ServeJSON()
}

/** 创建新的网络 */
//@router /api/network/new [get]
func (c *NetworkController) CreateNetworkList() {
	name := c.Ctx.Input.Query("name")
	driver := c.Ctx.Input.Query("driver")
	name = strings.Trim(name, " ")

	if name == "" {
		c.Data["json"] = utils.PackageError(errors.New("网络名称不能为空"))
		c.ServeJSON()
		return
	}

	network, err := docker.CreateNetwork(name, strings.Trim(driver, " "))
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.PackageData(network)
	}
	c.ServeJSON()
}

//@router /api/network/:networkId/delete [get]
func (c *ContainerController) RemoveNetwork(networkId string) {
	networkId = strings.Trim(networkId, " ")
	if networkId == "" {
		c.Data["json"] = utils.PackageError(errors.New("网络名称不能为空"))
		c.ServeJSON()
		return
	}

	err := docker.RemoveNetwork(networkId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.Success()
	}
	c.ServeJSON()
}

/** 容器连接网络 */
//@router /api/network/:networkId/container/:containerId/:operator [get]
func (c *NetworkController) ConnectNetwork(containerId string, networkId string, operator string) {
	containerId = strings.Trim(containerId, " ")
	networkId = strings.Trim(networkId, " ")

	if containerId == "" || networkId == "" {
		c.Data["json"] = utils.PackageError(errors.New("容器或者网络ID不能为空"))
		c.ServeJSON()
		return
	}

	var err error
	switch operator {
	case "connect":
		err = docker.ConnectNetwork(containerId, networkId)
	case "disconnect":
		err = docker.DisconnectNetwork(containerId, networkId, true)
	}

	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.Success()
	}
	c.ServeJSON()
}
