package main

import (
	"context"
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"io"
	"os"
	"testing"
	"time"
)

func TestContainerDiff(t *testing.T) {
	ctx := context.Background()
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	diff, err := client.ContainerList(ctx, types.ContainerListOptions{})
	if err != nil {
		logs.Error(err)
	}
	data, _ := json.Marshal(diff)
	logs.Info("diff={}", string(data))
}

func TestContainerLogs(t *testing.T) {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 50*time.Second)
	defer cancel()
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	diff, err := client.ContainerLogs(ctx, "56973f264950", types.ContainerLogsOptions{ShowStdout: true,ShowStderr: true,Follow: true})
	_, err = io.Copy(os.Stdout, diff)
	if err != nil && err != io.EOF {
		logs.Error(err)

	}
}

func TestContainPathInfo(t *testing.T)  {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	stat, err := client.ContainerStatPath(ctx, "56973f264950","/tmp")
	if err != nil && err != io.EOF {
		logs.Error(err)

	}
	data, _ := json.Marshal(stat)
	logs.Info("diff={}", string(data))
}

func TestContainTop(t *testing.T)  {
	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
	defer cancel()
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	stat, err := client.ContainerTop(ctx, "f10869aa5f37",make([]string,0))
	if err != nil && err != io.EOF {
		logs.Error(err)

	}
	data, _ := json.Marshal(stat)
	logs.Info("diff={}", string(data))
}
