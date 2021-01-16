package model

import (
	"strings"
)

type ContainerAndPath struct {
	ContainerId   string `json:"containerId"`
	ContainerPath string `json:"containerPath"`
}

type ContainerCategoryInfo struct {
	Code        int
	Msg         string
	SumSize     string
	SubCategory []ContainerCategoryModel
}

// 容器相关服务模型
type ContainerCategoryModel struct {
	FileType       string
	Permission     string
	LinkCount      string
	FileAuthor     string
	FileGroup      string
	FileSize       string
	ModifyDatetime string
	Name           string
}

func ParseForContainerCategoryModel(data string) (ContainerCategoryInfo, error) {
	info := ContainerCategoryInfo{}
	// 按照回车键划分
	split := strings.Split(data, "\r\n")
	models := make([]ContainerCategoryModel, 0)
	for i := 1; i < len(split)-5; {
		if i%5 == 1 {
			mode := ContainerCategoryModel{}
			mode.Name = split[i]
			mode.FileSize = split[i+1]
			mode.FileType = split[i+2]
			mode.Permission = split[i+3]
			mode.ModifyDatetime = split[i+4]
			models = append(models, mode)
		}
		i = i + 5
	}
	info.SubCategory = models
	return info, nil
}
