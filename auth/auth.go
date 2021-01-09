package auth

import (
	"SimpleDocker/src/model"
	"bytes"
	"encoding/json"
	"github.com/astaxie/beego/logs"
	"github.com/dgrijalva/jwt-go"
	"os"
	"time"
)

// 配置文件位置
var configLocation = "/.local/simpleDocker"

func init() {
	initConfig()
}

func initConfig() {
	dir, _ := os.UserHomeDir()
	_, err := os.Lstat(dir + configLocation)
	if err == nil {
		return
	}

	create, err := os.Create(configLocation + "/auth.json")
	if err != nil {
		logs.Info("文件创建失败")
		print(err.Error())
		os.Exit(-1)
	}

	authInfo := model.AuthInfo{Username: "admin", Password: "SimpleDocker2020", SaltValue: "SimpleDocker"}
	data, _ := json.Marshal(authInfo)
	_, _ = create.Write(data)
}

func GeneratorToken() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := make(jwt.MapClaims)
	claims["sub"] = "admin"                                //用于在controller中确定用户
	claims["exp"] = time.Now().Add(time.Hour.Truncate(72)) //设置过期时间为72小时后
	claims["iat"] = time.Now().Unix()                      //用作和exp对比的时间
	token.Claims = claims

	tokenString, err := token.SignedString([]byte("SimpleDocker2020"))
	if err != nil {
		return "", err
	}
	return tokenString, nil

}

func SystemLogin(username string, password string) (string, error) {
	initConfig()
	// 读取配置文件
	file, _ := os.OpenFile(configLocation, os.O_RDWR, 666)

	buf := new(bytes.Buffer)
	buf.ReadFrom(file)

	return "", nil
}
