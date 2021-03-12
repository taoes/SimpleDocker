package test

import (
	"SimpleDocker/src/db"
	"testing"
)

func TestRedisBaseOperator(t *testing.T) {
	db.Write("password", "123")

	res := db.Read("password")
	print(res)

}
