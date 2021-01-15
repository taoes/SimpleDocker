<template>
  <div class="file" @click="updatePath(data)">
    <img :src="getIcon(data)" alt="" width="40" class="fileLogo"/>
    <div class="fileInfo">
      <span>{{ data.Name }}</span>
      <span>{{ data.Size }}</span>
    </div>

    <div class="fileOperator">
      <template v-if="data.Name !== '返回上一层'">
        <a href="#">属性</a>
        <a-divider type="vertical"></a-divider>
        <a href="#">下载</a>
        <a-divider type="vertical"></a-divider>
        <a href="#">删除</a>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  props: {
    data: Object

  },
  data() {
    return {}
  }, methods: {
    updatePath(file) {
      let {FileType, Name} = file
      if (FileType === "true" || Name === '返回上一层') {
        this.$parent.addPath(Name)
      }
    }, getIcon(file) {
      if (file.Name === '返回上一层') {
        return require("../assets/file/back.png")
      } else if (file.FileType === "true") {
        if (file.Name === 'home' || file.Name === 'root') {
          return require("../assets/file/home.png")
        }
        return require("../assets/file/category.png")
      } else if (file.Permission.indexOf("x") !== -1) {
        return require("../assets/file/exe.png")
      } else if (file.Permission.indexOf("L") !== -1) {
        return require("../assets/file/link.png")
      } else if (file.Name.endsWith(".png")) {
        return require("../assets/file/pic.png")
      } else if (file.Name.endsWith(".html")) {
        return require("../assets/file/web.png")
      } else if (file.Name.endsWith(".tar.gz")) {
        return require("../assets/file/tar.png")
      } else {
        return require("../assets/file/unkonw.png")
      }
    }
  }
}
</script>

<style scoped>
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

</style>

