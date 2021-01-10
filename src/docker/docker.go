package docker

import (
	"SimpleDocker/src/context"
	"github.com/docker/docker/api/types"
)

type Version map[string]interface{}

/**获取Docker相关信息*/
func GetDockerInfo() (types.Info, error) {
	info, err := context.Cli.Info(context.Ctx)
	if err != nil {
		return types.Info{}, err
	}
	return info, nil
}

/**获取客户端版本以及服务器端版本*/
func GetVersion() Version {
	clientVersion := context.Cli.ClientVersion()
	var version = make(Version)
	version["client"] = clientVersion

	serverVersion, err := context.Cli.ServerVersion(context.Ctx)
	if err == nil {
		version["server"] = serverVersion
	}
	return version
}

/** 检查Docker服务是否正常 */
func Ping() (types.Ping, error) {
	return context.Cli.Ping(context.Ctx)
}

// 磁盘使用
func Disk() (types.DiskUsage, error) {
	return context.Cli.DiskUsage(context.Ctx)
}
