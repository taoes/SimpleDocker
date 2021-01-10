package docker

import (
	"SimpleDocker/context"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/registry"
)

type UsernamePassword map[string]string

/** Docker 登录到镜像中心 */
func Login(username string, password string) (registry.AuthenticateOKBody, error) {
	authConfig := types.AuthConfig{Username: username, Password: password}
	return context.Cli.RegistryLogin(context.Ctx, authConfig)
}

/** 获取登录记录密码 */
func GetLoginRecord() []UsernamePassword {
	u := make(map[string]string)
	u["user"] = "user"
	u["password"] = "password"
	return []UsernamePassword{u}
}
