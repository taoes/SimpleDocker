package authResp

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	// token
	Token string `json:"token"`

	// 登录状态
	Status int `json:"status"`

	// 异常消息
	Msg string `json:"msg"`
}

type LogoutResponse struct {
	// 登录状态
	Status int8 `json:"status"`

	// 异常消息
	Msg string `json:"msg"`
}
