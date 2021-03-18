package docker

import (
	"SimpleDocker/src/context"
	"bytes"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/go-connections/nat"
	"io"
	"time"
)

func GetContainerList() []types.Container {
	containerList, err := context.Cli.ContainerList(context.Ctx, types.ContainerListOptions{All: true, Latest: true})
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

/** 操作容器 */
func OperatorContainer(containerId string, operator string) error {
	switch operator {
	case "start":
		options := types.ContainerStartOptions{}
		return context.Cli.ContainerStart(context.Ctx, containerId, options)
	case "stop":
		return context.Cli.ContainerStop(context.Ctx, containerId, nil)
	case "restart":
		duration := time.Second * 20
		return context.Cli.ContainerRestart(context.Ctx, containerId, &duration)
	case "pause":
		return context.Cli.ContainerPause(context.Ctx, containerId)
	case "unpause":
		return context.Cli.ContainerUnpause(context.Ctx, containerId)
	case "prune":
		var filter filters.Args
		_, err := context.Cli.ContainersPrune(context.Ctx, filter)
		return err
	default:
		return nil
	}
}

func RenameContainer(containerId string, newName string) error {
	return context.Cli.ContainerRename(context.Ctx, containerId, newName)
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

/** 导出容器 */
func ExportContainer(containerId string) (io.ReadCloser, error) {
	return context.Cli.ContainerExport(context.Ctx, containerId)
}

// 调整TTYSize
func ResizeContainerTty(containerId string, execId string, w uint, h uint) error {
	err := context.Cli.ContainerExecResize(context.Ctx, execId, types.ResizeOptions{Width: w, Height: h})
	err = context.Cli.ContainerResize(context.Ctx, containerId, types.ResizeOptions{Width: w, Height: h})
	return err
}

// 容器监控信息
func MonitorContainer(containerId string) (types.ContainerStats, error) {
	return context.Cli.ContainerStats(context.Ctx, containerId, false)
}
