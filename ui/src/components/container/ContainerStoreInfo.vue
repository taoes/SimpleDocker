<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">

    <a-form-model-item v-for="(mountDir,index) in mountDirList" :key="index"
                       label="目录挂载">
      <a-input
          v-model="mountDir.containerDir"
          disabled
          style="width: 45%;"
      />

      <a-input
          v-if="mountDir.type === 'dir'"
          v-model="mountDir.hostDir"
          disabled
          style="width: 45%; margin-left: 8px;margin-right: 8px"
      />

      <a-input
          v-if="mountDir.type === 'volume'"
          v-model="mountDir.mountId"
          disabled
          style="width: 45%; margin-left: 8px;margin-right: 8px"
      />

      <a-icon
          class="dynamic-delete-button"
          type="minus-circle"
          @click="removeMountDir(mountDir)"
          style="font-size: 20px;color: red"
          :disabled="mountDirList.length > 5"
      />
    </a-form-model-item>

    <a-form-model-item v-bind="addBtnCol">

    </a-form-model-item>


    <a-form-model-item label="文件系统只读">
      <a-select default-value="0">
        <a-select-option value="0">否</a-select-option>
        <a-select-option value="1">是</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 7 }">

      <a-space>
        <a-button style="margin-left: 10px;" @click="$parent.upStep()">
          上一步
        </a-button>

        <a-button @click="openMountModal" v-if="mountDirList.length <= 4">
          新增挂载
        </a-button>


        <a-button type="primary" style="margin-left: 10px;" @click="$parent.nextStep()">
          下一步
        </a-button>
      </a-space>
    </a-form-model-item>


    <!--    弹出对话框-->
    <a-modal v-model="visible" title="新增目录挂载/存储卷挂载" @ok="addMount">
      <a-form-model v-model="mountForm" :label-col="{span:4}" :wrapper-col="{span:14}">
        <a-form-model-item label="挂载类型" v-model="mountForm.type">
          <a-select v-model="mountForm.type">
            <a-select-option value="dir">挂载目录</a-select-option>
            <a-select-option value="volume">挂载存储卷</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="容器目录">
          <a-input v-model="mountForm.containerDir"></a-input>
        </a-form-model-item>

        <a-form-model-item label="宿主机目录" v-if="mountForm.type === 'dir'">
          <a-input v-model="mountForm.hostDir"></a-input>
        </a-form-model-item>

        <a-form-model-item label="挂载存储卷" v-if="mountForm.type === 'volume'">
          <a-select v-model="mountForm.mountId">
            <template v-for="mount in volumeList">
              <a-select-option :value="mount.Name" :key="mount.Id">
                {{ mount.Name }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-model-item>

      </a-form-model>
    </a-modal>

  </a-form-model>


</template>

<script>
export default {
  name: "ContainerInfo",
  data() {
    return {
      visible: false,
      mountDirList: [],
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }, mountForm: {
        type: 'dir',
        containerDir: '',
        hostDir: '',
        mountId: ''
      }
    }
  }, methods: {
    openMountModal: function () {
      this.visible = true;
    }, addMount: function () {
      let mountInfo = JSON.parse(JSON.stringify(this.mountForm));
      this.mountDirList.push(mountInfo)
      this.visible = false
    }, removeMountDir: function (mountDir) {
      let index = this.mountDirList.indexOf(mountDir);
      if (index !== -1) {
        this.mountDirList.splice(index, 1);
      }
    }
  }, computed: {
    volumeList() {
      return this.$store.state.volume.list;
    }
  }
}
</script>

<style scoped>

</style>