package test

import (
	"context"
	"io"
	"net"
	"net/http"
	"os"
	"testing"
)

func TestDockerApi(t *testing.T) {
	httpc := http.Client{
		Transport: &http.Transport{
			DialContext: func(_ context.Context, _, _ string) (net.Conn, error) {
				return net.Dial("unix", "/var/run/docker.sock")
			},
		},
	}

	var response *http.Response
	var err error

	response, err = httpc.PostForm("http://unix/images/create?fromImage=python:latest", nil)

	if err != nil {
		panic(err)
	}
	io.Copy(os.Stdout, response.Body)
}
