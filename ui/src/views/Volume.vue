<template>
  <div class="imageContainer">
    <a-form layout="inline" :form="form">
      <a-form-item>
        <a-input placeholder="搜索关键词" style="width: 400px"
                 v-focus
                 v-model="searchKey">
          <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button @click="reloadVolumeList">
            <a-icon type="reload"></a-icon>
            刷新
          </a-button>

          <a-button @click="openNewVolumeModal">
            <a-icon type="plus-circle"></a-icon>
            创建
          </a-button>


          <a-tooltip>
            <template slot="title">清空无用卷</template>
            <a-button @click="openPruneVolumeModal = true" type="danger">
              <a-icon type="delete"></a-icon>
              精简
            </a-button>
          </a-tooltip>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table :columns="columns" :data-source="volumeList" size="small" :scroll="{ x: true }" style="margin-top: 30px">
    <span slot="action" slot-scope="text, record">
      <a-space>
        <a-tooltip>
          <template slot="title">详情</template>
          <a-icon type="profile" style="color:darkslategray;font-size: 18px"
                  @click="openVolumeDetail(record.LongName)"/>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>

        <a-tooltip>
          <template slot="title">删除</template>
          <a-icon type="delete" style="color:orangered;font-size: 18px"
                  @click="openRemoveVolumeModal(record.LongName)"/>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>

        <a-tooltip>
          <template slot="title">挂载</template>
          <a-icon type="link" style="color:darkslategray;font-size: 18px"/>
        </a-tooltip>
      </a-space>
    </span>
    </a-table>


    <a-drawer
        placement="right"
        width="800px"
        title="详情信息"
        @close="showVolumeDrawer = false"
        :visible="showVolumeDrawer">

      <table class="configTable">
        <tr>
          <td class="tagTd">名称(Name)</td>
          <td class="contentTd" align="left"> {{ volumeInfo.Name }}</td>
        </tr>
        <tr>
          <td class="tagTd">卷模式(Driver)</td>
          <td class="contentTd" align="left"> {{ volumeInfo.Driver }}</td>
        </tr>
        <tr>
          <td class="tagTd">选项(Options)</td>
          <td class="contentTd" align="left"> {{ volumeInfo.Options }}</td>
        </tr>
        <tr>
          <td class="tagTd">作用域(Scope)</td>
          <td class="contentTd" align="left"> {{ volumeInfo.Scope }}</td>
        </tr>
        <tr>
          <td class="tagTd">创建时间(CreatedAt)</td>
          <td class="contentTd" align="left"> {{ volumeInfo.CreatedAt }}</td>
        </tr>
        <tr>
          <td class="tagTd">挂载点(MountPoint)</td>
          <td class="contentTd" align="left"> {{ volumeInfo.Mountpoint }}</td>
        </tr>
      </table>
    </a-drawer>

    <a-modal v-model="showNewVolumeModal" title="创建新的卷" okText="创建" cancelText="取消"
             @ok="callCreateNewVolumeApi">
      <a-form-model :form="newVolumeConfig">
        <a-form-model-item>
          <a-input placeholder="请输入存储卷名称" v-model="newVolumeConfig.name"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-select v-model="newVolumeConfig.driver">
            <template v-for="driver in supportVolumeMode">
              <a-select-option :value="driver" :key="driver">
                {{ driver }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-model-item>
      </a-form-model>

    </a-modal>


    <a-modal v-model="openPruneVolumeModal" title="清空无用卷"
             okText="删除"
             @ok="callPruneVolumeApi"
             cancelText="关闭">
      是否清空无用的存储卷?
    </a-modal>

    <a-modal v-model="showRemoveVolumeModal" title="删除卷"
             okText="删除"
             @ok="callRemoveVolumeApi"
             cancelText="关闭">
      <a-checkbox v-model="forceRemoveVolume" @change="forceRemoveChange">强制删除(谨慎使用)</a-checkbox>
    </a-modal>

  </div>
</template>
<script>
import {mapActions} from "vuex";
import volumeApi from '../api/VolumeApi'
import {guid} from '../utils/index'

const columns = [
  {
    title: '卷名称',
    dataIndex: 'Name',
    key: 'Name',
  },

  {
    title: '卷模式',
    dataIndex: 'Driver',
    key: 'Driver',
  },
  {
    title: '卷范围',
    dataIndex: 'Scope',
    key: 'Scope',
  },
  {
    title: '创建时间',
    key: 'Created',
    dataIndex: 'Created'

  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: '50px',
    scopedSlots: {customRender: 'action'},
  },
];

export default {
  data() {
    return {
      form: {},
      showNewVolumeModal: false,
      showRemoveVolumeModal: false,
      showVolumeDrawer: false,
      forceRemoveVolume: false,
      openPruneVolumeModal: false,
      searchKey: '',
      columns,
      currentVolumeName: '',
      newVolumeConfig: {}
    };
  }, computed: {
    volumeList() {
      let allVolume = this.$store.state.volume.list;
      if (this.searchKey !== '' && this.searchKey.trim() !== '') {
        return allVolume.filter(i => i.LongName.indexOf(this.searchKey) >= 0)
      }
      return allVolume;
    }, volumeInfo() {
      return this.$store.state.volume.info;
    }, supportVolumeMode() {
      let plugins = this.$store.state.dockerInfo.dockerPlugins;
      return plugins.Volume;
    }
  },
  mounted() {
    this.updateVolumeList()
    this.updateDockerInfo()
  },
  methods: {
    ...mapActions({
      updateVolumeList: 'updateVolumeList',
      updateVolumeInfo: 'updateVolumeInfo',
    }), forceRemoveChange: function (e) {
      // 强制删除checked变动
      this.forceRemoveVolume = e.target.checked;
    }, openNewVolumeModal: function () {
      // 打开创建volume的模态框
      this.showNewVolumeModal = true
    }, callCreateNewVolumeApi() {
      let key = guid()
      this.$message.loading({content: '创建存储卷中，请稍后...', key});
      volumeApi.createNewVolume(this.newVolumeConfig).then(res => {
        let {Code, Msg} = res.data
        if (Code === 'OK') {
          this.$message.info({content: '存储卷创建完成!', key, duration: 2});
          this.updateVolumeList()
          this.showNewVolumeModal = false
        } else {
          this.$message.error({content: Msg, key});
          this.showNewVolumeModal = false
        }
      });
    }, openRemoveVolumeModal: function (volumeName) {
      this.showRemoveVolumeModal = true
      this.currentVolumeName = volumeName
    }, openVolumeDetail: function (volumeName) {
      this.showVolumeDrawer = true
      this.updateVolumeInfo(volumeName)
    }, async callRemoveVolumeApi() {
      let key = guid()
      this.$message.loading({content: '删除存储卷中，请稍后...', key});
      let res = await volumeApi.removeVolume(this.currentVolumeName, this.forceRemoveVolume);
      let {Code, Msg} = res.data
      if (Code === 'OK') {
        this.$message.info({content: '存储卷删除完成!', key, duration: 2});
        this.updateVolumeList()
        this.showRemoveVolumeModal = false
      } else {
        this.$notification['error']({
          message: '存储卷删除失败',
          description: Msg,
        });
        this.showRemoveVolumeModal = false
      }
    }, async callPruneVolumeApi() {
      let key = guid()
      this.$message.loading({content: '无用删除存储卷中，请稍后...', key});
      let res = await volumeApi.pruneVolume();
      let {Code, Msg} = res.data
      if (Code === 'OK') {
        this.$message.info({content: '无用存储卷删除完成!', key, duration: 2});
        this.updateVolumeList()
        this.openPruneVolumeModal = false
      } else {
        this.$notification['error']({
          message: '无用存储卷删除失败',
          description: Msg,
        });
        this.openPruneVolumeModal = false
      }
    }, async reloadVolumeList() {
      this.updateVolumeList()
      this.$message.info('存储卷列表刷新完成');
    }
  }
}
</script>

<style scoped>
.ant-drawer-body {
  padding: 0 !important;
}

.configTable, .configTable tr th, .configTable tr td {
  border: 1px solid lightgrey;
}

.configTable .tagTd {
  width: 200px;
}

.configTable {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  border-collapse: collapse;
}

.contentTd {
  overflow-wrap: anywhere;
  padding: 5px 0 5px 10px;
}
</style>
