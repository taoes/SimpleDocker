package auth

import (
	"SimpleDocker/src/model"
	"crypto/md5"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/astaxie/beego/logs"
	"github.com/dgrijalva/jwt-go"
	"io/ioutil"
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
	_ = os.MkdirAll(dir+configLocation, os.ModePerm)
	configFilePath := dir + configLocation + "/auth.json"
	_, err := os.Lstat(configFilePath)
	if err == nil {
		return
	}
	create, err := os.Create(configFilePath)
	if err != nil {
		logs.Warning("配置文件不存在，且文件创建失败")
		print(err.Error())
		os.Exit(-1)
	}

	authInfo := model.AuthInfo{Username: "admin", Password: "0EF43B13CD66DC66C4074382ECD9F3A8", SaltValue: "SimpleDocker"}
	data, _ := json.Marshal(authInfo)
	_, _ = create.Write(data)
	create.Close()
	logs.Info("配置文件不存在，已重新初始化完成....")
}

func GeneratorToken(name string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := make(jwt.MapClaims)
	claims["sub"] = name                        //用于在controller中确定用户
	claims["exp"] = time.Now().AddDate(0, 0, 1) //设置过期时间为72小时后
	claims["iat"] = time.Now().Unix()           //用作和exp对比的时间
	token.Claims = claims

	tokenString, err := token.SignedString([]byte("SimpleDocker2020"))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func UpdatePassword(op string, np string) error {
	// 判断密码是否正确
	auth, configFile := ReadAuthFile()
	opMd5 := md5.Sum([]byte(op + "+" + auth.SaltValue))
	value := fmt.Sprintf("%X", opMd5)
	if value != auth.Password {
		return errors.New("原密码不正确")
	}
	// 更新配置文件
	npMd5 := fmt.Sprintf("%X", md5.Sum([]byte(np+"+"+auth.SaltValue)))
	auth.Password = npMd5
	marshalData, _ := json.Marshal(auth)
	_ = ioutil.WriteFile(configFile, marshalData, 0777)
	return nil
}

func ReadAuthFile() (model.AuthInfo, string) {
	dir, _ := os.UserHomeDir()
	_ = os.MkdirAll(dir+configLocation, os.ModePerm)
	configFilePath := dir + configLocation + "/auth.json"
	_, err := os.Lstat(configFilePath)
	if err == nil {
		byteData, _ := ioutil.ReadFile(configFilePath)
		var authInfo model.AuthInfo
		_ = json.Unmarshal(byteData, &authInfo)
		return authInfo, configFilePath

	}
	create, err := os.Create(configFilePath)
	if err != nil {
		logs.Warning("配置文件不存在，且文件创建失败")
		print(err.Error())
		os.Exit(-1)
	}

	authInfo := model.AuthInfo{Username: "admin", Password: "0EF43B13CD66DC66C4074382ECD9F3A8", SaltValue: "SimpleDocker"}
	data, _ := json.Marshal(authInfo)
	_, _ = create.Write(data)
	create.Close()
	return authInfo, configFilePath

}
