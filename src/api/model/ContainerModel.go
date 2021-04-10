package model

import "encoding/json"

// 创建容器模型
type ContainerCrateModel struct {
	EnvList         []EnvConfig   `json:"envList"`
	MountDirList    []VolumeMount `json:"mountDirList"`
	PortMapping     []PortMapping `json:"portMapping"`
	ImageTag        string        `json:"imageTag"`
	ImageId         string        `json:"imageId"`
	ContainerName   string        `json:"containerName"`
	HostName        string        `json:"hostname"`
	CpuCoreLimit    json.Number   `json:"cpuCoreLimit"`
	MemoryLimit     json.Number   `json:"memoryLimit"`
	MaxRestartCount json.Number   `json:"maxRestartCount"`
}

// 容器挂载目录
type VolumeMount struct {
	Type         string `json:"type"`
	ContainerDir string `json:"containerDir"`
	HostDir      string `json:"hostDir"`
	MountId      string `json:"mountId"`
}

type PortMapping struct {
	HostPort      json.Number `json:"hostPort,omitempty"`
	ContainerPort json.Number `json:"containerPort,omitempty"`
}

type EnvConfig struct {
	Path string `json:"path"`
}

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
