package swarm

import (
	"SimpleDocker/src/context"
	"errors"
	"github.com/astaxie/beego/logs"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/swarm"
	"io/ioutil"
)

func init() {
	logs.Info("尝试初始化Docker Swarm...")
}

/** 查询DockESwarm的服务列表 */
func GetServiceList() ([]swarm.Service, error) {
	optional := types.ServiceListOptions{}
	return context.Cli.ServiceList(context.Ctx, optional)
}

/** 查询制定服务的日志 */
func GetServiceLogs(serviceId string) (string, error) {
	if serviceId != "" {
		return "", errors.New("服务ID不能为空")
	}
	logsOption := types.ContainerLogsOptions{}
	closer, err := context.Cli.ServiceLogs(context.Ctx, serviceId, logsOption)
	if err != nil {
		return "", err
	}
	defer closer.Close()
	bytes, err := ioutil.ReadAll(closer)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

/** 查询服务的 Inspect 信息 */
func GetServiceInspect(serviceId string) (string, error) {
	if serviceId != "" {
		return "", errors.New("服务ID不能为空")
	}
	logs.Info("查询服务:{}的Inspect信息", serviceId)
	options := types.ServiceInspectOptions{}
	_, bytes, err := context.Cli.ServiceInspectWithRaw(context.Ctx, serviceId, options)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

/** 移除服务*/
func RemoveService(serviceId string) error {
	if serviceId != "" {
		return errors.New("服务ID不能为空")
	}
	err := context.Cli.ServiceRemove(context.Ctx, serviceId)
	if err != nil {
		return err
	}
	return nil
}

/** 更新服务 */
func UpdateService(serviceId string) ([]string, error) {
	if serviceId != "" {
		return nil, errors.New("服务ID不能为空")
	}

	options := types.ServiceInspectOptions{}
	info, _, err := context.Cli.ServiceInspectWithRaw(context.Ctx, serviceId, options)
	if err != nil {
		return nil, err
	}
	version := swarm.Version{Index: info.Version.Index + 1}

	// TODO: 更新Service的配置
	spec := swarm.ServiceSpec{}
	options2 := types.ServiceUpdateOptions{}
	response, err := context.Cli.ServiceUpdate(context.Ctx, serviceId, version, spec, options2)
	if err != nil {
		return nil, err
	}
	return response.Warnings, nil
}
