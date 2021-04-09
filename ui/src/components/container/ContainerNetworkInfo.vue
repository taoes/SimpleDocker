<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-model="form">
    <a-form-model-item label="IP 地址">
      <a-input placeholder="" v-model="form.ip"/>
    </a-form-model-item>

    <a-form-model-item label="DNS 地址">
      <a-input placeholder="" v-model="form.dns"/>
    </a-form-model-item>

    <a-form-model-item label="MAC 地址">
      <a-input placeholder="" v-model="form.mac"/>
    </a-form-model-item>

    <a-form-model-item label="网络绑定" v-model="form.bindNet">
      <a-select default-value="none">
        <template v-for="network in networkList">
          <a-select-option :value="network.Name" :key="network.Id">
            {{ network.Name }}
          </a-select-option>
        </template>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 7 }">

      <a-space>
        <a-button style="margin-left: 10px;" @click="$parent.upStep()">
          上一步
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
  name: "ContainerNetworkInfo",
  props: {
    form: Object
  },
  data() {
    return {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }
    }
  }, mounted() {
    this.updateNetworkList()
  }, methods: {
    ...mapActions({
      updateNetworkList: 'updateNetworkList'
    }),
  }, computed: {
    networkList() {
      return this.$store.state.network.list;
    }
  }
}
</script>

<style scoped>

</style>