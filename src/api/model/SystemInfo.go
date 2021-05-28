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
	EnableDockerLog     bool   `json:"enableDockerLog"`
	BackDir     string   `json:"backDir"`
}

// 系统通知配置
type SystemNotificationConfig struct {
	NotifyUrl string `json:"notifyUrl"`
}
