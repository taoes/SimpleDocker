package docker

import (
	"SimpleDocker/src/context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/api/types/network"
)

func GetNetwork() ([]types.NetworkResource, error) {
	var options types.NetworkListOptions
	return context.Cli.NetworkList(context.Ctx, options)
}

func GetNetworkInfo(networkId string) (types.NetworkResource, error) {
	var options types.NetworkInspectOptions
	return context.Cli.NetworkInspect(context.Ctx, networkId, options)
}

func CreateNetwork(networkName string, driver string) (types.NetworkCreateResponse, error) {
	options := types.NetworkCreate{Driver: driver}
	return context.Cli.NetworkCreate(context.Ctx, networkName, options)
}

func RemoveNetwork(networkName string) error {
	return context.Cli.NetworkRemove(context.Ctx, networkName)
}

/** 容器连接网络 */
func ConnectNetwork(containerId string, networkId string) error {
	var options *network.EndpointSettings
	return context.Cli.NetworkConnect(context.Ctx, networkId, containerId, options)
}

/** 容器断开网络 */
func DisconnectNetwork(containerId string, networkId string, force bool) error {
	return context.Cli.NetworkDisconnect(context.Ctx, networkId, containerId, force)
}

/** 精简网络 */
func PruneNetwork() (types.NetworksPruneReport, error) {
	var filter filters.Args
	return context.Cli.NetworksPrune(context.Ctx, filter)
}
