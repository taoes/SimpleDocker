package template

import (
	"SimpleDocker/src/context"
	"SimpleDocker/src/utils"
	"bytes"
	"errors"
	"io/ioutil"
	"os"
)

// ContainerTemplate 容器模板
type ContainerTemplate struct {
}

func ContainerTemplateList() ([]ContainerTemplate, error) {
	templateDir := utils.GetTemplateDir()
	fileContentByte, err :=  ioutil.ReadFile(templateDir + "/fixed_container_template.json");
	if err != nil {
		return nil, errors.New("读取文件失败")
	}

	fileContentType := string(fileContentByte)

	var result map[string]ContainerTemplate

}
