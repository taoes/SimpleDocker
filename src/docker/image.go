package docker

import (
	"SimpleDocker/src/context"
	"bytes"
	"fmt"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	"github.com/pkg/errors"
	"io"
	"io/ioutil"
	"os"
	"strings"
	"time"
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

func PushImage(refStr string) (io.ReadCloser, error) {
	var options types.ImagePushOptions
	return context.Cli.ImagePush(context.Ctx, refStr, options)
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

/** 导出镜像 */
func SaveImage(imageTag string) (io.ReadCloser, error) {
	return context.Cli.ImageSave(context.Ctx, []string{imageTag})
}

/** 导出镜像到本地 */
func SaveImageToLocal(imageTag string, fileName string) (string, error) {
	if strings.Trim(fileName, "") == "" || strings.Trim(fileName, "") == "" {
		fileName = imageTag + "_" + time.Now().Format("2006-01-02-15-04-05.tar.gz")
	}

	// 读取保存文件的配置地址
	address := "/tmp/back/image"
	err := os.MkdirAll(address, os.ModePerm)
	if err != nil {
		logs.Error("备份镜像失败，该镜像所在目录:{} 创建失败", address)
		return fileName, err
	}
	fullPath := fmt.Sprintf("%s/%s", address, fileName)
	if _, err := os.Stat(fullPath); os.IsExist(err) {
		return fullPath, errors.New("文件已存在，请尝试重新输入新的文件名")
	}

	body, err := context.Cli.ImageSave(context.Ctx, []string{imageTag})
	if err != nil {
		return fullPath, err
	}
	content, err := ioutil.ReadAll(body)

	err = ioutil.WriteFile(fullPath, content, os.ModePerm)
	if err != nil {
		return fullPath, err
	}
	return fullPath, nil

}

func PruneImage() (types.ImagesPruneReport, error) {
	var filter filters.Args
	return context.Cli.ImagesPrune(context.Ctx, filter)
}

/** 导入镜像 */
func ImportImage(filePath string) (string, error) {
	open, err := os.OpenFile(filePath, os.O_RDWR, 666)
	if err != nil {
		return "", errors.New("读取文件失败")
	}

	load, err := context.Cli.ImageLoad(context.Ctx, open, false)

	buf := new(bytes.Buffer)
	_, _ = buf.ReadFrom(load.Body)

	return buf.String(), err
}
