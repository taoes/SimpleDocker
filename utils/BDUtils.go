package utils

import (
	"github.com/astaxie/beego/logs"
	"os"
)

var configLocation = "~/.local/simpleDocker/config"

//初始化
func init() {
	// 判断文件是否已存在
	exists, _ := PathExists(configLocation + "/auth.json")
	if exists {
		logs.Info("配置文件已存在")
		return
	}

	// 初始化文件

}

func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}
