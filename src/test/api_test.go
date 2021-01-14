package main

import (
	"SimpleDocker/src/api/model"
	"context"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gorilla/websocket"
	"io/ioutil"
	"net/http"
	"path"
	"strings"
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

func TestParse(t *testing.T) {
	data := "total 48\ndrwxr-xr-x    1 root     root          4096 Jan 12 14:49 .\ndrwxr-xr-x    1 root     root          4096 Jan 12 14:49 ..\n-rwxr-xr-x    1 root     root             0 Jan 12 14:35 .dockerenv\ndrwxr-xr-x    2 root     root         12288 Dec 29 22:14 bin\ndrwxr-xr-x    5 root     root           360 Jan 13 14:05 dev\ndrwxr-xr-x    1 root     root          4096 Jan 12 14:35 etc\ndrwxr-xr-x    2 nobody   nobody        4096 Dec 29 22:23 home\ndr-xr-xr-x  216 root     root             0 Jan 13 14:05 proc\ndrwx------    1 root     root          4096 Jan 13 14:13 root\ndr-xr-xr-x   12 root     root             0 Jan 13 13:31 sys\ndrwxrwxrwt    2 root     root          4096 Dec 29 22:23 tmp\ndrwxr-xr-x    1 root     root          4096 Dec 29 22:23 usr\ndrwxr-xr-x    4 root     root          4096 Dec 29 22:23 var\n"
	split := strings.Split(data, "\n")
	info := model.ContainerCategoryInfo{}
	models := make([]model.ContainerCategoryModel, 0)
	for i := range split {
		// "xxxxyyyyzzz"
		row := split[i]
		if len(row) == 0 {
			continue
		}
		// ["xxxx","yyyy","zzzz"]
		paramInitArray := strings.Split(row, " ")
		paramArray := make([]string, 0)
		for _, ele := range paramInitArray {
			if ele = strings.Trim(ele, " "); len(ele) != 0 {
				paramArray = append(paramArray, ele)
			}
		}

		if i == 0 {
			info.SumSize = paramArray[1]
			continue
		} else {
			model := model.ContainerCategoryModel{}
			for j := range paramArray {
				param := paramArray[j]
				param = strings.Trim(param, " ")
				if len(param) == 0 {
					continue
				}
				switch j {
				case 0:
					model.Permission = param
				case 1:
					model.LinkCount = param
				case 2:
					model.FileAuthor = param
				case 3:
					model.FileGroup = param
				case 4:
					model.FileSize = param
				case 5, 6, 7:
					model.ModifyDatetime = model.ModifyDatetime + " " + param
				case 8:
					model.Name = param
				}
			}
			models = append(models, model)
		}
	}
	info.SubCategory = models
	fmt.Println("")
}

func TestPath(t *testing.T) {
	fileInfoList, err := ioutil.ReadDir("/")
	if err != nil {
		logs.Error(err)
	}
	fmt.Println(len(fileInfoList))
	for _, file := range fileInfoList {
		fmt.Println(file.Name())    //打印当前文件或目录下的文件或目录名
		fmt.Println(file.Size())    //打印当前文件或目录下的文件或目录名
		fmt.Println(file.IsDir())   //打印当前文件或目录下的文件或目录名
		fmt.Println(file.Mode())    //打印当前文件或目录下的文件或目录名
		fmt.Println(file.ModTime()) //打印当前文件或目录下的文件或目录名
		fmt.Println(path.Base(path.Dir("/dev")))

	}
}
