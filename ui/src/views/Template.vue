<template>
  <div>
    <a-tabs default-active-key="default">
      <a-tab-pane key="default" tab="默认模板">
        <a-table
            :columns="defaultTemplateColumn"
            :data-source="[]"
            size="small"
            :scroll="{ x: true }"/>
      </a-tab-pane>
      <a-tab-pane key="customer" tab="自定义模板">
        <a-table
            :columns="columns"
            :data-source="[]"
            size="small"
            :scroll="{ x: true }"/>
      </a-tab-pane>
      <a-button slot="tabBarExtraContent" type="primary" @click="openCreateTemplateModal">
        新建模板
      </a-button>
    </a-tabs>

    <a-modal
        v-model="showCreateTemplateModal"
        title="创建容器模板"
        okText="创建"
        cancelText="关闭"
        width="800px"
        @ok="createNewTemplate"
    >
      <vue-json-editor
          v-model="configInfo"
          :showBtns="false"
          :mode="'code'"
          lang="zh"
      />

    </a-modal>
  </div>
</template>

<script>

import {defaultTemplateColumn} from '../utils/TableModelDefine'
import vueJsonEditor from 'vue-json-editor'

export default {
  name: "Template",
  components: {vueJsonEditor},
  data() {
    return {
      defaultTemplateColumn: defaultTemplateColumn,
      showCreateTemplateModal: false,
      configInfo: {
        "name": "模板名称",
        "imageName": "镜像名称",
        "imageVersion": "latest",
        "port": {
          "9090": "9091",
          "8080": "8081"
        },
        "mount": {
          "sourceDir1": "sss1",
          "sourceDir2": "sss2",
        },
      }
    }
  }, methods: {
    openCreateTemplateModal: function () {
      this.showCreateTemplateModal = true
    }, closeCreateTemplateModal: function () {
      this.showCreateTemplateModal = false
    }, createNewTemplate: function () {
      alert("OK")
      this.closeCreateTemplateModal()
    }
  }
}

</script>

<style scope>
.jsoneditor-outer, .jsoneditor, .jsoneditor-outer {
  height: 500px !important;
}

.ant-modal-body {
  padding: 10px;
}

</style>