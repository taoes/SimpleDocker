<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-model="form">
    <a-form-model-item v-for="(mountDir,index) in form.mountDirList" :key="index"
                       label="目录挂载">
      <a-input v-model="mountDir.hostDir +':'+ mountDir.containerDir" disabled>
        <a-tooltip slot="suffix" title="移除此挂载">
          <a-icon type="close-circle" style="color: red" @click="removeMountDir(mountDir)"/>
        </a-tooltip>
      </a-input>

    </a-form-model-item>
    <a-form-model-item v-bind="addBtnCol"/>
    <div style="display: flex;justify-content: center;margin-top: 30px" class="btnGroup">
      <a-space>
        <a-button style="margin-left: 10px;" @click="$parent.upStep()">
          <a-icon type="arrow-left"/>
          上一步
        </a-button>

        <a-button @click="openMountModal" v-if="form.mountDirList.length <= 4">
          <a-icon type="plus-circle"/>
          新增挂载
        </a-button>

        <a-button type="primary" @click="$parent.nextStep()">
          下一步
          <a-icon type="arrow-right"/>
        </a-button>
      </a-space>
    </div>


    <!--    弹出对话框-->
    <a-modal v-model="visible" title="新增目录挂载/存储卷挂载" @ok="addMount">
      <a-form-model v-model="mountForm" :label-col="{span:4}" :wrapper-col="{span:20}">


        <a-form-model-item label="宿主机目录" v-if="mountForm.type === 'dir'">
          <a-input v-model="mountForm.hostDir"/>
        </a-form-model-item>

        <a-form-model-item label="容器目录">
          <a-input v-model="mountForm.containerDir"/>
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
      form: {},
      visible: false,
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }, mountForm: {
        type: 'dir',
        containerDir: '',
        hostDir: ''
      }
    }
  }, mounted() {
    this.form = this.$store.state.container.createContainerStore;
  }, methods: {
    openMountModal: function () {
      this.visible = true;
    }, addMount: function () {
      let form = this.mountForm;
      if (form.containerDir.trim() === '' || form.hostDir.trim() === '') {
        this.$message.warn("宿主机目录或者容器目录不能为空")
        return
      }
      form.hostDir = form.hostDir.trim();
      form.containerDir = form.containerDir.trim();
      let mountInfo = JSON.parse(JSON.stringify(form));
      this.form.mountDirList.push(mountInfo)
      this.visible = false
    }, removeMountDir: function (mountDir) {
      let index = this.form.mountDirList.indexOf(mountDir);
      if (index !== -1) {
        this.form.mountDirList.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>

</style>