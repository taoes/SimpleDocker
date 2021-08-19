package db

import (
	"SimpleDocker/src/utils"
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"io/ioutil"
	"os"
)

var DEFAULT_CONFIG = map[string]string{
	"username":           "admin",
	"password":           "123456",
	"enableDockerLog":    "false",
	"containerNotifyUrl": "",
	"backCategory":       "/tmp",
}

// InitConfig 初始化配置文件
func InitConfig() {
	// 判断文件夹是否已存在,不存在则使用默认值
	configDir := os.Getenv("SD_CONFIG_DIR")
	if configDir == "" {
		configDir = os.Getenv("HOME") + "/config"
	}
	exists, _ := utils.PathExists(configDir)
	if exists {
		logs.Info("配置文件目录存在,{}", configDir)
	} else {
		os.MkdirAll(configDir, os.ModePerm)
	}

	// 判断文件是否存在
	configPath := configDir + "/config.json"
	fileExists, _ := utils.PathExists(configPath)
	if fileExists {
		logs.Info("配置文件目录存在,跳过初始化{}", configDir)
		return
	}

	// 初始化文件
	file, err := os.Create(configPath)
	defer file.Close()
	if err != nil {
		logs.Error("文件创建出现异常，请检查,configPath=%s", configPath)
		os.Exit(101)
	}

	// 写入文件
	data, _ := json.Marshal(DEFAULT_CONFIG)
	file.Write(data)
	logs.Info("初始化配置文件完成")

}
func getAllConfig() map[string]string {
	configDir := os.Getenv("SD_CONFIG_DIR")
	file, err := os.Open(configDir + "/config")
	defer file.Close()
	if err != nil {
		return make(map[string]string)
	}
	data, _ := ioutil.ReadAll(file)
	config := make(map[string]string)
	err = json.Unmarshal(data, &config)
	return config
}

func ReadFromConfig(key string) string {
	config := getAllConfig()
	return config[key]
}

func ReadWithDefaultFromConfig(key string, defaultValue string) {

}

func writeToConfig(key string, value string) {
	config := getAllConfig()
	config[key] = value
	updateConfigFile(config)
}

func delFromConfig(key string) {
	config := getAllConfig()
	delete(config, key)
	updateConfigFile(config)
}

func updateConfigFile(configMap map[string]string) {
	configPath := os.Getenv("SD_CONFIG_DIR") + "/config"
	file, err := os.Create(configPath)
	defer file.Close()
	if err != nil {
		logs.Error("文件创建出现异常，请检查,configPath=%s", configPath)
		os.Exit(101)
	}
	byteData, _ := json.Marshal(configMap)
	file.Write(byteData)
	logs.Info("配置写入文件完成")
}
