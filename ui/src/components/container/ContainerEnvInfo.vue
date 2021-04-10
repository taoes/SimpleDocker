<template>
  <div>
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="环境变量" v-for="(env,index) in form.envList" :key="index">
        <a-input v-model="env.path" disabled>
          <a-tooltip slot="suffix" title="移除此变量">
            <a-icon type="close-circle" style="color: red" @click="removeEnv(env.path)"/>
          </a-tooltip>
        </a-input>
      </a-form-model-item>
    </a-form-model>

    <div style="display: flex;justify-content: center;" class="btnGroup">
      <a-button @click="$parent.upStep()">
        <a-icon type="arrow-left"/>
        上一步
      </a-button>

      <a-button @click="envVisible = true">
        <a-icon type="plus-circle"/>
        新增变量
      </a-button>

      <a-button @click="showImageEnv = true">
        <a-icon type="profile"/>
        镜像内置环境变量
      </a-button>

      <a-button type="primary" @click="$parent.nextStep()">
        下一步
        <a-icon type="arrow-right"/>
      </a-button>
    </div>
    <a-modal v-model="showImageEnv" title="镜像内置环境变量">
      <a-form-model :label-col="{span:4}" :wrapper-col="{span:24}" style="max-height: 500px;overflow-y: auto">
        <a-form-model-item v-for="env in ImageEnvList" :key="env.path">
          <a-input v-model="env.path"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>


    <a-modal v-model="envVisible" title="配置端口映射" @ok="addEnvConfig">
      <a-form-model v-model="env" :label-col="{span:4}" :wrapper-col="{span:20}">
        <a-form-model-item label="环境变量键">
          <a-input v-model="env.key"/>
        </a-form-model-item>

        <a-form-model-item label="环境变量值">
          <a-input v-model="env.value"/>
        </a-form-model-item>

      </a-form-model>
    </a-modal>
  </div>


</template>

<script>

import {mapActions} from "vuex";
import imageApi from "@/api/ImageApi";
import _ from "lodash";

export default {
  name: "ContainerEnvInfo",
  data() {
    return {
      form: {},
      envVisible: false,
      ImageEnvList: [],
      showImageEnv: false,
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      env: {key: '', value: ''},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }
    }
  }, async mounted() {
    this.form = this.$store.state.container.createContainerStore;
    let {imageId} = this.form;
    let {data} = await imageApi.getImageInfo(imageId)
    let envSource = _.get(data, 'ContainerConfig.Env', [])
    this.ImageEnvList = []
    for (let i = 0; i < envSource.length; i++) {
      this.ImageEnvList.push({path: envSource[i]})
    }
  }, methods: {
    ...mapActions({
      getImageInfo: "getImageInfo",
    }), addEnvConfig: function () {
      if (this.env.key.trim() === '' || this.env.value.trim() === '') {
        this.$message.warn("环境变量的键或者值无效")
        return
      }
      this.form.envList.push({path: this.env.key + "=" + this.env.value})
      this.envVisible = false
    }, removeEnv: function (path) {
      let index = this.form.envList.indexOf(path);
      if (index !== -1) {
        this.form.envList.splice(index, 1)
      }
    }
  }
}
</script>

<style>
.btnGroup button {
  margin: 10px;
}
</style>

