package api

import (
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

func (c *TestController) Get() {
	//httpc := http.Client{
	//	Transport: &http.Transport{
	//		DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
	//			return net.Dial("unix", "/var/run/docker.sock")
	//		},
	//	},
	//}
	//
	//var response *http.Response
	//var err error
	//
	////response, err = httpc.PostForm("http://unix/images/create?fromImage=python:latest", nil)
	//response, err = httpc.PostForm("http://unix/containers/4f02abc388a8/exec", nil)
	//
	//if err != nil {
	//	panic(err)
	//}
	//io.Copy(c.Ctx.ResponseWriter, response.Body)

	//Ctx = context.Background()
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
