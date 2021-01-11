package test

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/gorilla/websocket"
	"strconv"
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
	ws, err := upgrader.Upgrade(c.Ctx.ResponseWriter, c.Ctx.Request, nil)
	if err != nil {
		logs.Error(err)
	}
	//  defer ws.Close()

	clients[ws] = true
	i := 0

	go handleMessages()
	//不断的广播发送到页面上
	for {
		//目前存在问题 定时效果不好 需要在业务代码替换时改为beego toolbox中的定时器
		time.Sleep(time.Second * 10)
		broadcast <- strconv.Itoa(i)
		i = i + 1
	}
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
