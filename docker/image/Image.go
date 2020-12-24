package image

import (
	"SimpleDocker/context"
	"github.com/docker/docker/api/types"
	"io"
)

func GetImageList() ([]types.ImageSummary, error) {
	images, err := context.Cli.ImageList(context.Ctx, types.ImageListOptions{})
	if err != nil {
		return nil, err
	}
	return images, nil
}

// 获取镜像信息
func GetImageInfo(imageId string) (types.ImageInspect, error) {
	raw, _, err := context.Cli.ImageInspectWithRaw(context.Ctx, imageId)
	if err != nil {
		return types.ImageInspect{}, err
	}
	return raw, nil
}

func TagImage(source string, target string) error {
	return context.Cli.ImageTag(context.Ctx, source, target)
}

func DeleteImage(imageId string, forge bool) error {
	removeOption := types.ImageRemoveOptions{Force: forge}
	_, err := context.Cli.ImageRemove(context.Ctx, imageId, removeOption)
	if err != nil {
		return err
	}
	return nil
}

func SaveImage(imageId string) (io.ReadCloser, error) {
	return context.Cli.ImageSave(context.Ctx, []string{imageId})
}
