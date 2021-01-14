package model

// 镜像Tag请求模型
type ImageTagRequest struct {
	Source string `json:"source"`
	Tag    string `json:"tag"`
}
