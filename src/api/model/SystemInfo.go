package model

type SystemInfo struct {
	OS       string
	Arch     string
	HostName string
	Core     int
}

// 系统安全配置
type SystemSafeConfig struct {
	ContainerCreateMode string `json:"containerCreateMode"`
	EnableDockerLog      bool `json:"enableDockerLog"`
}

// 系统通知配置
type SystemNotificationConfig struct {
	ContainerStopNotifyUrl   string `json:"containerStopNotifyUrl"`
	ContainerDeleteNotifyUrl string `json:"containerDeleteNotifyUrl"`
	ImageDeleteNotifyUrl     string `json:"imageDeleteNotifyUrl"`
}
