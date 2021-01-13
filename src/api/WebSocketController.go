package api

import (
	"SimpleDocker/src/context"
	"github.com/astaxie/beego"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
	"net/http"
	"time"
)

type Client struct {
	conn *websocket.Conn // 用户websocket连接
	name string          // 用户名称
}

// 1.设置为公开属性(即首字母大写)，是因为属性值私有时，外包的函数无法使用或访问该属性值(如：json.Marshal())
// 2.`json:"name"` 是为了在对该结构类型进行json编码时，自定义该属性的名称
type Message struct {
	EventType byte   `json:"type"`    // 0表示用户发布消息；1表示用户进入；2表示用户退出
	Name      string `json:"name"`    // 用户名称
	Message   string `json:"message"` // 消息内容
}

type WebSocketController struct {
	beego.Controller
}

var clients = make(map[Client]bool)
var join = make(chan Client, 10)     // 用户加入通道
var leave = make(chan Client, 10)    // 用户退出通道
var message = make(chan Message, 10) //

func (c *WebSocketController) Get() {
	containerId := c.Ctx.Input.Query("containerId")

	// 检验http头中upgrader属性，若为websocket，则将http协议升级为websocket协议
	conn, err := websocket.Upgrade(c.Ctx.ResponseWriter, c.Ctx.Request, nil, 1024, 1024)

	if _, ok := err.(websocket.HandshakeError); ok {
		beego.Error("Not a websocket connection")
		http.Error(c.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		beego.Error("Cannot setup WebSocket connection:", err)
		return
	}

	conn.WriteMessage(1, []byte("\033[36m   _____ _                 __        ____             __\r\n"))
	conn.WriteMessage(1, []byte("\033[36m  / ___/(_)___ ___  ____  / /__     / __ \\____  _____/ /_____  _____\r\n"))
	conn.WriteMessage(1, []byte("\033[36m  \\__ \\/ / __ `__ \\/ __ \\/ / _ \\   / / / / __ \\/ ___/ //_/ _ \\/ ___/\r\n"))
	conn.WriteMessage(1, []byte("\033[36m ___/ / / / / / / / /_/ / /  __/  / /_/ / /_/ / /__/ ,< /  __/ /    \r\n"))
	conn.WriteMessage(1, []byte("\033[36m/____/_/_/ /_/ /_/ .___/_/\\___/  /_____/\\____/\\___/_/|_|\\___/_/     \r\n"))
	conn.WriteMessage(1, []byte("\033[36m                /_/                               						V0.0.2 \r\n\r\n"))
	containerClient, _ := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	create, err := containerClient.ContainerExecCreate(context.Ctx, containerId, types.ExecConfig{AttachStdin: true, AttachStdout: true, AttachStderr: true, Cmd: []string{"sh"}, Privileged: true, Tty: true})
	if err != nil {
		conn.WriteMessage(1, []byte("\033[31m SimpleDocker提示您: 容器终端连接失败，请根据下面的信息排查错误 ............... FAIL \033[0m \r\n \r\n"))
		conn.WriteMessage(1, []byte("\033[31m 容器报错信息: "+err.Error()+" \033[0m \r\n \r\n"))
		conn.Close()
		return
	}
	id := create.ID

	attach, err := containerClient.ContainerExecAttach(context.Ctx, id, types.ExecStartCheck{Detach: false, Tty: true})

	var client Client
	client.name = "ss"
	client.conn = conn
	conn.WriteMessage(1, []byte("\033[33m 欢迎您使用 SimpleDocker, 容器终端已为您连接成功 ............... OK \033[0m \r\n \r\n"))
	conn.WriteMessage(1, []byte("\033[32m 程序默认使用 /bin/sh 连接，如有必要请手动切换带 /bin/bash 或者其他 shell 环境  \033[0m \r\n \r\n"))

	// 如果用户列表中没有该用户
	if !clients[client] {
		join <- client
		beego.Info("user:", client.name, "websocket connect success!")
	}

	// 当函数返回时，将该用户加入退出通道，并断开用户连接
	defer func() {
		leave <- client
		client.conn.Close()
	}()

	go func() {
		for true {
			// 如果没有错误，则把用户发送的信息放入message通道中
			buf := make([]byte, 1)
			count, _ := attach.Conn.Read(buf)
			if count == 0 {
				time.Sleep(time.Millisecond * 10)
				continue
			}
			_ = conn.WriteMessage(1, buf)
		}
	}()

	// 由于WebSocket一旦连接，便可以保持长时间通讯，则该接口函数可以一直运行下去，直到连接断开
	for {
		// 读取消息。如果连接断开，则会返回错误
		_, msgStr, _ := client.conn.ReadMessage()
		if msgStr == nil || len(msgStr) == 0 {
			continue
		}
		_, _ = attach.Conn.Write(msgStr)
	}

}
