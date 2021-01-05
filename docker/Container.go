package docker

import (
	"SimpleDocker/context"
	"bytes"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/go-connections/nat"
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
func NewContainer(imageName string, containerName string, env []string, portBinding map[nat.Port][]nat.PortBinding, pathBind []string) (containerId string, err error) {
	imageConfig := container.Config{Image: imageName, Env: env}

	hostConfig := container.HostConfig{PortBindings: portBinding, Binds: pathBind}
	resp, err := context.Cli.ContainerCreate(context.Ctx, &imageConfig, &hostConfig, nil, nil, containerName)
	if err != nil {
		_ = RemoveContainer(resp.ID, types.ContainerRemoveOptions{Force: true})
		return "", err
	}

	startConfig := types.ContainerStartOptions{}
	if err := context.Cli.ContainerStart(context.Ctx, resp.ID, startConfig); err != nil {
		_ = RemoveContainer(resp.ID, types.ContainerRemoveOptions{Force: true})
		return resp.ID, err
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
func RemoveContainer(containerId string, options types.ContainerRemoveOptions) error {
	return context.Cli.ContainerRemove(context.Ctx, containerId, options)
}

/** 查看容器信息 */
func GetContainerInfo(containerId string) (types.ContainerJSON, error) {
	return context.Cli.ContainerInspect(context.Ctx, containerId)
}

/** 查看日志数据 */
func GetContainerLog(containerId string, tail string) (string, error) {
	options := types.ContainerLogsOptions{ShowStdout: true}
	if tail != "" {
		options.Tail = tail
	}
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
