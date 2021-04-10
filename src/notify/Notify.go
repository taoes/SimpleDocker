package notify

import (
	"SimpleDocker/src/db"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types/events"
	"io/ioutil"
	"net/http"
	"time"
)

/** 处理Docker的事件消息 */
func HandleDockerMessage(message events.Message) {
	eventType := message.Type
	status := message.Status

	marshal, _ := json.Marshal(message)
	logs.Info("监控到Docker事件:%s", string(marshal))

	// 容器停止
	if eventType == "container" && status == "stop" {
		SendContainerStopMessage(message.Actor.Attributes["name"], message.ID)
	}

	// 容器被删除
	if eventType == "container" && status == "destroy" {
		SendContainerRemoveMessage(message.Actor.Attributes["name"], message.ID)
	}
}

// 发送容器被删除消息
func SendContainerRemoveMessage(name string, id string) {
	logs.Info("发送容器移除的钉钉通知")
	title := "容器移除通知"
	text := fmt.Sprintf("【SimpleDocker】发现容器被移除,请知晓！ \n + id=%s \n + name=%s]", id, name)
	body := MessageBody{Title: title, Text: text}
	data := DingTalkMessage{MsgType: "markdown", Markdown: body}
	Send("", data)
}

// 发送容器停止的消息
func SendContainerStopMessage(name string, id string) {
	logs.Info("发送容器停止的钉钉通知")
	title := "容器停止通知"
	text := fmt.Sprintf("【SimpleDocker】容器停止运行,请及时处理！ \n + id=%s \n + name=%s]", id, name)
	body := MessageBody{Title: title, Text: text}
	data := DingTalkMessage{MsgType: "markdown", Markdown: body}
	Send("", data)
}

func SendTestMessage(url string) string {
	logs.Info("发送钉钉测试通知")
	title := "容器通知测试"
	text := fmt.Sprintf("【SimpleDocker】这是一个SimpleDocker的测试小消息,请知晓！")
	body := MessageBody{Title: title, Text: text}
	data := DingTalkMessage{MsgType: "markdown", Markdown: body}
	return Send(url, data)
}

func Send(url string, message DingTalkMessage) string {
	if url == "" {
		url = db.Read("notifyUrl")
		if url == "" {
			return "无效的URL"
		}
	}
	client := &http.Client{Timeout: 10 * time.Second}
	jsonStr, _ := json.Marshal(message)
	resp, err := client.Post(url, "application/json", bytes.NewBuffer(jsonStr))
	if err != nil {
		return err.Error()
	}
	defer resp.Body.Close()
	result, _ := ioutil.ReadAll(resp.Body)
	s := string(result)
	logs.Info("钉钉通知结果:{}", s)
	return s
}

type DingTalkMessage struct {
	MsgType  string      `json:"msgtype"`
	Markdown MessageBody `json:"markdown"`
}

type MessageBody struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}
