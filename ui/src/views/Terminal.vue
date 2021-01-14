<template>
  <div id="xterm" class="xterm"/>
</template>

<script>
import 'xterm/css/xterm.css'
import {Terminal} from 'xterm'
import {FitAddon} from 'xterm-addon-fit'
import {AttachAddon} from 'xterm-addon-attach'

var style = {
  foreground: '#ebeef5',
  background: '#1d2935',
  cursor: '#e6a23c',
  black: '#000000',
  brightBlack: '#555555',
  red: '#ef4f4f',
  brightRed: '#ef4f4f',
  green: '#67c23a',
  brightGreen: '#67c23a',
  yellow: '#e6a23c',
  brightYellow: '#e6a23c',
  blue: '#409eff',
  brightBlue: '#409eff',
  magenta: '#ef4f4f',
  brightMagenta: '#ef4f4f',
  cyan: '#17c0ae',
  brightCyan: '#17c0ae',
  white: '#bbbbbb',
  brightWhite: '#ffffff'
}
export default {
  name: 'Xterm',
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm() {
      const term = new Terminal({
        fontSize: 14,
        cursorBlink: true,
        theme: style
      });
      const attachAddon = new AttachAddon(this.socket);
      const fitAddon = new FitAddon();
      term.loadAddon(attachAddon);
      term.loadAddon(fitAddon);
      term.open(document.getElementById('xterm'));
      fitAddon.fit();
      term.focus();
      this.term = term
    },
    initSocket() {
      let token = localStorage.token;
      let {containerId} = this.$route.query
      this.socket = new WebSocket(
          `ws://127.0.0.1:4050/ws?containerId=${containerId}&command=/\bin/\sh&token=${token}`);
      this.socketOnClose();
      this.socketOnOpen();
      this.socketOnError();
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = (e) => {
        console.error(e)
        console.log('socket 链接失败')
      }
    }
  }
}
</script>


<style>
.xterm {
  width: 100%;
  height: 100%;
}
</style>