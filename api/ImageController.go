package api

import (
	"SimpleDocker/docker/image"
	"SimpleDocker/utils"
	"bytes"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"strconv"
)

type ImageController struct {
	beego.Controller
}

/** 查询全部Image */
// @router /api/image [get]
func (c *ImageController) GetImageList() {
	imageList, err := image.GetImageList()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = imageList
	c.ServeJSON()
}

/** 查询Image信息 */
// @router /api/image/:imageId [get]
func (c *ImageController) GetImageInfo(imageId string) {
	imageInfo, err := image.GetImageInfo(imageId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = imageInfo
	c.ServeJSON()
}

/** 删除Image */
// @router /api/image/:imageId/remove/:forge [get]
func (c *ImageController) DeleteImage(imageId string, forge string) {
	b, _ := strconv.ParseBool(forge)
	err := image.DeleteImage(imageId, b)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 修改Image标签 */
// @router /api/image/tag [get]
func (c *ImageController) TagImage() {
	source := c.Ctx.Input.Query("source")
	tag := c.Ctx.Input.Query("tag")

	logs.Info(source)
	logs.Info(tag)
	err := image.TagImage(source, tag)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

/** 导出Image到指定目录 */
// @router /api/image/:imageId/save [get]
func (c *ImageController) SaveImage(imageId string) {
	reader, err := image.SaveImage(imageId)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}

	buf := new(bytes.Buffer)
	_, _ = buf.ReadFrom(reader)
	i := buf.Bytes()
	c.Ctx.Output.Header("Content-Type", "application/force-download")
	c.Ctx.Output.Header("Content-Disposition", fmt.Sprintf("attachment;filename=%s.tar.gz", imageId))
	c.Ctx.Output.Header("Content-Transfer-Encoding", "binary")
	_, _ = c.Ctx.ResponseWriter.Write(i)
}

/** 导入Image */
// @router
func (c *ImageController) ImportImage() {
	c.Data["json"] = utils.PackageErrorMsg("暂不支持导入镜像,请期待后续版本")
	c.ServeJSON()
}
