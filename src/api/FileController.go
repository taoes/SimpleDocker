package api

import (
	"SimpleDocker/src/api/model"
	"SimpleDocker/src/docker"
	"SimpleDocker/src/utils"
	"bytes"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/logs"
	"github.com/gorilla/websocket"
	"io/ioutil"
	"net/http"
	"os"
	"time"
)

var clientsOfFile = make(map[Client]bool)
var joinOfFile = make(chan Client, 10)  // 用户加入通道
var leaveOfFile = make(chan Client, 10) // 用户退出通道

// 容器文件系统先关接口
type FileController struct {
	beego.Controller
}

// @router /api/file/upload/:fileName
func (c *FileController) UploadFileToHost(fileName string) {
	homeDir, _ := os.UserHomeDir()
	filePath := homeDir + "/.local/simpleDocker/plugins/" + fileName
	err := c.SaveToFile("file", filePath)
	if err != nil {
		c.Data["json"] = utils.PackageError(err)
	} else {
		c.Data["json"] = utils.Success()
	}
	c.ServeJSON()
}

// 检查文件是否存在
func (c *FileController) checkFile() {

}

// 获取文件目录相关信息
// @router /ws/api/container/:containerId/file [get]
func (c *FileController) CategoryInfo(containerId string) {

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

	// 拷贝文件到容器的Bin目录
	dir, err := os.UserHomeDir()
	file, err := ioutil.ReadFile(dir + "/.local/simpleDocker/App.tar.gz")
	err = docker.UploadFileToContainer(containerId, "/bin", bytes.NewReader(file))
	if err != nil {
		logs.Error("拷贝文件发生错误")
		logs.Error(err)
		conn.Close()
		return
	}

	attach, err := docker.ContainerFileSystem(containerId)
	if err != nil {
		logs.Info("发生错误")
		logs.Error(err)
		conn.Close()
		return
	}

	var client Client
	client.name = containerId
	client.conn = conn

	// 如果用户列表中没有该用户
	if !clientsOfFile[client] {
		joinOfFile <- client
		logs.Info("容器ID:", client.name, "WebSocket 连接成功!")
	}

	// 当函数返回时，将该用户加入退出通道，并断开用户连接
	defer func() {
		leaveOfFile <- client
		_ = client.conn.Close()
	}()

	// 持续读取消息
	go func() {
		for true {
			readString, _ := attach.Reader.ReadString('#')
			if readString == "" {
				time.Sleep(time.Millisecond * 100)
				continue
			}
			result, _ := model.ParseForContainerCategoryModel(readString)
			_ = conn.WriteJSON(result)
		}
	}()

	// 持续接收消息，并将消息发送到 容器的连接中
	for {
		// 读取消息。如果连接断开，则会返回错误
		_, msgStr, _ := client.conn.ReadMessage()
		if msgStr == nil || len(msgStr) == 0 {
			continue
		}
		_, _ = attach.Conn.Write([]byte(string(msgStr) + "\n"))
	}
}

// 上传文件到容器
// router /api/container/fs [post]
func (c *FileController) UploadToContainer() {

}

// 下载文件
// router /api/container/fs [get]
func (c *FileController) DownloadFromContainer() {

}

// 重命名
// router /api/container/fs [post]
func (c *FileController) RenameFileOfContainer() {

}

// 下载文件
// router /api/container/fs [delete]
func (c *FileController) DeleteFileOfContainer() {

}
