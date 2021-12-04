package authService

import (
	"SimpleDocker/service/context"
	"github.com/docker/docker/api/types"
)

type Version map[string]interface{}

// DockerInfo 获取Docker机器信息
func DockerInfo() (types.Info, error) {
	dockerInfo, err := context.Cli.Info(context.Ctx)
	if err != nil {
		return types.Info{}, err
	}
	return dockerInfo, nil
}

func DockerVersion() Version {
	clientVersion := context.Cli.ClientVersion()
	var version = make(Version)
	version["client"] = clientVersion

	serverVersion, err := context.Cli.ServerVersion(context.Ctx)
	if err == nil {
		version["server"] = serverVersion
	}
	return version
}


func DiskUsage() (types.DiskUsage, error) {
	return context.Cli.DiskUsage(context.Ctx)
}