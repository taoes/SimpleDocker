package api

import (
	"SimpleDocker/docker/container"
	"SimpleDocker/utils"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/docker/docker/api/types"
	"github.com/docker/go-connections/nat"
	"strconv"
	"strings"
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
// @router /api/container/run [get]
func (c *ContainerController) CreateNewContainer() {
	imageName := c.Ctx.Input.Query("imageName")
	containerName := c.Ctx.Input.Query("containerName")
	port := c.Ctx.Input.Query("bindPort")
	env := c.Ctx.Input.Query("env")

	// 解析端口映射和环境变量
	var envSplit []string
	var portKeySplit []string

	if env = strings.Trim(env, " "); env != "" {
		envSplit = strings.Split(env, ";")
	}

	portBindings := map[nat.Port][]nat.PortBinding{}
	if port = strings.Trim(port, " "); port != "" {
		portKeySplit = strings.Split(port, " ")

		for portKeyIndex := range portKeySplit {
			portKey := portKeySplit[portKeyIndex]
			ports := strings.Split(portKey, ":")
			if len(ports) != 2 {
				continue
			}
			portBinding := nat.PortBinding{HostIP: "", HostPort: ports[1]}
			portBindings[nat.Port(ports[0])] = []nat.PortBinding{portBinding}
		}
	}

	containerId, err := container.NewContainer(imageName, containerName, envSplit, portBindings)
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

/** 重启容器 */
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
// @router /api/container/:containerId/delete [get]
func (c *ContainerController) RemoveContainer(containerId string) {
	var err error
	volume, _ := strconv.ParseBool(c.Ctx.Input.Query("volume"))
	link, _ := strconv.ParseBool(c.Ctx.Input.Query("link"))
	force, _ := strconv.ParseBool(c.Ctx.Input.Query("force"))

	var options = types.ContainerRemoveOptions{RemoveVolumes: volume, RemoveLinks: link, Force: force}
	err = container.RemoveContainer(containerId, options)
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
	logs, err := container.GetContainerLog(containerId, "200")
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.PackageData(logs)
	c.ServeJSON()
}

// 下载全部日志
// @router /api/container/:containerId/log/all [get]
func (c *ContainerController) GetContainerAllLog(containerId string) {
	logs, err := container.GetContainerLog(containerId, "")
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	// 准备下载文件

	logsByte := []byte(logs)
	c.Ctx.Output.Header("Content-Type", "application/force-download")
	c.Ctx.Output.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s-all.log", containerId))
	c.Ctx.Output.Header("Content-Transfer-Encoding", "binary")
	_, _ = c.Ctx.ResponseWriter.Write(logsByte)
}
