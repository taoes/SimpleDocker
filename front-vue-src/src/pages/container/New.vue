<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    color="primary"
    animated
  >
    <q-step :name="1"
            title="镜像信息"
            icon="fa fa-info">
      <p>
        <q-input filled label="镜像信息" stack-label dense readonly v-model="imageId"/>
      </p>


      <p>
        <q-input filled label="镜像标签" stack-label dense readonly v-model="imageTag"/>
      </p>

      <p>
        <q-input filled label="发布时间" stack-label dense readonly v-model="imageCreated"/>
      </p>

      <p>
        <span></span>
        <q-input filled label="维护人员" stack-label dense readonly v-model="maintainer"/>
      </p>

      <div class="stepCtl">
        <q-btn color="secondary" class="bi-align-end" @click="this.$router.back()">取消</q-btn>
        <q-btn color="primary" class="bi-align-end" @click="nextStep">下一步</q-btn>
      </div>
    </q-step>

    <q-step :name="2"
            title="存储信息"
            icon="fa fa-save">
      <div class="stepCtl">
        <q-btn color="primary" class="bi-align-end" @click="preStep">上一步</q-btn>
        <q-btn color="primary" class="bi-align-end" @click="nextStep">下一步</q-btn>
      </div>
    </q-step>

    <q-step :name="3"
            title="网络配置"
            icon="fa fa-wifi">
      <div class="stepCtl">
        <q-btn color="primary" class="bi-align-end" @click="preStep">上一步</q-btn>
        <q-btn color="primary" class="bi-align-end" @click="nextStep">下一步</q-btn>
      </div>
    </q-step>

    <q-step :name="4"
            title="环境变量"
            icon="fab fa-envira">
      <div class="stepCtl">
        <q-btn color="primary" class="bi-align-end" @click="preStep">上一步</q-btn>
        <q-btn color="primary" class="bi-align-end" @click="nextStep">下一步</q-btn>
      </div>
    </q-step>

    <q-step :name="5"
            title="创建容器"
            icon="fas fa-clipboard-check">
      <div class="stepCtl">
        <q-btn color="primary" class="bi-align-end" @click="preStep">上一步</q-btn>
        <q-btn color="primary" class="bi-align-end" @click="createContainer">完成</q-btn>
      </div>
    </q-step>
  </q-stepper>
</template>

<script>
import api from '../../api/ImageApi'
import _ from 'lodash'

export default {
  name: "New",
  async mounted() {
    let {Id} = this.$route.params
    this.imageInfo = await api.imageInspectApi(Id)
    console.log(this.imageInfo)
    this.image = _.get(this.imageInfo, 'Config.Image', '')
    this.imageId = _.get(this.imageInfo, 'Id', '')
    this.imageSize = _.get(this.imageInfo, 'Size', 0)
    this.maintainer = _.get(this.imageInfo, 'Config.Labels.maintainer', '暂无记录')
    this.imageCreated = _.get(this.imageInfo, 'Created', '暂无记录')
    this.imageTag = _.get(this.imageInfo, 'RepoTags', ['无镜像标签']).map(tag => tag + '\t')
  },
  methods: {
    nextStep: function () {
      if (this.step !== 5) {
        this.step = this.step + 1
      }
    },
    preStep: function () {
      if (this.step !== 1) {
        this.step = this.step - 1
      }
    },
    createContainer: function () {
    }
  },
  data() {
    return {
      step: 1,
      maintainer: '',
      image: '',
      imageId: '',
      imageTag: '',
      imageCreated: '',
      imageSize: 0,
      imageInfo: {}
    }
  }
}
</script>

<style scoped lang="sass">
.stepCtl
  display: flex
  flex-direction: row
  justify-content: end

  .q-btn
    margin-right: 10px

</style>
