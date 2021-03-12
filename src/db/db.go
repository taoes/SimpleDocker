package db

import (
	"github.com/astaxie/beego/logs"
	"github.com/go-redis/redis"
)

var RedisClient *redis.Client

const AuthPrefix = "SIMPLE:DOCKER:AUTH:"

var ConfigKey = map[string]string{
	"password":  AuthPrefix + "PASSWORD",
	"saltValue": AuthPrefix + "SALT",
	"token":     AuthPrefix + "TOKEN",
}

func init() {
	options := redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       1,
	}
	RedisClient = redis.NewClient(&options)
	logs.Info("Redis 客户端连接.........OK!")
}

// 读取
func Read(key string) string {
	res := RedisClient.Get(ConfigKey[key])
	if res == nil {
		return ""
	}
	resStr, _ := res.Result()
	return resStr
}

// 写数据
func Write(key string, value string) {
	_ = RedisClient.Set(ConfigKey[key], value, 0)
}

// 删除数据
func Del(key string) {
	RedisClient.Del(ConfigKey[key])
}
