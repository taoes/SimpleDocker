package authService

import authResp "SimpleDocker/controller/auth"

func Login(username string, password string) authResp.LoginResponse {
	return authResp.LoginResponse{
		Token:  username,
		Status: 0,
		Msg:    password,
	}
}
