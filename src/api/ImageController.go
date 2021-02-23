package api

import (
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"io"
	"strconv"
	"strings"
	"time"
)

type ImageController struct {
	beego.Controller
}

type ImportImageInfo struct {
	ImageId  string `json:"imageId"`
	ImageTag string `json:"imageTag"`
}

// @router /api/image [get]
func (c *ImageController) GetImageList() {
	imageList, err := docker.GetImageList()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = imageList
	c.ServeJSON()
}

// @router /api/image/:imageId [get]
func (c *ImageController) GetImageInfo(imageId string) {
	imageInfo, err := docker.GetImageInfo(imageId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = imageInfo
	c.ServeJSON()
}

// @router /api/image/:imageId/remove/:forge [get]
func (c *ImageController) DeleteImage(imageId string, forge string) {
	b, _ := strconv.ParseBool(forge)
	err := docker.DeleteImage(imageId, b)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

// @router /api/image/tag [get]
func (c *ImageController) TagImage() {
	source := c.Ctx.Input.Query("source")
	tag := c.Ctx.Input.Query("tag")

	logs.Info(source)
	logs.Info(tag)
	err := docker.TagImage(source, tag)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

// @router /api/image/save [post]
func (c *ImageController) SaveImage() {

	var requestBody ImportImageInfo
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &requestBody)

	reader, err := docker.SaveImage(requestBody.ImageTag)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	buf := new(bytes.Buffer)
	_, _ = buf.ReadFrom(reader)
	i := buf.Bytes()
	c.Ctx.Output.Header("Content-Type", "application/force-download")
	c.Ctx.Output.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s.tar.gz", requestBody.ImageId))
	c.Ctx.Output.Header("Content-Transfer-Encoding", "binary")
	_, _ = c.Ctx.ResponseWriter.Write(i)
}

// @router /api/image/pull [get]
func (c *ImageController) PullImage() {
	refStr := c.Ctx.Input.Query("refStr")
	refStr = strings.Trim(refStr, " ")
	image, err := docker.PullImage(refStr)
	if err != nil {
		_, _ = io.Copy(c.Ctx.Output.Context.ResponseWriter, strings.NewReader(err.Error()))
	} else {
		_, _ = io.Copy(c.Ctx.Output.Context.ResponseWriter, image)
	}
}

// @router /api/image/push [get]
func (c *ImageController) PushImage() {
	refStr := c.Ctx.Input.Query("refStr")
	refStr = strings.Trim(refStr, " ")
	image, err := docker.PushImage(refStr)
	if err != nil {
	}
	buf := new(bytes.Buffer)
	_, _ = buf.ReadFrom(image)
	c.Data["json"] = utils.PackageData(buf.String())
	c.ServeJSON()
}

// @router /api/image/prune [delete]
func (c *ImageController) PruneImage() {
	report, err := docker.PruneImage()
	if err != nil {
		c.Data["json"] = "获取文件失败,请重新上传文件"
	} else {
		c.Data["json"] = utils.PackageData(report)
	}
	c.ServeJSON()
}

/** 导入Image */
// @router /api/image/import [post]
func (c *ImageController) ImportImage() {
	file, _, err := c.GetFile("file")
	if err != nil {
		c.Data["json"] = "获取文件失败,请重新上传文件"
		c.ServeJSON()
		return
	}
	defer file.Close()
	saveFilePath := "/tmp/" + strconv.FormatInt(time.Now().Unix(), 10)
	err = c.SaveToFile("file", saveFilePath)

	if err != nil {
		c.Data["json"] = "保存文件失败，请检查文件是否存在"
		c.ServeJSON()
		return
	}
	resp, err := docker.ImportImage(saveFilePath)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	c.Data["json"] = utils.PackageData(resp)
	c.ServeJSON()
}
