package model

// 登录请求模型
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// 密码重置请求模型
type ResetPasswordRequest struct {
	OldPassword string `json:"oldPassword"`
	NewPassword string `json:"newPassword"`
}
