package utils

import (
	"encoding/json"
)

func JsonToMap(str string) map[string]string {
	var temp map[string]string
	err := json.Unmarshal([]byte(str), &temp)
	if err != nil {
		panic(err)
	}
	return temp
}

