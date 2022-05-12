import {Descriptions} from "antd";
import React, {ReactNode} from "react";
import _ from 'lodash'

const configs = [
    {name: "服务端版本", path: "info.ServerVersion"},
    {name: "接口版本", path: "version.ApiVersion"},
    {name: "Arch", path: "version.Arch"},
    {name: "Go版本", path: "version.GoVersion"},
    {name: "内核版本", path: "version.KernelVersion"},
    {name: "构建时间", path: "version.BuildTime"}
]

function DockerVersionDescription(props: any) {
    let {dockerInfo, extra} = props;

    let items: Array<ReactNode> = new Array<React.ReactNode>();
    for (let config of configs) {
        let {name, path} = config
        items.push(
            <Descriptions.Item label={name} key={name}>{_.get(dockerInfo, path)}</Descriptions.Item>
        )
    }


    return (
        <div className="box mt-2">
            <Descriptions
                bordered
                size="small"
                extra={extra}
                title="Docker版本信息">
                {items}
            </Descriptions>
        </div>
    )
}

export default DockerVersionDescription;