<template>
  <div id="fileBrowse" style="overflow-y: scroll; overflow-x:auto;height: 100%">
    <div style="width: 80%;justify-content: center">
      <template v-for="(file, index) in fileList">
        <div v-if="!(file.name === '返回上一层' && pathChain.length === 0)" class="file" @click="updatePath(file)" :key="index">
          <img :src="getIcon(file)" alt="" width="40" class="fileLogo"/>
          <div class="fileInfo">
            <span><b>{{ file.name }}</b></span>
            <template v-if="file.name !== '返回上一层'">
              <template v-if="file.permission[0] !== 'd'">
                <span class="simpleSpan"> 大小: {{ file.size }} 字节</span>
              </template>
              <span class="simpleSpan"> 修改: {{ file.modify_time }}</span>
            </template>
          </div>
          <div class="fileOperator">
            <template v-if="file.name !== '返回上一层'">
              <template v-if="file.permission[0] !== 'd'">
                <a-tooltip>
                  <template slot="tilte">
                    <span>下载后请使用tar命令解压</span>
                  </template>
                  <a @click="downloadFile(file.name)">下载</a>
                </a-tooltip>
              </template>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import ContainerApi from '../api/ContainerApi'
import config from '../api/Config'
import { download, formatDate } from "@/utils";

export default {
  name: "FileBrowser",
  components: {},
  data() {
    return {
      containerId: '',
      socket: null,
      fileList: [],
      pathChain: [],
    }
  },
  beforeMount() {
    this.initWebSocket()
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close()
    }
  },
  methods: {
    updatePath: function (file) {
      const { permission, name } = file
      if (name === '返回上一层') {
        this.addPath(name)
        return
      }
      
      if (permission[0] === 'd') {
        this.addPath(name)
        return
      }
      this.$message.info("文件不可以继续打开，请选择下载按钮下载此文件")
    },
    addPath(name) {
      if (name === '返回上一层') {
        this.pathChain.pop()
      } else {
        this.pathChain.push(name)
      }
      this.send()
    },
    async downloadFile(fileName) {
      let filePath = "/" + this.pathChain.join("/") + "/" + fileName
      const modal = this.$success({
        title: '正在下载,请稍等...',
        content: '正在准备，稍后会自动下载.......'
      });
      try {
        let res = await ContainerApi.downloadFileFromContainer(this.containerId, filePath)
        this.$message.info(`获取容器文件完成,正在下载，请稍后....`);
        download(res.data, `${fileName}.tar`)
      } finally {
        modal.destroy()
      }
    },
    initWebSocket() {
      let {containerId} = this.$route.query
      this.containerId = containerId
      this.socket = new WebSocket(`${config.WS_HOST}/ws/api/container/${containerId}/file?token=${localStorage.token}`)
      this.socket.onopen = this.open
      this.socket.onclose = this.close
      this.socket.onmessage = this.getMessage
    },
    open: function () {
      this.send()
    },
    getMessage: function (msg) {
      let { data } = msg
      let { files } = JSON.parse(data)
      if (files) {
        files.sort(function (a, b) {
          let { permission: pa } = a
          let { permission: pb } = b
          if (pa[0] === 'd' && pb[0] === 'd') {
            return 1
          } else {
            return -1
          }
        });
        files.forEach((el, index, arr) => {
          el.modify_time = formatDate(el.modify_time)
          arr[index] = el
        });
        this.fileList = [{name: '返回上一层'}, ...files];
      }
    },
    send: function () {
      if (this.socket) {
        if (this.pathChain.length === 0) {
          this.socket.send("ls --color=never -la /")
          return
        }

        this.socket.send(`ls --color=never -la /${this.pathChain.join("/")}`)
        return
      }
    },
    close: function () {
      this.$error({
        title: '连接断开',
        content: "终端远程服务连接断开，请检查网络状态"
      });
    },
    getIcon(file) {
      const { name, permission } = file
      if (name === '返回上一层') {
        return require("../assets/file/back.png")
      }
      if (permission[0] === 'd') {
        if (name === 'home' || name === 'root') {
          return require("../assets/file/home.png")
        }
        return require("../assets/file/category.png")
      }
      if (permission.indexOf("x") !== -1) {
        return require("../assets/file/exe.png")
      }
      if (permission.indexOf("l") !== -1) {
        return require("../assets/file/link.png")
      }
      if (name.endsWith(".png")) {
        return require("../assets/file/pic.png")
      }
      if (name.endsWith(".html")) {
        return require("../assets/file/web.png")
      }
      if (name.endsWith(".tar.gz")) {
        return require("../assets/file/tar.png")
      }
      return require("../assets/file/unkonw.png")
    }
  }
}
</script>

<style scoped>
#fileBrowse {
  width: 100%;
  display: flex;
  justify-content: center;
}

.file {
  display: flex;
  padding: 10px;
  width: 100%;
  align-items: center;
  border-bottom: solid 1px lightgrey;
}

.fileLogo {
  flex-grow: 0;
}

.fileInfo {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  margin-left: 20px;
}


.fileOperator {
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;
  align-content: flex-end;
  align-items: center;
}

.simpleSpan {
  color: lightgrey;
  font-size: 13px;
  margin-top: 4px;
}


</style>