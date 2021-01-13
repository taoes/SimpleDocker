package main

import (
	"context"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
	"net/http"
	"testing"
	"time"
)

func TestSocket(t *testing.T) {

	beego.Router("/web", &WebController{})
	beego.Run(":9999")
}

type WebController struct {
	beego.Controller
}

type Message struct {
	Msg string `json:"msg"`
}

var upgrader = websocket.Upgrader{}
var broadcast = make(chan string)

var clients = make(map[*websocket.Conn]bool)

func (c *WebController) Get() {
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
	ws, err := upgrader.Upgrade(c.Ctx.ResponseWriter, c.Ctx.Request, nil)
	if err != nil {
		logs.Error(err)
	}
	//  defer ws.Close()

	client, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	create, err := client.ContainerExecCreate(context.Background(), "7a0bcedf0ffc", types.ExecConfig{AttachStdin: true, AttachStdout: true, AttachStderr: true, Cmd: []string{"sh"}, Privileged: true, Tty: false, DetachKeys: "ctrl-c"})
	if err != nil {
		print("ERR.....")
		logs.Info(err)
		return
	}
	id := create.ID

	attach, err := client.ContainerExecAttach(context.Background(), id, types.ExecStartCheck{Detach: false, Tty: false})


	clients[ws] = true

	//go handleMessages()
	//不断的广播发送到页面上
	go func() {
		for {
			//目前存在问题 定时效果不好 需要在业务代码替换时改为beego toolbox中的定时器
			_, data, _ := ws.ReadMessage()
			command := string(data)
			logs.Info("接收到数据" + command)
			if command == "" {
				continue
			}
			_, err = attach.Conn.Write([]byte(command + "\n"))
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
			for client := range clients {
				client.WriteJSON(Message{
					Msg: x,
				})
			}
		}
	}()
}

func handleMessages() {
	for {
		msg := <-broadcast
		fmt.Println("clients len ", len(clients))
		for client := range clients {
			err := client.WriteJSON(Message{Msg: msg})
			if err != nil {
				logs.Info("client.WriteJSON error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
