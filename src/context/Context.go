package context

import (
	"context"
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"net"
	"net/http"
	"os"
)

var Ctx context.Context
var Cli *client.Client
var Httpc http.Client
var systemConfig SystemConfig

type SystemConfig struct {
	Dir string
}

func init() {
	var err error

	Ctx = context.Background()
	Cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	Httpc = http.Client{
		Transport: &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				return net.Dial("unix", "/var/run/docker.sock")
			},
		},
	}
	if err != nil {
		logs.Error("初始化Docker上下文....FAIL!")
		return
	}

	homeDir, err := os.Hostname()
	if err != nil {
		logs.Info("Home 目录获取失败....FAIL!")
		homeDir = "/tmp"
		return
	}
	homeDir = homeDir + "/.local/simpleDocker"
	systemConfig.Dir = homeDir

	logs.Info("初始化Docker上下文................OK!")

	op := types.EventsOptions{}
	events, errors := Cli.Events(Ctx, op)
	go func() {
		for true {

			select {
			case event := <-events:
				logs.Error("监控到Docker事件")
				marshal, _ := json.Marshal(event)
				logs.Info(string(marshal))
			case err := <-errors:
				logs.Error("监控到Docker错误事件")
				logs.Error(err)
			}
		}

	}()
	logs.Info("初始化Docker监控................OK!")

}
