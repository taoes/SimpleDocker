package model

type LoginRequest struct {
	OldPassword string `json:"username"`
	NewPassword string `json:"password"`
}
