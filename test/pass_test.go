package test

import (
	model2 "SimpleDocker/src/api/model"
	"crypto/md5"
	"encoding/json"
	"fmt"
	"github.com/docker/docker/api/types/container"
	"testing"
)

/**
测试生成密码的问题
*/
func TestPassword(t *testing.T) {
	npMd5 := fmt.Sprintf("%X", md5.Sum([]byte("123456+SimpleDocker2020")))
	println(npMd5)
}

/**
测试
*/
func TestSerializer(t *testing.T) {
	s := container.HostConfig{}
	marshal, err := json.Marshal(s)
	if err != nil {
		print("ERR")
	}
	println(string(marshal))
}

func TestContainerCreateModel(t *testing.T) {

	var model model2.ContainerCrateModel
	var s = "{ \"envList\": [ { \"path\": \"JAVA_HOME=/user/home\" } ], \"mountDirList\": [ { \"type\": \"dir\", \"containerDir\": \"/user/home\", \"hostDir\": \"/user/home\", \"mountId\": \"\" } ], \"readonly\": \"false\", \"portMapping\": [ { \"hostPort\": 123, \"containerPort\": 4345 }, { \"hostPort\": \"8080\", \"containerPort\": \"8090\" } ], \"imageTag\": \"paketobuildpacks/run:tiny-cnbaf\", \"imageId\": \"a610062c2241\", \"containerName\": \"paketobuildpacks/run:tiny-cnbaf\", \"hostname\": \"HostName\", \"cpuCoreLimit\": \"1\", \"memoryLimit\": \"1024\" }"
	err := json.Unmarshal([]byte(s), &model)
	if err != nil {
		print(err.Error())
		return
	}
	print(s)
}
