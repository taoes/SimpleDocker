package authService

import (
	"SimpleDocker/service/context"
	"github.com/docker/docker/api/types"
)

func ImageList(searchKey string) []types.ImageSummary {
	options := types.ImageListOptions{}
	imageList, err := context.Cli.ImageList(context.Ctx, options)
	if err != nil {

	}
	return imageList
}

func PushImage(imageId string) {

}

func PullImage(image string) {

}

func RemoveImage(imageId string) error {
	return nil
}
