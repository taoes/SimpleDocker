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
	"strings"
	"time"
)

// 配置文件位置
var configLocation = "/.local/simpleDocker"
var SignNameSceret = "SimpleDocker2020-SimpleDocker2020"

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

	authInfo := model.AuthInfo{Username: "admin", Password: "B923E7672631F71B510FEDB20A77EA8A", SaltValue: "SimpleDocker"}
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

	tokenString, err := token.SignedString([]byte(SignNameSceret))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

// 解析Token
func ParseToken(tokenStr string) error {
	if strings.HasPrefix(tokenStr, "Bearer ") {
		tokenStr = strings.ReplaceAll(tokenStr, "Bearer ", "")
	}

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("无效的Token: %v", token.Header["alg"])
		}

		return []byte(SignNameSceret), nil
	})

	if err != nil {
		return err
	}

	var ok bool

	if _, ok = token.Claims.(jwt.MapClaims); ok && token.Valid {

	} else {
		return errors.New("无效的token")
	}
	return nil
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

	authInfo := model.AuthInfo{Username: "admin", Password: "B923E7672631F71B510FEDB20A77EA8A", SaltValue: "SimpleDocker"}
	data, _ := json.Marshal(authInfo)
	_, _ = create.Write(data)
	create.Close()
	return authInfo, configFilePath

}
