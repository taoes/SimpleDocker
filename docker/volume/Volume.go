package container

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"strconv"
)

func GetVolumeList(ctx context.Context, cli *client.Client) []types.Container {
	return nil
}

func GetVolumeNames(ctx context.Context, cli *client.Client) []string {
	containerList := GetVolumeList(ctx, cli)
	var containerNames []string
	for index, container := range containerList {
		var containerName = ""
		status := container.Status
		for _, name := range container.Names {
			containerName = fmt.Sprintf("[[%-3s]](fg:green)%-30s [%s](fg:blue) ", strconv.Itoa(index), name, status)
		}
		containerNames = append(containerNames, containerName)
	}
	return containerNames
}
