package model

import "github.com/gorilla/websocket"

type Client struct {
	Conn *websocket.Conn // 用户websocket连接
	Name string          // 用户名称
}
