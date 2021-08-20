package template

import (
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"io/ioutil"
	"os"
)

// 获取所有的Docker配置模板数据
func GetAllConfigTemplate() map[string]string {
	templateDir := os.Getenv("SD_CONFIG_DIR")
	if templateDir == "" {
		templateDir = "/tmp"
	}
	file, err := os.Open(templateDir + "/docker_template")
	if err != nil {
		logs.Error("读取配置文件失败")
		return make(map[string]string, 0)
	}
	byteData, _ := ioutil.ReadAll(file)
	templateArray := make(map[string]string)
	json.Unmarshal(byteData, &templateArray)
	return templateArray
}

// TODO:上传更新模板文件
func UploadDockerTemplate() {

}

// TODO: 从URL中更新模板文件内容
func UpdateDockerTemplate() {

}
