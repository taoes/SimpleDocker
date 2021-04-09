package test

import (
	"crypto/md5"
	"fmt"
	"testing"
)

/**
测试生成密码的问题
*/
func TestPassword(t *testing.T) {
	npMd5 := fmt.Sprintf("%X", md5.Sum([]byte("123456+SimpleDocker2020")))
	println(npMd5)
}
