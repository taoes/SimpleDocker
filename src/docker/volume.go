package docker

import (
	"SimpleDocker/src/context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	"github.com/docker/docker/api/types/volume"
)

/** 获取 Volume 列表  */
func GetVolumeList() (volume.VolumeListOKBody, error) {
	filter := filters.Args{}
	return context.Cli.VolumeList(context.Ctx, filter)
}

/** 创建新的 Volume  */
func NewVolume(name string, driver string, labels map[string]string) (types.Volume, error) {
	body := volume.VolumeCreateBody{Name: name, Driver: driver, Labels: labels}
	return context.Cli.VolumeCreate(context.Ctx, body)
}

/** 查询 Volume 信息 */
func VolumeInfo(volumeId string) (types.Volume, error) {
	return context.Cli.VolumeInspect(context.Ctx, volumeId)
}

/** 移除 Volume */
func RemoveVolume(volumeId string, force bool) error {
	return context.Cli.VolumeRemove(context.Ctx, volumeId, force)
}

/** 移除无用的Volume */
func PruneVolume() (types.VolumesPruneReport, error) {
	var arg filters.Args
	return context.Cli.VolumesPrune(context.Ctx, arg)
}
