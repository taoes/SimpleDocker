import {Button, Checkbox, message, PageHeader, Space} from "antd";
import React from "react";
import WithRouter from "../../router/WithRouter";
import {ITheme, Terminal} from "xterm";
import {AttachAddon} from "xterm-addon-attach";
import {FitAddon} from "xterm-addon-fit";
import 'xterm/css/xterm.css';

const style: ITheme = {
  foreground: "#FFFFFF",
  background: "#1d2935",
  cursor: "#e6a23c",
  black: "#000000",
  brightBlack: "#555555",
  red: "#F00",
  brightRed: "#ef4f4f",
  green: "#67c23a",
  brightGreen: "#67c23a",
  yellow: "#e6a23c",
  brightYellow: "#e6a23c",
  blue: "#409eff",
  brightBlue: "#409eff",
  magenta: "#ef4f4f",
  brightMagenta: "#ef4f4f",
  cyan: "#17c0ae",
  brightCyan: "#17c0ae",
  white: "#bbbbbb",
  brightWhite: "#ffffff",
};

class ContainerLogPage extends React.Component<any, any> {
  term: Terminal | null = null
  socket: WebSocket | null = null

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
      message.info("日志服务连接已关闭").then();
    }

    this.initTerm(websocket)
  }


  initTerm = (websocket: WebSocket) => {
    // @ts-ignore
    this.term = new Terminal({
          rendererType: "canvas", //渲染类型
          convertEol: false,
          disableStdin: true,
          cursorStyle: 'block',
          cursorBlink: false,
          theme: style
        }
    );

    let termContainer = document.getElementById('terminal')
    this.term.open(termContainer!);
    const attachAddon = new AttachAddon(websocket);
    const fitAddon = new FitAddon();
    this.term.loadAddon(attachAddon);
    this.term.loadAddon(fitAddon);
    fitAddon.fit();
    this.term.focus();
  }

  componentWillUnmount() {
    if (this.socket != null && this.socket.readyState == WebSocket.OPEN) {
      this.socket.close()
    }
    message.info("日志服务已为您自动关闭,如需要请重新打开日志页面").then();
  }

  cls = () => {
    this.term?.clear()
  }

  toBottom = () => {
    this.term?.scrollToBottom()
    message.info("已将日志切换到最低部").then()
  }

  toTop = () => {
    this.term?.scrollToTop()
    message.info("已将日志切换到最顶部").then()
  }

  render() {
    return (
        <div className={"is-flex"}>
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
                      <Button type="ghost" onClick={() => this.cls()} size={"small"}>清屏</Button>
                      <Button type="ghost" onClick={() => this.toTop()} size={"small"}>顶部</Button>
                      <Button type="ghost" onClick={() => this.toBottom()} size={"small"}>底部</Button>
                      <Checkbox>自动刷新</Checkbox>
                    </Space>
                  }/>

          <div id="terminal" style={{width: '100%', height: '80%'}}/>
        </div>
    )
  }
}

export default WithRouter(ContainerLogPage)