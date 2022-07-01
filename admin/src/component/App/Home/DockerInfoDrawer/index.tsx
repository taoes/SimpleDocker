import DockerInfo from "../../../../api/Model/DockerInfo";
import {Spin} from "antd";
import ReactJson from "react-json-view";
import {extend} from "lodash";
import React from "react";
import DockerServerInfo from "../../../../api/Model/DockerInfo";


interface Props {
  dockerInfo: DockerServerInfo
}

interface State {
}

class DockerInfoDrawer extends React.Component<Props, State> {
  private readonly dockerInfo: DockerServerInfo

  constructor(props: Props) {
    super(props);
    this.dockerInfo = this.props.dockerInfo;
  }


  render() {
    return (
        <Spin spinning={false}>
          <ReactJson src={this.dockerInfo}
                     displayDataTypes={false}
                     style={{overflow: 'auto'}}
                     collapsed={2}/>
        </Spin>
    )
  }
}

export default DockerInfoDrawer;