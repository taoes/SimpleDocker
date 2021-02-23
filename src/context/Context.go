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
	"path/filepath"
	"runtime"
)

var Ctx context.Context
var Cli *client.Client
var Config SystemConfig

type SystemConfig struct {
	HomeDir string `comment:"HOME 目录"`
	ExecDir string `comment:"文件执行目录"`
}

func init() {
	var err error
	err = initContent()
	if err != nil {
		logs.Error("初始化Docker上下文失败")
		logs.Error(err)
		os.Exit(-1)
	}

	logs.Info("初始化Docker上下文................OK!")

	reduceHomePath(&Config)
	reduceExecPath(&Config)
	logs.Info("推断运行目录信息  ................OK!")

	monitorDockerEvent()
	logs.Info("初始化Docker监控 ................OK!")

}

func initContent() error {
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

// 监控Docker事件
func monitorDockerEvent() {
	events, errors := Cli.Events(Ctx, types.EventsOptions{})
	go func() {
		for true {
			select {
			case event := <-events:
				marshal, _ := json.Marshal(event)
				logs.Info("监控到Docker事件:%s", string(marshal))
			case err := <-errors:
				logs.Error("监控到Docker错误事件")
				logs.Error(err)
			}
		}

	}()
}

// 推断Home目录
func reduceHomePath(config *SystemConfig) {
	homeDir, err := os.UserHomeDir()
	if err != nil {
		logs.Info("Home 目录获取失败....FAIL!")
		homeDir = "/tmp"
	}
	homeDir = homeDir + "/.local/simpleDocker"
	config.HomeDir = homeDir
}

// 推断命令的目录
func reduceExecPath(config *SystemConfig) {
	ex, err := os.Executable()
	if err != nil {
		logs.Error(err)
		return
	}
	execDir := filepath.Dir(ex)
	config.ExecDir = execDir
}
