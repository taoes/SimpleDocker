import {Terminal} from 'xterm'
import 'xterm/css/xterm.css';
import {FitAddon} from "xterm-addon-fit";
import {AttachAddon} from "xterm-addon-attach";
import React from "react";
import './index.css'
import {Affix, Button, Checkbox, notification, PageHeader, Space} from "antd";
import WithRouter from "../../router/WithRouter";
import {
  SettingOutlined,
  ReloadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  HomeOutlined,
  DeleteOutlined
} from "@ant-design/icons";

const style = {
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

class ContainerTerminal extends React.Component {

  constructor(props) {
    super(props);
    this.containerId =  props.router.params.containerId;
    this.clientId = props.router.params.clientId;
    this.socket =null
    this.term = null;

    this.socketUrl = `ws://192.168.1.102:3364/api/ws/client/${localStorage.getItem('clientId')}/container/${this.containerId}/terminal`
  }

  componentDidMount() {
    this.initTerminal()
  }

  initTerminal = () => {
    this.socket = new WebSocket(this.socketUrl);
    this.socket.binaryType = "arraybuffer";
    this.socket.onopen = () => {
      notification['success']({
        message: '连接提醒',
        description: "终端Socket连接成功,您可以在界面输入一些命令查看容器信息",
        placement: 'bottomRight'
      });
      this.initTerm()
    }

    this.socket.error = (e) => {
      console.error(`容器终端连接出现异常${e}`)
      notification['error']({
        message: '连接异常',
        description: "终端Socket连接出现异常,详情信息请查看控制台",
        placement: 'bottomRight'
      });
    }

    this.socket.onclose = () => {
      notification['error']({
        message: '连接关闭',
        description: "终端Socket连接已关闭",
        placement: 'bottomRight'
      });
    }
  }

  initTerm = () => {
    this.term = new Terminal({
          rendererType: "canvas", //渲染类型
          convertEol: false, //启用时，光标将设置为下一行的开头
          disableStdin: false, //是否应禁用输入。
          cursorStyle: 'block', //光标样式

          cursorBlink: true,
          theme: style
        }
    );

    let termContainer = document.getElementById('terminal')
    this.term.open(termContainer);
    if (this.term._initialized) {
      return
    }
    this.term._initialized = true
    const attachAddon = new AttachAddon(this.socket);
    const fitAddon = new FitAddon();
    this.term.loadAddon(attachAddon);
    this.term.loadAddon(fitAddon);
    fitAddon.fit();
    this.term.focus();

  }

  cls = () => {
    this.term.clear();
  }

  home = () => {
    this.socket.send('cd $HOME')
  }

  render() {
    return (
        <>
          <Affix offsetTop={0}>

            <PageHeader
                className="site-page-header"
                title="容器日志页面"
                onBack={() => this.props.router.navigate(-1)}
                subTitle="查看容器日志信息"
                extra={
                  <>
                    <Button icon={<DeleteOutlined/>} onClick={() => this.cls()}>清屏</Button>
                    <Button icon={<HomeOutlined/>} onClick={() => this.home()}>命令</Button>
                    <Button icon={<ArrowUpOutlined/>} onClick={() => this.term.scrollToTop()}>顶部</Button>
                    <Button icon={<ArrowDownOutlined/>} onClick={() => this.term.scrollToBottom()}>底部</Button>
                    <Button icon={<ReloadOutlined/>} onClick={() => this.term.refresh()}>刷新</Button>
                    <Button icon={<SettingOutlined/>}>主题</Button>
                  </>
                }/>
          </Affix>
          <div id="terminal" style={{height: "99%", width: '100%'}}/>
        </>
    )
  }
}

export default WithRouter(ContainerTerminal)