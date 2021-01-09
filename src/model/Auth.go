package model

import (
	"context"
)

type AuthInfo struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	SaltValue string `json:"saltValue"`
}




var checkToken = func(c *context.Context) {

}
