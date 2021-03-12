package test

import (
	"crypto/md5"
	"fmt"
	"testing"
)

func TestPassword(t *testing.T) {

	npMd5 := fmt.Sprintf("%X", md5.Sum([]byte("123456+SimpleDocker2020")))
	println(npMd5)

}
