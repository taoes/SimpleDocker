package docker

import (
	"SimpleDocker/src/context"
	"github.com/docker/docker/api/types"
	"io"
)

func ContainerFileSystem(containerId string) (types.HijackedResponse, string, error) {
	options := types.ExecConfig{AttachStdout: true, AttachStdin: true, AttachStderr: true, Privileged: true, Tty: true, Cmd: []string{"sh"}}
	execResp, err := context.Cli.ContainerExecCreate(context.Ctx, containerId, options)
	if err != nil {
		return types.HijackedResponse{}, "", err
	}
	id := execResp.ID
	attach, err := context.Cli.ContainerExecAttach(context.Ctx, id, types.ExecStartCheck{Detach: false, Tty: true})
	if err != nil {
		return types.HijackedResponse{}, "", err
	}
	return attach, execResp.ID, nil
}

// 上传文件
func UploadFileToContainer(containerId string, dstPath string, content io.Reader) error {
	copyOptions := types.CopyToContainerOptions{AllowOverwriteDirWithFile: true}
	return context.Cli.CopyToContainer(context.Ctx, containerId, dstPath, content, copyOptions)
}

// 下载文件
func DownloadFileToContainer(containerId string, srcPath string) (io.ReadCloser, types.ContainerPathStat, error) {
	return context.Cli.CopyFromContainer(context.Ctx, containerId, srcPath)
}
