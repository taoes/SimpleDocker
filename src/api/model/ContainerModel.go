package model

// 容器相关服务模型
type ContainerModel struct {
	Source string `json:"source"`
	Tag    string `json:"tag"`
}

// 查询文件信息
type FileInfoRequest struct {
	Path string
	Name string
}
