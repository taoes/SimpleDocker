<template>
  <div id="fileBrowse" style="overflow-y: scroll; overflow-x:auto;height: 100%">
    <div style="width: 80%;justify-content: center">
      <template v-for="data in fileList">
        <div class="file" @click="updatePath(data)">
          <img :src="getIcon(data)" alt="" width="40" class="fileLogo"/>
          <div class="fileInfo">
            <span><b>{{ data.Name }}</b></span>
            <teamplate v-if="data.Name !== '返回上一层'">
              <teamplate v-if="data.FileType !== 'true'">
                <span class="simpleSpan"> 大小: {{ data.FileSize }} 字节</span>
                <br>
              </teamplate>
              <span class="simpleSpan"> 修改: {{ data.ModifyDatetime }}</span>
            </teamplate>
          </div>
          <div class="fileOperator">
            <template v-if="data.Name !== '返回上一层'">
              <template v-if="data.FileType === 'false'">
                <a-tooltip>
                  <template slot="tilte">
                    <span>下载后请使用tar命令解压</span>
                  </template>
                  <a @click="downloadFile(data.Name)">下载</a>
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
import {download} from "@/utils";
import TerminalContainer from "@/views/TerminalContainer";

export default {
  name: "FileBrowser",
  components: {TerminalContainer},
  data() {
    return {
      containerId: '',
      socket: null,
      fileList: [],
      pathChain: [],
    }
  }, beforeMount() {
    this.initWebSocket()
  }, beforeDestroy() {
    if (this.socket) {
      this.socket.close()
    }
  }, methods: {
    updatePath: function (file) {
      let {FileType, Name} = file
      if (FileType === "true" || Name === '返回上一层') {
        this.addPath(Name)
      } else if (FileType === 'flase') {
        this.$message.info("文件不可以继续打开，请选择下载按钮下载此文件")
      }
    },
    addPath(name) {
      if (name === '返回上一层') {
        this.pathChain.pop()
      } else {
        this.pathChain.push(name)
      }
      this.send()
    }, async downloadFile(fileName) {
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
    }
    ,
    initWebSocket() {
      let {containerId} = this.$route.query
      this.containerId = containerId
      this.socket = new WebSocket(`${config.WS_HOST}/ws/api/container/${containerId}/file?token=${localStorage.token}`)
      this.socket.onopen = this.open
      this.socket.onclose = this.close
      this.socket.onmessage = this.getMessage
    }, open: function () {
      this.send()
    }, getMessage: function (msg) {
      let {data} = msg
      let {SubCategory} = JSON.parse(data)
      SubCategory.sort(function (a, b) {
        let {FileType: aType} = a
        let {FileType: bType} = b
        if (bType === "true" && aType === 'true') {
          return 1
        } else {
          return -1
        }
      });
      this.fileList = [{Name: '返回上一层'}, ...SubCategory]
    },
    send: function () {
      if (!!this.socket) {
        if (this.pathChain.length === 0) {
          this.socket.send("App2 /")
        } else {
          this.socket.send(`App2 /${this.pathChain.join("/")}`)
        }
      }
    }, close: function () {
      this.$error({
        title: '连接断开',
        content: "终端远程服务连接断开，请检查网络状态"
      });
    },
    getIcon(file) {
      let {Name, Permission, FileType} = file
      if (Name === '返回上一层') {
        return require("../assets/file/back.png")
      } else if (FileType === "true") {
        if (Name === 'home' || Name === 'root') {
          return require("../assets/file/home.png")
        }
        return require("../assets/file/category.png")
      } else if (Permission.indexOf("x") !== -1) {
        return require("../assets/file/exe.png")
      } else if (Permission.indexOf("L") !== -1) {
        return require("../assets/file/link.png")
      } else if (Name.endsWith(".png")) {
        return require("../assets/file/pic.png")
      } else if (Name.endsWith(".html")) {
        return require("../assets/file/web.png")
      } else if (Name.endsWith(".tar.gz")) {
        return require("../assets/file/tar.png")
      } else {
        return require("../assets/file/unkonw.png")
      }
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