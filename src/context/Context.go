package context

import (
	"context"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/client"
	"net"
	"net/http"
)

var Ctx context.Context
var Cli *client.Client
var _ http.Client

func init() {
	var err error

	Ctx = context.Background()
	Cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	_ = http.Client{
		Transport: &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				return net.Dial("unix", "/var/run/docker.sock")
			},
		},
	}
	if err != nil {
		logs.Info("初始化Docker上下文....FAIL!")
		return
	}
	logs.Info("初始化Docker上下文....OK!")
}
