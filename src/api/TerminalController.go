package api

import (
	"SimpleDocker/src/api/model"
	"SimpleDocker/src/context"
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/gorilla/websocket"
	"net/http"
	"time"
)

// 1.设置为公开属性(即首字母大写)，是因为属性值私有时，外包的函数无法使用或访问该属性值(如：json.Marshal())
// 2.`json:"Name"` 是为了在对该结构类型进行json编码时，自定义该属性的名称
type Message struct {
	EventType byte   `json:"type"`    // 0表示用户发布消息；1表示用户进入；2表示用户退出
	Name      string `json:"Name"`    // 用户名称
	Message   string `json:"message"` // 消息内容
}

type TerminalController struct {
	beego.Controller
}

var clients = make(map[model.Client]bool)
var join = make(chan model.Client, 20)  // 用户加入通道
var leave = make(chan model.Client, 20) // 用户退出通道

func init() {
	go TerminalBroadcaster()
}

// 网络连接
// @router /ws/api/container/terminal/:execId [get]
func (c *TerminalController) ConnectContainer(execId string) {

	// 检验http头中upgrader属性，若为websocket，则将http协议升级为websocket协议
	conn, err := websocket.Upgrade(c.Ctx.ResponseWriter, c.Ctx.Request, nil, 1024, 1024)

	if _, ok := err.(websocket.HandshakeError); ok {
		logs.Error("Not a websocket connection")
		http.Error(c.Ctx.ResponseWriter, "Not a websocket handshake", 400)
		return
	} else if err != nil {
		logs.Error("Cannot setup WebSocket connection:", err)
		return
	}
	// 打印终端Banner
	printBanner(conn)

	attach, err := context.Cli.ContainerExecAttach(context.Ctx, execId, types.ExecStartCheck{Detach: false, Tty: true})

	var client model.Client
	client.Name = execId
	client.Conn = conn

	// 如果用户列表中没有该用户
	if !clients[client] {
		// 连接成功后输出欢迎语句
		printWelcome(conn)
		join <- client
		logs.Info("容器ID:", client.Name, "WebSocket 连接成功!")
	}

	// 当函数返回时，将该用户加入退出通道，并断开用户连接
	defer func() {
		_ = client.Conn.Close()
		attach.Close()

		leave <- client
	}()

	// 持续读取消息
	go func() {
		for true {
			buf := make([]byte, 100)
			count, _ := attach.Reader.Read(buf)
			if count == 0 {
				time.Sleep(time.Millisecond * 10)
				continue
			}
			_ = conn.WriteMessage(websocket.BinaryMessage, buf)
		}
	}()

	// 持续接收消息，并将消息发送到 容器的连接中
	for {
		// 读取消息。如果连接断开，则会返回错误
		_, msgStr, _ := client.Conn.ReadMessage()
		if msgStr == nil || len(msgStr) == 0 {
			continue
		}
		_, _ = attach.Conn.Write(msgStr)
	}
}

// 调整终端Size
// @router /api/container/:containerId/exec/:execId/:w/:h/resize [get]
func (c *TerminalController) ResizeContainerTerminal(containerId string, execId string, w uint, h uint) {
	err := docker.ResizeContainerTty(containerId, execId, w, h)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.Success()
	}
	c.ServeJSON()
}

// 获取容器命令ID
// @router /api/container/:containerId/command/exec [get]
func (c *TerminalController) CreateContainerExec(containerId string) {
	create, err := context.Cli.ContainerExecCreate(context.Ctx, containerId, types.ExecConfig{AttachStdin: true, AttachStdout: true, AttachStderr: true, Cmd: []string{"sh"}, Privileged: true, Tty: true})
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.PackageData(create.ID)
	}
	c.ServeJSON()
}

// 打印终端启动时候的欢迎消息
func printBanner(conn *websocket.Conn) {
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[36m   _____ _                 __        ____             __\r\n"))
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[36m  / ___/(_)___ ___  ____  / /__     / __ \\____  _____/ /_____  _____\r\n"))
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[36m  \\__ \\/ / __ `__ \\/ __ \\/ / _ \\   / / / / __ \\/ ___/ //_/ _ \\/ ___/\r\n"))
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[36m ___/ / / / / / / / /_/ / /  __/  / /_/ / /_/ / /__/ ,< /  __/ /    \r\n"))
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[36m/____/_/_/ /_/ /_/ .___/_/\\___/  /_____/\\____/\\___/_/|_|\\___/_/     \r\n"))
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[36m                /_/                               						V0.0.2 \r\n\r\n"))
}

// 打印连接成功时候的欢迎消息
func printWelcome(conn *websocket.Conn) {
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[33m 欢迎您使用 SimpleDocker, 容器终端已为您连接成功 ...............  \033[0m \r\n \r\n"))
	_ = conn.WriteMessage(websocket.BinaryMessage, []byte("\033[32m 程序默认使用 /bin/sh 连接，如有必要请手动切换到 /bin/bash 或者其他 shell 环境  \033[0m \r\n \r\n"))
}

// 处理channel
func TerminalBroadcaster() {
	for {
		select {
		case client := <-join:
			clients[client] = true
			logs.Info("用户: %s加入", client.Name)
		case client := <-leave:
			if !clients[client] {
				break
			}
			delete(clients, client)
			logs.Info("用户:%s离开", client.Name)
		}
	}
}
