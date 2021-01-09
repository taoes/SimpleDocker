package model

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
