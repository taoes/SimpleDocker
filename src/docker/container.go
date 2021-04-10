package docker

import (
	"SimpleDocker/src/api/model"
	"SimpleDocker/src/context"
	"bytes"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/go-connections/nat"
	"io"
	"strconv"
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
	networkConfig := network.NetworkingConfig{}

	resp, err := context.Cli.ContainerCreate(context.Ctx, &imageConfig, &hostConfig, &networkConfig, nil, containerName)
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

/** 创建一个容器(复杂模式) */
func CreateNewContainer(model model.ContainerCrateModel) (containerId string, err error) {

	// 环境变量
	var envList []string
	for i := range model.EnvList {
		envList = append(envList, model.EnvList[i].Path)
	}
	imageConfig := container.Config{Image: model.ImageTag, Env: envList, Hostname: model.HostName}

	// 端口映射 KEY: "TCP/[]" VALUE:{HOST_IP:"",HOST_PORT:""}
	portBindings := map[nat.Port][]nat.PortBinding{}
	for i := range model.PortMapping {
		mapping := model.PortMapping[i]
		portBinding := nat.PortBinding{HostIP: "", HostPort: mapping.HostPort.String()}
		portBindings[nat.Port(mapping.ContainerPort.String()+"/tcp")] = []nat.PortBinding{portBinding}
	}
	// 配置存储卷
	var binds []string
	for i := range model.MountDirList {
		mount := model.MountDirList[i]
		mountType := mount.Type
		path := ""
		if mountType == "dir" {
			path = mount.HostDir + ":" + mount.ContainerDir
		}
		binds = append(binds, path)
	}

	// 资源限制
	cpu, _ := model.CpuCoreLimit.Int64()
	memory, _ := model.MemoryLimit.Int64()
	resources := container.Resources{}
	if cpu != 0 {
		resources.CPUShares = cpu
	}
	if memory != 0 {
		resources.Memory = memory
	}

	// 最大重启次数
	maxRestartCount, _ := strconv.Atoi(model.MaxRestartCount.String())
	restartPolicy := container.RestartPolicy{MaximumRetryCount: maxRestartCount}

	hostConfig := container.HostConfig{PortBindings: portBindings, Binds: binds, RestartPolicy: restartPolicy}

	networkConfig := network.NetworkingConfig{}
	resp, err := context.Cli.ContainerCreate(context.Ctx, &imageConfig, &hostConfig, &networkConfig, nil, model.ContainerName)

	// 如果创建失败，则移除容器
	if err != nil {
		_ = RemoveContainer(resp.ID, types.ContainerRemoveOptions{Force: true})
		return "", err
	}

	// 创建成功则启动容器，启动失败则移除容器
	startConfig := types.ContainerStartOptions{}
	if err := context.Cli.ContainerStart(context.Ctx, resp.ID, startConfig); err != nil {
		_ = RemoveContainer(resp.ID, types.ContainerRemoveOptions{Force: true})
		return "", err
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
