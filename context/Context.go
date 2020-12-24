package context

import (
	"context"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/client"
)

var Ctx context.Context
var Cli *client.Client

func init() {
	var err error

	Ctx = context.Background()
	Cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		logs.Info("初始化Docker上下文....FAIL!")
		return
	}
	logs.Info("初始化Docker上下文....OK!")
}
