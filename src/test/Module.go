package main

import (
	"bufio"
	"context"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"os"
	"time"
)

//func TestDockerApi(t *testing.T) {
//	httpc := http.Client{
//		Transport: &http.Transport{
//			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
//				return net.Dial("unix", "/var/run/docker.sock")
//			},
//		},
//	}
//
//	var response *http.Response
//	var err error
//
//	response, err = httpc.PostForm("http://unix/images/create?fromImage=python:latest", nil)
//
//	if err != nil {
//		panic(err)
//	}
//	io.Copy(os.Stdout, response.Body)
//	fmt.Printf("OK......")
//}

func main() {
	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	create, err := client.ContainerExecCreate(context.Background(), "3045a8d9be2c", types.ExecConfig{AttachStdin: true, AttachStdout: true, AttachStderr: true, Cmd: []string{"bash"}, Privileged: true, Tty: true})
	if err != nil {
		print("ERR.....")
		logs.Info(err)
		return
	}
	id := create.ID

	attach, err := client.ContainerExecAttach(context.Background(), id, types.ExecStartCheck{Detach: false, Tty: true})

	go func() {
		input := bufio.NewScanner(os.Stdin)
		for input.Scan() {
			data := input.Text()
			attach.Conn.SetReadDeadline(time.Now().Add(time.Second))
			_, err = attach.Conn.Write([]byte(data + "\n"))
			if err != nil {
				logs.Info(err)
			}
		}
	}()

	go func() {
		for true {
			x, _ := attach.Reader.ReadString('\n')
			if len(x) == 0 {
				time.Sleep(100 * time.Millisecond)
				continue
			}
			print(x)
		}

	}()

	time.Sleep(1000 * time.Second)
	print("OK")

}

func main2() {

	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())

	attach, err := client.ContainerAttach(context.Background(), "3045a8d9be2c", types.ContainerAttachOptions{Stdin: true, Stdout: true})
	if err != nil {
		print("ERR")
		return
	}

	go func() {
		input := bufio.NewScanner(os.Stdin)
		for input.Scan() {
			_, _ = attach.Conn.Write([]byte("cal\n"))
			print(".")
		}

	}()

	go func() {
		for true {
			buf := make([]byte, 10)
			x, _ := attach.Conn.Read(buf)
			if x == 0 {
				time.Sleep(100 * time.Millisecond)
				continue
			}
			println(string(buf))

		}

	}()

	time.Sleep(1000 * time.Second)
	println("END")
}
