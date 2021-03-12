package auth

import (
	"SimpleDocker/src/db"
	_ "SimpleDocker/src/db"
	"crypto/md5"
	"errors"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"strings"
	"time"
)

var SignNameSecret = "SimpleDocker2020"
var defaultPassword = "BFA5A81C0E15A3BCFFBB04590D693D4D"

func init() {
	initConfig()
}

func initConfig() {
	//初始化密码
	authInfo := db.RedisClient.Get(db.ConfigKey["password"])
	if authInfo.Err() != nil {
		db.RedisClient.Set(db.ConfigKey["password"], defaultPassword, 0)
	}

	// 初始化盐值
	saltValue := db.RedisClient.Get(db.ConfigKey["saltValue"])
	if saltValue.Err() != nil {
		db.RedisClient.Set(db.ConfigKey["saltValue"], SignNameSecret, 0)
	}
}

// 生成 Token
func GeneratorToken(name string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := make(jwt.MapClaims)
	claims["sub"] = name                        //用于在controller中确定用户
	claims["exp"] = time.Now().AddDate(0, 0, 1) //设置过期时间为72小时后
	claims["iat"] = time.Now().Unix()           //用作和exp对比的时间
	token.Claims = claims

	tokenString, err := token.SignedString([]byte(SignNameSecret))
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

		return []byte(SignNameSecret), nil
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

// 更新用户密码
func UpdatePassword(op string, np string) error {
	// 判断密码是否正确
	password := db.Read("password")
	salt := db.Read("saltValue")
	opMd5 := md5.Sum([]byte(op + "+" + salt))
	value := fmt.Sprintf("%X", opMd5)

	if value != password {
		return errors.New("原密码不正确")
	}
	// 更新数据
	npMd5 := fmt.Sprintf("%X", md5.Sum([]byte(np+"+"+salt)))
	db.Write("password", npMd5)
	return nil
}


