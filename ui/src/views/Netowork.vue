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
          <a-button @click="reloadNetworkList">
            <a-icon type="reload"></a-icon>
            刷新
          </a-button>

          <a-button type="primary" @click="showNewNetworkModal = true">
            <a-icon type="plus-circle"></a-icon>
            创建
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table :columns="columns" :data-source="networkList" style="margin-top: 30px">
    <span slot="action" slot-scope="text, record">
      <a-space>
        <a @click="openNetworkDetail(record.LongId)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a @click="$message.info('很抱歉,该功能正在开发中,敬请期待....')">连接</a>
        <a-divider type="vertical"></a-divider>
        <a @click="openRemoveNetworkModal(record.LongId)">删除</a>
      </a-space>
    </span>
    </a-table>


    <a-drawer
        placement="right"
        width="800px"
        title="详情信息"
        @close="showNetworkDrawer = false"
        :visible="showNetworkDrawer">

      <h3 class="detailTitle">网络信息</h3>
      <table class="configTable">
        <tr>
          <td class="tagTd">Id</td>
          <td class="contentTd" align="left">{{networkInfo.Id}}</td>
        </tr>


        <tr>
          <td class="tagTd">名称(Name)</td>
          <td class="contentTd" align="left">{{networkInfo.Name}}</td>
        </tr>
      </table>


      <h3 class="detailTitle">网络配置</h3>
      <table class="configTable">
        <tr>
          <td class="tagTd">网关</td>
          <td class="contentTd">子网掩码</td>
        </tr>

        <template v-for="config in IPConfig">
          <tr>
            <td class="tagTd">{{config.Subnet}}</td>
            <td class="tagTd">{{config.Gateway}}</td>
          </tr>
        </template>
      </table>


      <h3 class="detailTitle">关联容器</h3>


      <template v-for="(container,key) in containerList">
        <table class="configTable">
          <tr>
            <td class="tagTd">容器ID</td>
            <td class="tagTd" align="left">{{key}}</td>
          </tr>


          <tr>
            <td class="tagTd">容器名称</td>
            <td class="tagTd" align="left">{{container.Name}}</td>
          </tr>


          <tr>
            <td class="tagTd">Mac地址</td>
            <td class="tagTd" align="left">{{container.MacAddress}}</td>
          </tr>


          <tr>
            <td class="tagTd">IP地址(v4)</td>
            <td class="tagTd" align="left">{{container.IPv4Address}}</td>
          </tr>

          <tr>
            <td class="tagTd">IP地址(v6)</td>
            <td class="tagTd" align="left">{{container.IPv6Address}}</td>
          </tr>
        </table>

      </template>


    </a-drawer>


    <a-modal v-model="showRemoveNetworkModal" title="移除网络"
             @ok="callRemoveNetworkApi"
             okText="确定"
             cancelText="关闭">
      是否确认删除该网络 ?
    </a-modal>


    <a-modal v-model="showNewNetworkModal" title="创建新的网络" okText="创建" cancelText="取消"
             @ok="callCreateNewNetworkApi">
      <a-form-model :form="newNetwork">
        <a-form-model-item label="网络名称">
          <a-input placeholder="请输入网络名称" v-model="newNetwork.name"></a-input>
        </a-form-model-item>


        <a-form-model-item label="网络模式">
          <a-select v-model="newNetwork.driver">
            <template v-for="driver in networkDriverList">
              <a-select-option :value="driver" :key="driver">
                {{driver}}
              </a-select-option>
            </template>
          </a-select>
        </a-form-model-item>
      </a-form-model>


    </a-modal>

  </div>
</template>
<script>
  import {mapActions} from "vuex";
  import {guid} from '../utils/index'

  const columns = [
    {
      title: '网络ID',
      key: 'Id',
      dataIndex: 'Id',
    },
    {
      title: '网络名称',
      dataIndex: 'Name',
      key: 'Name',
    },

    {
      title: '网络模式',
      dataIndex: 'Driver',
      key: 'Driver',
    },
    {
      title: '作用范围',
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
      scopedSlots: {customRender: 'action'},
    },
  ];

  export default {
    data() {
      return {
        form: {},
        showNewNetworkModal: false,
        showNetworkDrawer: false,
        showRemoveNetworkModal: false,
        showRemoveVisible: false,
        currentNetworkId: '',
        searchKey: '',
        columns,
        networkDriverList: ['bridge', 'overlay', 'host'],
        newNetwork: {name: '', driver: ''},
        remove: {volume: true, link: false, force: true}
      };
    }, computed: {
      networkList() {
        let allNetwork = this.$store.state.network.list;
        if (this.searchKey !== '' && this.searchKey.trim() !== '') {
          return allNetwork
        }
        return allNetwork;
      }, networkInfo() {
        return this.$store.state.network.info;
      }, IPConfig() {
        let info = this.$store.state.network.info;
        return this.$lodash.get(info, 'IPAM.Config', [])
      }, containerList() {
        let info = this.$store.state.network.info;
        return this.$lodash.get(info, 'Containers', {})
      }
    },
    mounted() {
      this.updateNetworkList()
    },
    methods: {
      ...mapActions({
        updateNetworkList: 'updateNetworkList',
        updateNetworkInfo: 'updateNetworkInfo'
      }), openNetworkDetail: function (networkId) {
        this.showNetworkDrawer = true
        this.currentNetworkId = networkId
        this.updateNetworkInfo(networkId)
      }, openRemoveNetworkModal: function (networkId) {
        this.showRemoveNetworkModal = true
        this.currentNetworkId = networkId
      }, reloadNetworkList() {
        this.updateNetworkInfo()
        this.$message.info({content: '刷新网络列表完成'});
      }, callRemoveNetworkApi() {
        let key = guid()
        this.$message.loading({content: "正在移除网络, 请稍后...", key, duration: 10});
        this.$axios.get(`/api/network/${this.currentNetworkId}/delete`).then(res => {
          let {Code, Msg} = res.data;
          if (Code === 'OK') {
            this.$message.info({content: '移除网络完成', key});
            this.showRemoveNetworkModal = false;
            this.updateNetworkList()
          } else {
            this.$message.info({content: Msg, key});
          }
        }).catch(e => {
          this.$message.info({content: '服务连接失败，请检查服务是否正常启动', key});
        })
      }, callCreateNewNetworkApi() {
        if (this.newNetwork.name === '') {
          this.$message.warning("网络名称不能为空");
          return
        }
        let key = guid()
        this.$message.loading({content: "正在创建网络, 请稍后...", key, duration: 10});
        this.$axios.get(`/api/network/new`, {params: this.newNetwork}).then(res => {
          let {Code, Msg} = res.data;
          if (Code === 'OK') {
            this.$message.info({content: '创建网络完成', key});
            this.showNewNetworkModal = false;
            this.updateNetworkList()
          } else {
            this.$message.warning({content: Msg, key});
          }
        }).catch(e => {
          this.$message.error({content: '服务连接失败，请检查服务是否正常启动', key});
        })

      }
    }
  };
</script>

<style scoped>
  .ant-drawer-body {
    padding: 0 !important;
  }

  .configTable, .configTable tr th, .configTable tr td {
    border: 1px solid lightgrey;
  }

  .configTable .tagTd {
    width: 100px;
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

  .detailTitle {
    margin-top: 10px;
  }
</style>
