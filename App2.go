package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main2() {
	fileInfoList, err := ioutil.ReadDir(os.Args[1])
	if err != nil {
		fmt.Println("文件夹不存在")
		return
	}
	for _, file := range fileInfoList {
		fmt.Println(file.Name())    //打印当前文件或目录下的文件或目录名
		fmt.Println(file.Size())    //打印当前文件或目录下的文件或目录名
		fmt.Println(file.IsDir())   //打印当前文件或目录下的文件或目录名
		fmt.Println(file.Mode())    //打印当前文件或目录下的文件或目录名
		fmt.Println(file.ModTime()) //打印当前文件或目录下的文件或目录名
	}
}
