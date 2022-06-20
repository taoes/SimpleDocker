import {Terminal} from 'xterm'
import 'xterm/css/xterm.css';
import {FitAddon} from "xterm-addon-fit";
import {AttachAddon} from "xterm-addon-attach";
import React from "react";
import './index.css'
import {Affix, notification} from "antd";

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

export default class ContainerTerminal extends React.Component {

  constructor(props) {
    super(props);
    this.socket = null;
    this.term = null;
    this.socketUrl = "ws://192.168.1.102:3364/api/ws/container/9e57d5dc961b/terminal"
    // this.socketUrl = "ws://192.168.1.102:3364/api/ws/container/test"
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
        description: "终端Socket连接成功,您可以在界面输入一些命令查看容器信息"
      });
      this.initTerm()
    }

    this.socket.onerror = (e) => {
      console.error(`容器终端连接出现异常${e}`)
      notification['error']({
        message: '连接异常',
        description: "终端Socket连接出现异常,详情信息请查看控制台"
      });
    }

    this.socket.onclose = () => {
      notification['error']({
        message: '连接关闭',
        description: "终端Socket连接已关闭"
      });
    }
  }

  initTerm = () => {
    this.term = new Terminal({
          rendererType: "canvas", //渲染类型
          convertEol: false, //启用时，光标将设置为下一行的开头
          disableStdin: false, //是否应禁用输入。
          cursorStyle: 'block', //光标样式
          bellStyle: 'sound',
          cursorBlink: true,
          style: style
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
            <div style={{
              width: '100%',
              height: '32px',
            }}>
              <button onClick={() => this.cls()}>清屏</button>
              <button onClick={() => this.home()}>HOME</button>
              <button onClick={() => this.term.selectAll()}>全选</button>
              <button onClick={() => this.term.scrollToBottom()}>滚动到底部</button>
              <button onClick={() => this.term.scrollToTop()}>回到顶部</button>
              <button onClick={() => this.term.refresh()}>刷新</button>
              <button>切换主题</button>
            </div>
          </Affix>
          <div id="terminal" style={{height: "99%", width: '100%'}}/>
        </>
    )
  }

}