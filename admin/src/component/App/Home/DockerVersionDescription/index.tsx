import {Button, Descriptions, Drawer} from "antd";
import React, {ReactNode, useState} from "react";
import _ from 'lodash'
import IconFont from "../../../Base/IconFont";
import DockerInfoDescription from "../DockerInfoDescription";
import ImageDetailDrawer from "../../Image/ImageDetailDrawer";
import DockerInfoDrawer from "../DockerInfoDrawer";
import DockerInfo from "../../../../api/Model/DockerInfo";
import DockerServerInfo from "../../../../api/Model/DockerInfo";

const configs = [
  {name: "服务端版本", path: "info.ServerVersion"},
  {name: "接口版本", path: "version.ApiVersion"},
  {name: "Arch", path: "version.Arch"},
  {name: "Go版本", path: "version.GoVersion"},
  {name: "内核版本", path: "version.KernelVersion"},
  {name: "构建时间", path: "version.BuildTime"}
]

interface Props {
  dockerInfo: DockerServerInfo
}

interface State {
  drawerState: boolean
  dockerInfo: DockerServerInfo
}


class DockerVersionDescription extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      dockerInfo: this.props.dockerInfo,
      drawerState: false
    }
  }

  componentWillReceiveProps(nextProps:Props){
    this.setState({dockerInfo:nextProps.dockerInfo})
  }


  render() {
    let items: Array<ReactNode> = new Array<React.ReactNode>();
    for (let config of configs) {
      let {name, path} = config
      items.push(
          <Descriptions.Item label={name}
                             key={name}>{_.get(this.state.dockerInfo, path)}</Descriptions.Item>
      )
    }

    let controllerBtn = <Button icon={<IconFont type="icon-icon-test49"/>} onClick={() => {
      this.setState({drawerState: true})
    }}>详情信息</Button>


    return (
        <div className="box mt-2">
          <Descriptions
              labelStyle={{fontWeight: 500}}
              bordered
              size="small"
              extra={controllerBtn}
              title="Docker版本信息">
            {items}
          </Descriptions>

          <Drawer title="镜像详情"
                  destroyOnClose={true}
                  width={'50%'}
                  onClose={() => this.setState({drawerState: false})}
                  visible={this.state.drawerState}>
            <DockerInfoDrawer dockerInfo={this.state.dockerInfo}/>
          </Drawer>
        </div>
    )
  }
}

export default DockerVersionDescription;