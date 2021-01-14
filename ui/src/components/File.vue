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
      }
      if (!!file.FileType && file.FileType === "true") {
        return require("../assets/file/category.png")
      } else if (!!file.Permission && file.Permission.indexOf("x") !== -1) {
        return require("../assets/file/exe.png")
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

