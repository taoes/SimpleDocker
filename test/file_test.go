package test

import (
	"github.com/astaxie/beego/logs"
	"io/ioutil"
	"os"
	"testing"
)

// 测试创建文件
func TestCreateBaseOperator(t *testing.T) {
	body := []byte("123")
	os.MkdirAll("/tmp", os.ModePerm)
	err := ioutil.WriteFile("/tmp/2.txt", body, os.ModePerm)
	if err != nil {
		logs.Error("文件创建失败")
		print(err.Error())
	} else {
		logs.Info("文件创建成功")
	}
}
