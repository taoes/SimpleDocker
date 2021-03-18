package api

import (
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"bytes"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/docker/docker/api/types"
	"github.com/docker/go-connections/nat"
	"io/ioutil"
	"strconv"
	"strings"
)

type ContainerController struct {
	beego.Controller
}

/** 获取容器列表 */
// @router /api/container [get]
func (c *ContainerController) Get() {
	containerList := docker.GetContainerList()
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
	volume := c.Ctx.Input.Query("volume")

	// 解析端口映射和环境变量
	var envSplit []string
	var portKeySplit []string
	var volumePathSplit []string

	// 解析环境变量
	if env = strings.Trim(env, " "); env != "" {
		envSplit = strings.Split(env, ";")
	}

	// 解析端口绑定
	portBindings := map[nat.Port][]nat.PortBinding{}
	if port = strings.Trim(port, " "); port != "" {
		portKeySplit = strings.Split(port, ";")

		for portKeyIndex := range portKeySplit {
			portKey := portKeySplit[portKeyIndex]
			ports := strings.Split(portKey, ":")
			if len(ports) != 2 {
				continue
			}
			portBinding := nat.PortBinding{HostIP: "", HostPort: ports[0]}
			portBindings[nat.Port(ports[1]+"/tcp")] = []nat.PortBinding{portBinding}
		}
	}

	// 解析目录挂载
	if volume = strings.Trim(volume, " "); volume != "" {
		volumePathSplit = strings.Split(volume, ";")
	}

	containerId, err := docker.NewContainer(imageName, containerName, envSplit, portBindings, volumePathSplit)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.PackageData(containerId)
	c.ServeJSON()
}

/** 启动/重启/停止/暂停/清空 容器 */
// @router /api/container/:containerId/:operator [get]
func (c *ContainerController) StartContainer(containerId string, operator string) {
	err := docker.OperatorContainer(containerId, operator)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 启动/重启/停止/暂停/清空 容器 */
// @router /api/container/:containerId/rename/:newName [get]
func (c *ContainerController) RenameContainer(containerId string, newName string) {
	err := docker.RenameContainer(containerId, newName)
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
	err = docker.RemoveContainer(containerId, options)
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
	info, err := docker.GetContainerInfo(containerId)
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
	logs, err := docker.GetContainerLog(containerId, "200")
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
	logs, err := docker.GetContainerLog(containerId, "")
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	logsByte := []byte(logs)
	c.Ctx.Output.Header("Content-Type", "application/force-download")
	c.Ctx.Output.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s-all.log", containerId))
	c.Ctx.Output.Header("Content-Transfer-Encoding", "binary")
	_, _ = c.Ctx.ResponseWriter.Write(logsByte)
}

// 容器导出
// @router /api/container/:containerId/export [get]
func (c *ContainerController) ExportContainer(containerId string) {
	info, err := docker.ExportContainer(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	buf := new(bytes.Buffer)
	_, _ = buf.ReadFrom(info)
	bytesData := buf.Bytes()
	c.Ctx.Output.Header("Content-Type", "application/force-download")
	c.Ctx.Output.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s.tar.gz", containerId))
	c.Ctx.Output.Header("Content-Transfer-Encoding", "binary")
	_, _ = c.Ctx.ResponseWriter.Write(bytesData)
}

// 容器监控
// @router /api/container/:containerId/monitor/info [get]
func (c *ContainerController) Monitor(containerId string) {
	container, err := docker.MonitorContainer(containerId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
	} else {
		c.Ctx.Output.Header("Content-Type", "application/json")
		all, _ := ioutil.ReadAll(container.Body)
		_, _ = c.Ctx.ResponseWriter.Write(all)
	}

}
