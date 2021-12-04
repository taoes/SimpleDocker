package test

import (
	"SimpleDocker/service/context"
	"encoding/json"
	"testing"
)

func TestDockerInfo(t *testing.T) {
	info, err := context.Cli.Info(context.Ctx)
	if err != nil {
		print("ERROR")
	}
	print(json.Marshal(info))
}
