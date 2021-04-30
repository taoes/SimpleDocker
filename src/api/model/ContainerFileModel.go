package model

import (
	"bufio"
	"bytes"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type File struct {
	Name       string `json:"name"`
	Permission string `json:"permission"`
	Owner      string `json:"owner"`
	Group      string `json:"group"`
	Size       int64  `json:"size"`
	Modifytime int64  `json:"modify_time"`
}

func ParseFiles(b []byte) ([]*File, error) {
	var files []*File
	r := bufio.NewReader(bytes.NewBuffer(b))
	for {
		line, _, err := r.ReadLine()
		if err != nil {
			break
		}

		fields := strings.Fields(string(line))
		if len(fields) < 9 {
			continue
		}
		filename := fields[8]
		if filename == "." || filename == ".." {
			continue
		}
		filesize, err := strconv.ParseInt(fields[4], 10, 64)
		if err != nil {
			return nil, err
		}
		ty := fields[7] // time or year
		var t string
		var y string
		if strings.Contains(ty, ":") {
			t = ty
			y = time.Now().Format("2006")
		} else {
			y = ty
			t = "00:00"
		}
		d := fields[6]
		if len(d) == 1 {
			d = fmt.Sprintf("0%s", d)
		}
		m := fields[5]
		mt, err := time.Parse("2006 Jan 02 15:04", fmt.Sprintf("%s %s %s %s", y, m, d, t))
		if err != nil {
			return nil, err
		}

		file := &File{
			Name:       filename,
			Permission: fields[0],
			Owner:      fields[2],
			Group:      fields[3],
			Size:       filesize,
			Modifytime: mt.Unix(),
		}
		files = append(files, file)
	}
	return files, nil
}
