package api

import (
	"SimpleDocker/src/notify"
	"bufio"
	"context"

	//"SimpleDocker/src/context"
	"github.com/astaxie/beego"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
)

type TestController struct {
	beego.Controller
}

//@router /api/notify/test [get]
func (c *TestController) TestDingTalk() {
	url := c.Ctx.Input.Query("url")
	respMessage := notify.SendTestMessage(url)
	c.Data["json"] = respMessage
	c.ServeJSON()
}

func (c *TestController) Get() {
	Cli, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	attach, _ := Cli.ContainerAttach(context.Background(), "4f02abc388a8", types.ContainerAttachOptions{Stream: true, Stdout: true})
	chErr := make(chan error, 1)
	go func() {
		defer close(chErr)
		rdr := bufio.NewReader(attach.Reader)
		for i := 0; i < 5; i++ {
			_, _, err := rdr.ReadLine()
			if err != nil {
				chErr <- err
				return
			}
		}
	}()
}
