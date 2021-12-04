package context

import (
	"context"
	"github.com/docker/docker/client"
	"net"
	"net/http"
	"os"
	"runtime"
)

var Ctx context.Context
var Cli *client.Client

func init() {
	err := GetDockerContext()
	if err != nil {
		os.Exit(-1)
	}

}

//GetDockerContext  获取 Docker 上下文
func GetDockerContext()  error{
	var err error
	Ctx = context.Background()
	Cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	_ = http.Client{
		Transport: &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				if runtime.GOOS == "darwin" || runtime.GOOS == "linux" {
					return net.Dial("unix", "/var/run/docker.sock")
				} else {
					return net.Dial("unix", "/var/run/docker.sock")
				}
			},
		},
	}
	return err

}
