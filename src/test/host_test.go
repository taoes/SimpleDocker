package main

import (
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"github.com/docker/distribution/context"
	"github.com/docker/docker/client"
	"testing"
)

func TestHostInfo(t *testing.T) {
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	diff := client.DaemonHost()
	logs.Info("diff={}", diff)
}

func TestDiskUsage(t *testing.T) {
	ctx := context.Background()
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	diff, err := client.DiskUsage(ctx)
	if err != nil {
		logs.Error(err)
	}
	data, _ := json.Marshal(diff)
	logs.Info("diff={}", string(data))
}
