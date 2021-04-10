<template>
  <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-model="form">
    <!--    暂不希望用户配置此信息，如有需要请自定配置-->
    <!--    <a-form-model-item label="IP 地址">-->
    <!--      <a-input placeholder="建议使用空值保持默认" v-model="form.ip"/>-->
    <!--    </a-form-model-item>-->

    <!--    <a-form-model-item label="DNS 地址">-->
    <!--      <a-input placeholder="建议使用空值保持默认" v-model="form.dns"/>-->
    <!--    </a-form-model-item>-->

    <!--    <a-form-model-item label="MAC 地址">-->
    <!--      <a-input placeholder="建议使用空值保持默认" v-model="form.mac"/>-->
    <!--    </a-form-model-item>-->

    <a-form-model-item label="绑定网络" v-model="form.bindNet">
      <a-select default-value="none">
        <template v-for="network in networkList">
          <a-select-option :value="network.Name" :key="network.Id">
            {{ network.Name }}
          </a-select-option>
        </template>
      </a-select>
    </a-form-model-item>

    <a-form-model-item v-for="(mapping,index) in form.portMapping" :key="index" label="端口映射">
      <a-input v-model="mapping.hostPort + ':' + mapping.containerPort" disabled>
        <a-tooltip slot="suffix" title="移除此映射">
          <a-icon type="close-circle" style="color: red" @click="removePortMapping(mapping)"/>
        </a-tooltip>
      </a-input>
    </a-form-model-item>


    <div style="display: flex;justify-content: center">
      <a-space>
        <a-button @click="$parent.upStep()">
          <a-icon type="arrow-left"/>
          上一步
        </a-button>

        <a-button @click="mappingPortVisible = true">
          <a-icon type="plus-circle" />
          新增映射
        </a-button>

        <a-button  type="primary" @click="$parent.nextStep()">
          下一步
          <a-icon type="arrow-right"/>
        </a-button>
      </a-space>
    </div>


    <!--    弹出对话框-->
    <a-modal v-model="mappingPortVisible" title="配置端口映射" @ok="addPortMapping">
      <a-form-model v-model="portMapping" :label-col="{span:4}" :wrapper-col="{span:20}">

        <a-form-model-item label="宿主机端口">
          <a-input v-model="portMapping.hostPort" type="number" :min="0" :max="65535"/>
        </a-form-model-item>

        <a-form-model-item label="容器端口">
          <a-input v-model="portMapping.containerPort" type="number" :min="0" :max="65535"/>
        </a-form-model-item>

      </a-form-model>
    </a-modal>
  </a-form-model>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ContainerNetworkInfo",
  data() {
    return {
      form: {},
      mappingPortVisible: false,
      portMapping: {hostPort: null, containerPort: null},
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      addBtnCol: {
        wrapperCol: {
          xs: {span: 24, offset: 0},
          sm: {span: 24, offset: 4},
        },
      }
    }
  }, mounted() {
    this.form = this.$store.state.container.createContainerStore;
    this.updateNetworkList()
  }, methods: {
    ...mapActions({
      updateNetworkList: 'updateNetworkList'
    }), addPortMapping() {
      let {hostPort, containerPort} = this.portMapping;
      if (!hostPort || !containerPort) {
        this.$message.error({
          content: "配置错误，无效的端口"
        })
        return
      }
      if (hostPort < 1 || hostPort > 65535 || containerPort < 1 || containerPort > 65535) {
        this.$message.error({
          content: "配置错误，端口的范围在1~65535"
        })
        return
      }
      this.mappingPortVisible = false;
      this.form.portMapping.push({hostPort, containerPort});
    }, removePortMapping: function (mapping) {
      let index = this.form.portMapping.indexOf(mapping);
      if (index !== -1) {
        this.form.portMapping.splice(index, 1);
      }
    }
  }, computed: {
    networkList() {
      return this.$store.state.network.list;
    }
  }
}
</script>

<style scoped>

</style>