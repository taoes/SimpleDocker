package api

import (
	"SimpleDocker/src/template"
	"SimpleDocker/src/utils"
	"github.com/astaxie/beego"
)

type TemplateController struct {
	beego.Controller
}

// ContainerTemplateList 容器模板集合
// @router /api/container
func (c *TemplateController) ContainerTemplateList() {
	tmpList, err := template.ContainerTemplateList()
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
		c.ServeJSON()
		return
	}
	c.Data["json"] = utils.PackageData(tmpList)
	c.ServeJSON()
}

// CreateContainerTemplate 创建容器模板
// @router /api/container/template
func (c *TemplateController) CreateContainerTemplate() {

}

// UpdateImageTemplate 更新容器模板

// DeleteImageTemplate 删除容器模板
