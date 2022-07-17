import {Descriptions} from "antd";
import _ from "lodash";
import React from "react";
import DockerServerInfo from "../../../../api/Model/DockerInfo";

const configs = [
  {name: "Socket", path: "info.DockerRootDir"},
  {name: "镜像数", path: "info.Images"},
  {name: "容器数", path: "info.Containers"},
  {name: "系统时间", path: "info.SystemTime"},
  {name: "操作版本", path: "info.OperatingSystem"},
  {name: "容器架构", path: "info.Architecture"},
  {name: "总容器数", path: "info.Containers"},
  {name: "运行容器数", path: "info.ContainersRunning"},
  {name: "暂停器数", path: "info.ContainersPaused"},
  {name: "停止器数", path: "info.ContainersStopped"},
]

interface Props {
  dockerInfo: DockerServerInfo
}

interface State {
  dockerInfo: DockerServerInfo
}

class DockerInfoDescription extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props);
    this.state = {
      dockerInfo: this.props.dockerInfo
    }
  }

  componentWillReceiveProps(nextProps:Props){
    this.setState({dockerInfo:nextProps.dockerInfo})
  }


  render() {
    let items = []

    for (let config of configs) {
      let {name, path} = config
      items.push(
          <Descriptions.Item
              label={name}
              labelStyle={{fontWeight: 500}}
              key={name}>{_.get(this.state.dockerInfo, path)}
          </Descriptions.Item>
      )
    }

    return (
        <div className="box mt-2">
          <Descriptions
              bordered
              size="small"
              title="Docker 使用信息">
            {items}
          </Descriptions>
        </div>
    )
  }
}

export default DockerInfoDescription;