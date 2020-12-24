package container

import (
	"SimpleDocker/context"
	"bytes"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"time"
)

func GetContainerList() []types.Container {
	containerList, err := context.Cli.ContainerList(context.Ctx, types.ContainerListOptions{All: true})
	if err != nil {
		panic(err)
		return []types.Container{}
	}
	return containerList
}

/** 创建一个容器 */
func NewContainer(imageName string) (containerId string, err error) {
	_, err = context.Cli.ImagePull(context.Ctx, imageName, types.ImagePullOptions{})
	if err != nil {
		return "", err
	}

	// 镜像配置
	imageConfig := container.Config{Image: imageName}
	resp, err := context.Cli.ContainerCreate(context.Ctx, &imageConfig, nil, nil, nil, "")
	if err != nil {
		return "", err
	}

	startConfig := types.ContainerStartOptions{}
	if err := context.Cli.ContainerStart(context.Ctx, resp.ID, startConfig); err != nil {
		panic(err)
	}
	return resp.ID, nil
}

/** 停止容器 */
func StopContainer(containerId string) error {
	return context.Cli.ContainerStop(context.Ctx, containerId, nil)
}

/** 启动一个已存在容器 */
func StartContainer(containerId string) error {
	options := types.ContainerStartOptions{}
	return context.Cli.ContainerStart(context.Ctx, containerId, options)
}

/** 重启启动一个已存在容器 */
func RestartContainer(containerId string) error {
	duration := time.Second * 20
	return context.Cli.ContainerRestart(context.Ctx, containerId, &duration)
}

/** 移除容器 */
func RemoveContainer(containerId string, force bool) error {
	options := types.ContainerRemoveOptions{Force: force}
	return context.Cli.ContainerRemove(context.Ctx, containerId, options)
}

/** 查看容器信息 */
func GetContainerInfo(containerId string) (types.ContainerJSON, error) {
	return context.Cli.ContainerInspect(context.Ctx, containerId)
}

/** 查看日志数据 */
func GetContainerLog(containerId string) (string, error) {
	options := types.ContainerLogsOptions{ShowStdout: true, Tail: "100"}
	logs, err := context.Cli.ContainerLogs(context.Ctx, containerId, options)
	if err != nil {
		return "", err
	}

	buf := new(bytes.Buffer)
	_, err = buf.ReadFrom(logs)
	if err != nil {
		return "", err
	}
	return buf.String(), nil
}

func GetContainer() {

}
