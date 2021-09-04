package utils

import "os"

var DEFAULT_TEMPLATE_DIR = os.Getenv("HOME")

func GetTemplateDir() string {
	value := os.Getenv("TEMPLATE_DIR")
	if value == "" {
		return GetHomeDir()
	}
	return value
}

func GetHomeDir() string {
	return os.Getenv("HOME")
}
