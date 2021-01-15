<template>
  <div id="fileBrowse" style="overflow-y: scroll; overflow-x:auto;height: 100%">
    <div style="width: 80%;justify-content: center">
      <template v-for="file in fileList">
        <File :data="file" @click="addPath(file.Name)"></File>
      </template>
    </div>
  </div>
</template>

<script>
import File from "@/components/File";

export default {
  name: "FileBrowser",
  components: {File},
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
    addPath(name) {
      if (name === '返回上一层') {
        this.pathChain.pop()
      } else {
        this.pathChain.push(name)
      }

      this.send()
    },
    initWebSocket() {
      let {containerId} = this.$route.query
      this.containerId = containerId
      this.socket = new WebSocket(`ws://localhost:4050/ws/api/container/${containerId}/file`)
      this.socket.onopen = this.open
      this.socket.onerror = this.error
      this.socket.onmessage = this.getMessage
    }, open: function () {
      console.log("连接已打开")
      this.send()
    }
    , error: function () {
      console.log("连接发生错误")
    }
    , getMessage: function (msg) {
      console.log(msg)
      let {data} = msg
      let {SubCategory} = JSON.parse(data)
      SubCategory.sort(function (a, b) {
        if (a.FileType === "true" && b.FileType !== 'true') {
          return -1
        } else {
          return -0
        }
      });
      this.fileList = [{Name: '返回上一层'}, ...SubCategory]
    }, send: function () {
      if (!!this.socket) {
        if (this.pathChain.length === 0) {
          this.socket.send("App2 /")
        } else {
          this.socket.send(`App2 /${this.pathChain.join("/")}`)
        }
      }
    }, close: function () {
      console.log("连接被关闭")
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

</style>