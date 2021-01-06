package docker

import (
	"SimpleDocker/context"
	"github.com/docker/docker/api/types"
	"github.com/pkg/errors"
	"io"
	"os"
)

func GetImageList() ([]types.ImageSummary, error) {
	images, err := context.Cli.ImageList(context.Ctx, types.ImageListOptions{})
	if err != nil {
		return nil, err
	}
	return images, nil
}

func PullImage(refStr string) (io.ReadCloser, error) {
	var options types.ImagePullOptions
	return context.Cli.ImagePull(context.Ctx, refStr, options)
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
	removeOption := types.ImageRemoveOptions{Force: forge, PruneChildren: true}
	_, err := context.Cli.ImageRemove(context.Ctx, imageId, removeOption)
	if err != nil {
		return err
	}
	return nil
}

func SaveImage(imageId string) (io.ReadCloser, error) {
	return context.Cli.ImageSave(context.Ctx, []string{imageId})
}

/** 导入镜像 */
func ImportImage(filePath string) (types.ImageLoadResponse, error) {
	open, err := os.OpenFile(filePath, os.O_RDWR, 666)
	if err != nil {
		return types.ImageLoadResponse{}, errors.New("读取文件失败")
	}
	return context.Cli.ImageLoad(context.Ctx, open, false)
}
