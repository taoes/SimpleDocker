package docker

import (
	"SimpleDocker/src/context"
	"SimpleDocker/src/db"
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
func SaveImageToLocal(imageTag string, name string) error {
	if strings.Trim(name, "") == "" || strings.Trim(name, "") == "" {
		return errors.New("备份容器失败，文件名或者镜像名不能为空")
	}

	// 读取保存文件的配置地址
	address := db.ReadWithDefault("exportLocalAdd", "/tmp/simple/image")
	err := os.MkdirAll(address+"/simple/image", os.ModePerm)
	if err != nil {
		logs.Error("备份镜像失败，该镜像所在目录:{} 创建失败", address)
		return err
	}
	fullPath := fmt.Sprintf("%s/%s", address, name)
	if _, err := os.Stat(fullPath); os.IsExist(err) {
		return errors.New("文件已存在，请尝试重新输入新的文件名")
	}

	body, err := context.Cli.ImageSave(context.Ctx, []string{imageTag})
	if err != nil {
		return err
	}
	content, err := ioutil.ReadAll(body)

	err = ioutil.WriteFile(fullPath, content, os.ModePerm)
	if err != nil {
		return err
	}
	return nil

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
