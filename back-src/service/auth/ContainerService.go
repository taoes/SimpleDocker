package authService

import (
	"SimpleDocker/service/context"
	"github.com/docker/docker/api/types"
)

func ContainerList(searchKey string) []types.Container {
	options := types.ContainerListOptions{All: true}
	containerList, err := context.Cli.ContainerList(context.Ctx, options)
	if err != nil {
		return make([]types.Container, 0)
	}
	return containerList
}
