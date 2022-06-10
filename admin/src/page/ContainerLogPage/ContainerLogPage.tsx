import {Button, Checkbox, message, PageHeader, Space} from "antd";
import React from "react";
import WithRouter from "../../router/WithRouter";


class ContainerLogPage extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      containerId: props.router.params.containerId,
      log: [],
      ws: null
    }
  }


  componentDidMount() {
    //  创建日志WS服务
    let that = this;
    let websocket = new WebSocket(`ws://localhost:3364/api/ws/container/${this.state.containerId}/log`);
    websocket.onopen = function () {

    };
    websocket.onclose = function (e) {
      message.info("日志服务连接已关闭")
    }
    websocket.onmessage = function (event) {
      let log = that.state.log;
      log.push(event.data)
      that.setState({log: log})
    }
    this.setState({ws: websocket})
  }

  componentWillUnmount() {
    this.state.ws.close()
  }

  render() {
    return (
        <div>
          <PageHeader
              className="site-page-header"
              title="容器日志页面"
              onBack={() => this.props.router.navigate(-1)}
              subTitle=
                  {
                    "查看容器日志信息"
                  }
              extra=
                  {
                    <Space>
                      <Button type="ghost">强制刷新</Button>
                      <Checkbox>自动刷新</Checkbox>
                    </Space>
                  }/>
          <div className="m-2">
            <textarea style={{width:'100%',minHeight:'600px',padding:10,border:"none"}} value={this.state.log}></textarea>
          </div>
        </div>
    )
  }
}

export default WithRouter(ContainerLogPage)