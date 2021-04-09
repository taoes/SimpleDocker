<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="环境变量" v-for="(env,index) in envList" :key="index">
      <a-input
          v-model="env.path"
          style="width: 80%;"
      />
      <a-icon
          class="dynamic-delete-button"
          type="minus-circle"
          @click="removeEnv(index)"
          style="font-size: 20px;color: red;margin-left: 10px"
      />
    </a-form-model-item>


    <a-form-model-item :wrapper-col="{ span: 14, offset: 7 }">

      <a-space>
        <a-button style="margin-left: 10px;" @click="$parent.upStep()">
          上一步
        </a-button>


        <a-button style="margin-left: 10px;" @click="addNewEnv">
          新增变量
        </a-button>

        <a-button type="primary" style="margin-left: 10px;" @click="$parent.nextStep()">
          下一步
        </a-button>
      </a-space>
    </a-form-model-item>
  </a-form-model>


</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ContainerEnvInfo",
  data() {
    return {
      envList: [],
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }
    }
  },
  beforeMount() {
    this.envList = this.$store.state.container.createContainerStore.envList;
  },
  methods: {
    addNewEnv: function () {
      this.envList.push({path: ''})
    }, removeEnv: function (envIndex) {
      this.envList.splice(envIndex, 1)
      localStorage.setItem('container_create_env', this.envList)
    }
  }
}
</script>

<style scoped>

</style>