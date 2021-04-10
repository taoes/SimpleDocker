package api

import (
	"SimpleDocker/src/api/model"
	"SimpleDocker/src/db"
	"SimpleDocker/src/utils"
	"encoding/json"
	"github.com/astaxie/beego"
	"os"
	"runtime"
	"strconv"
)

type SystemController struct {
	beego.Controller
}

/** 获取系统信息 */
//@router /api/system/info [get]
func (c *SystemController) GetSystemInfo() {
	osName := runtime.GOOS
	arch := runtime.GOARCH
	hostName, _ := os.Hostname()
	core := runtime.GOMAXPROCS(0)
	var info = model.SystemInfo{OS: osName, HostName: hostName, Arch: arch, Core: core}
	c.Data["json"] = info
	c.ServeJSON()
}

// 更新系统安全配置
//@router /api/system/safe [post]
func (c *SystemController) UpdateSystemSafeConfig() {
	var config model.SystemSafeConfig
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &config)
	db.Write("enableDockerLog", strconv.FormatBool(config.EnableDockerLog))
	db.Write("containerCreateMode", config.ContainerCreateMode)
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

//@router /api/system/safe [get]
func (c *SystemController) GetSystemSafeConfig() {
	var config model.SystemSafeConfig
	if db.Read("enableDockerLog") == "true" {
		config.EnableDockerLog = true
	} else {
		config.EnableDockerLog = false
	}
	config.ContainerCreateMode = db.Read("containerCreateMode")
	c.Data["json"] = utils.PackageData(config)
	c.ServeJSON()
}

// 更新系统通知配置
//@router /api/system/notify [post]
func (c *SystemController) UpdateSystemNotificationConfig() {
	var config model.SystemNotificationConfig
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &config)
	db.Write("notifyUrl", config.NotifyUrl)
	c.Data["json"] = utils.Success()
	c.ServeJSON()
}

// 更新系统通知配置
//@router /api/system/notify [get]
func (c *SystemController) GetSystemNotificationConfig() {
	var config model.SystemNotificationConfig
	_ = json.Unmarshal(c.Ctx.Input.RequestBody, &config)
	config.NotifyUrl = db.Read("notifyUrl")
	c.Data["json"] = utils.PackageData(config)
	c.ServeJSON()
}
