import {Button, Descriptions, Drawer} from "antd";
import React, {ReactNode, useState} from "react";
import _ from 'lodash'
import IconFont from "../../../Base/IconFont";
import DockerInfoDescription from "../DockerInfoDescription";
import ImageDetailDrawer from "../../Image/ImageDetailDrawer";
import DockerInfoDrawer from "../DockerInfoDrawer";

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


    let [drawerState,setDrawerState] = useState<boolean>(false)
    let items: Array<ReactNode> = new Array<React.ReactNode>();
    for (let config of configs) {
        let {name, path} = config
        items.push(
            <Descriptions.Item label={name} key={name}>{_.get(dockerInfo, path)}</Descriptions.Item>
        )
    }

    let controllerBtn = <Button icon={<IconFont type="icon-icon-test49"/>} onClick={() => {setDrawerState(true)}}>详情信息</Button>


    return (
        <div className="box mt-2">
            <Descriptions
                labelStyle={{fontWeight:500}}
                bordered
                size="small"
                extra={controllerBtn}
                title="Docker版本信息">
                {items}
            </Descriptions>

            <Drawer title="镜像详情"
                    destroyOnClose={true}
                    width={720}
                    onClose={() => setDrawerState(false)}
                    visible={drawerState}>
                <DockerInfoDrawer dockerInfo={dockerInfo}/>
            </Drawer>
        </div>
    )
}

export default DockerVersionDescription;