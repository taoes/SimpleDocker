<template>
  <div id="xterm" class="xterm" />
</template>

<script>
import "xterm/css/xterm.css";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { AttachAddon } from "xterm-addon-attach";

var style = {
  foreground: "#ebeef5",
  background: "#1d2935",
  cursor: "#e6a23c",
  black: "#000000",
  brightBlack: "#555555",
  red: "#ef4f4f",
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

import containerApi from "../api/ContainerApi";
import config from "../api/Config";

export default {
  name: "Xterm",
  data() {
    return {
      execId: "",
      screenWidth: "",
      screenHeight: "",
    };
  },
  async mounted() {
    await this.initSocket();
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    this.resizeContainer();
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth;
        this.screenHeight = document.body.clientHeight;
        this.resizeContainer();
      })();
    };
  },
  beforeDestroy() {
    this.socket.close();
    this.term.dispose();
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorStyle: "bar",
        theme: style,
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(document.getElementById("xterm"));
      fitAddon.fit();
      term.focus();
      this.term = term;
    },
    async initSocket() {
      let token = localStorage.token;
      let { containerId } = this.$route.query;
      // 创建命令
      let res = await containerApi.createNewContainerExec(containerId);
      let { Code, Data, Msg } = res.data;
      if (Code !== "OK") {
        this.$error({
          title: "创建命令失败",
          content: Msg,
        });
      }
      this.execId = Data;
      this.socket = new WebSocket(
        `${config.WS_HOST}/ws/api/container/terminal/${Data}?containerId=${containerId}&token=${token}`
      );
      this.socket.binaryType = "arraybuffer";
      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm();
      };
    },
    socketOnClose() {
      this.socket.onclose = () => {
        this.$error({
          title: "连接断开",
          content: "终端远程服务连接断开，请检查网络状态",
        });
      };
    },
    socketOnError() {
      this.socket.onerror = (e) => {};
    },
    resizeContainer() {
      if (!this.execId) {
        return;
      }
      let { containerId } = this.$route.query;
      containerApi.resizeContainer(
        containerId,
        this.execId,
        this.screenWidth,
        this.screenHeight
      );
    },
  },
};
</script>


<style>
.xterm {
  width: 100%;
  height: 100%;
}
</style>