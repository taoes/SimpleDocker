<template>
  <div class="imageContainer">
    <a-form layout="inline" :form="form">
      <a-form-item>
        <a-input placeholder="搜索关键词" style="width: 400px" @change="onSearchKeyChange"
                 v-focus
                 v-model="searchKey">
          <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>


      <a-form-item>
        <a-space>
          <a-button html-type="reset" @click="reloadContainer">
            <a-icon type="reload"></a-icon>
            刷新
          </a-button>

          <a-checkbox v-model="onlyRunContainer" @change="onlyRunContainerChanged">
            仅运行中的容器
          </a-checkbox>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table :columns="columns" :data-source="containerList" style="margin-top: 30px">
    <span slot="action" slot-scope="text, record">
      <a-space>

        <template v-if="record.state === '已停止' || record.state === '已创建'">
          <a href="#" @click="callControlContainerApi(record.containerId,'start')">
            <span style="color: green">启动</span>
          </a>
          <a-divider type="vertical"></a-divider>
        </template>

        <template v-if="record.state === '运行中'">
          <a href="#" @click="callControlContainerApi(record.containerId,'stop')">
            <span style="color: red">停止</span>
          </a>
          <a-divider type="vertical"></a-divider>
        </template>

        <a href="#" @click="openContainerLogModal(record.containerId)">日志</a>
        <a-divider type="vertical"></a-divider>

        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">更多 <a-icon
              type="down"/> </a>
          <a-menu slot="overlay">
            <a-menu-item>
               <a href="#" @click="openDetail(record.containerId)">容器详情</a>
            </a-menu-item>
            <a-menu-item>
                <a href="#" @click="callControlContainerApi(record.containerId,'restart')">重启容器</a>
            </a-menu-item>
            <a-menu-item>
                <a href="#" @click="openRemoveDetail(record.containerId)">删除容器</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#">导出容器</a>
            </a-menu-item>
            </a-menu>
        </a-dropdown>
      </a-space>
    </span>
    </a-table>


    <a-drawer
        placement="right"
        width="800px"
        @close="onDrawClosed"
        :visible="showContainerDetail">
      <a-collapse :activeKey="['info']">
        <a-collapse-panel key="info" header="容器信息">
          <p>Id: {{containerInfo.Id}}</p>
          <p>名称: {{containerInfo.Name}}</p>
          <p>平台: {{containerInfo.Platform}}</p>
          <p>启动参数: {{containerInfo.Args}}</p>
          <p>容器状态: {{containerInfo.State.Status}}</p>
          <p>存储驱动: {{containerInfo.Driver}}</p>
          <p>重启次数: {{containerInfo.RestartCount}}</p>
        </a-collapse-panel>

        <a-collapse-panel key="webConfig" header="网络配置">
          <p>端口映射表</p>
          <table class="configTable">
            <tr>
              <td>容器端口</td>
              <td>宿主机端口</td>
            </tr>
            <template v-for="port in this.containerPorts">
              <tr>
                <td>{{port.containerPort}}</td>
                <td> {{port.portConfig}}</td>
              </tr>
            </template>
          </table>


          <p>网络地址</p>
          <template v-for="(network,key,index) in containerNetworkInfo">
            <table class="configTable">
              <tr>
                <td class="tagTd">网络名</td>
                <td class="contentTd" align="left"> {{key}}</td>
              </tr>
              <tr>
                <td class="tagTd">网络ID</td>
                <td class="contentTd" align="left"> {{network.NetworkID}}</td>
              </tr>
              <tr>
                <td class="tagTd">网关地址</td>
                <td class="contentTd" align="left"> {{network.Gateway}}</td>
              </tr>

              <tr>
                <td class="tagTd">IP 地址</td>
                <td class="contentTd" align="left"> {{network.IPAddress}}</td>
              </tr>
              <tr>
                <td class="tagTd">Mac 地址</td>
                <td class="contentTd" align="left">{{network.MacAddress}}</td>
              </tr>
            </table>
          </template>


        </a-collapse-panel>


        <a-collapse-panel key="volumeConfig" header="存储配置">
          <template v-for="volume in containerMountInfo">
            <table class="configTable">
              <tr>
                <td class="tagTd">名称</td>
                <td class="contentTd" align="left"> {{volume.Name}}</td>
              </tr>
              <tr>
                <td class="tagTd">类型</td>
                <td class="contentTd" align="left"> {{volume.Type}}</td>
              </tr>
              <tr>
                <td class="tagTd">可读写</td>
                <td class="contentTd" align="left"> {{volume.RW}}</td>
              </tr>
              <tr>
                <td class="tagTd">宿主目录</td>
                <td class="contentTd" align="left"> {{volume.Source}}</td>
              </tr>
              <tr>
                <td class="tagTd">容器目录</td>
                <td class="contentTd" align="left"> {{volume.Destination}}</td>
              </tr>
            </table>
          </template>
        </a-collapse-panel>

      </a-collapse>
    </a-drawer>


    <a-modal v-model="showLogVisible" title="最近日志"
             width="60%"
             okText="下载全部日志"
             @ok="downloadAllLog()"
             cancelText="关闭">
      <pre style="overflow-y: scroll; overflow-x:auto;height: 400px">{{this.formatLog}}</pre>
    </a-modal>


    <a-modal v-model="showRemoveVisible" title="删除容器选项"
             @ok="callRemoveContainerApi"
             okText="确定"
             cancelText="关闭">
      <a-checkbox @change="removeVolume" :checked="remove.volume">移除 Volume</a-checkbox>
      <a-checkbox @change="removeLink" :checked="remove.link">移除 Links</a-checkbox>
      <a-checkbox @change="removeForce" :checked="remove.force">强制移除</a-checkbox>

    </a-modal>

  </div>
</template>
<script>
  import {mapActions} from "vuex";
  import containerApi from '../api/ContainerApi'
  import {download, guid} from '../utils/index'

  const columns = [
    {
      title: '容器ID',
      key: 'containerId',
      dataIndex: 'containerId',
    },
    {
      title: '容器名称',
      dataIndex: 'containerName',
      key: 'containerName',
    },

    {
      title: '镜像',
      dataIndex: 'imageName',
      key: 'imageName',
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: '创建时间',
      key: 'created',
      dataIndex: 'created'

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
        showLogVisible: false,
        showContainerDetail: false,
        showRemoveVisible: false,
        currentContainerId: '',
        containerLog: '',
        searchKey: '',
        columns,
        onlyRunContainer: false,
        remove: {volume: true, link: false, force: true}
      };
    }, computed: {
      containerList() {
        let allContainer = this.$store.state.container.containerList;
        if (this.searchKey !== '' && this.searchKey.trim() !== '') {
          let idFit = (i) => i.containerLongId.indexOf(this.searchKey) >= 0;
          let nameFit = (i) => i.containerName.indexOf(this.searchKey) >= 0;
          let imageFit = (i) => i.imageName.indexOf(this.searchKey) >= 0;

          allContainer = allContainer.filter(i => idFit(i) || nameFit(i) || imageFit(i))
        }

        if (this.onlyRunContainer) {
          return allContainer.filter(c => c.state === '运行中')
        } else {
          return allContainer;
        }

      }, containerInfo: function () {
        return this.$store.state.container.containerInfo
      }, containerMountInfo: function () {
        let mounts = this.containerInfo.Mounts;
        return !mounts ? [] : mounts;
      }, containerNetworkInfo: function () {
        let settings = this.containerInfo.NetworkSettings;
        return !settings ? {} : settings.Networks;
      }, containerPorts: function () {
        let portMapping = []
        let {PortBindings} = this.$store.state.container.containerInfo.HostConfig
        if (!PortBindings) {
          return portMapping
        }
        let keys = Object.keys(PortBindings)
        for (let keyIndex in keys) {
          let containerPort = keys[keyIndex]
          let portList = PortBindings[containerPort]
          for (let portIndex in portList) {
            let portConfig = portList[portIndex]
            portMapping.push({containerPort, portConfig: portConfig.HostPort})
          }
        }
        return portMapping
      },
      formatLog: function () {
        let formatLog = ''
        formatLog = this.containerLog.replace('/\r\n/g', "<br/>")
        formatLog = formatLog.replace('\n/g', "<br/>");
        formatLog = formatLog.replace('/\s/g', "&nbsp;");

        return formatLog;
      }
    },
    mounted() {
      this.updateContainerList()
    }, methods: {
      ...mapActions({
        updateContainerList: 'updateContainerList',
        updateContainerInfo: 'updateContainerInfo',
      }), onSearchKeyChange: function (e) {
        this.searchKey = e.target.value;
      }, openDetail: function (containerId) {
        this.showContainerDetail = true;
        this.updateContainerInfo(containerId)
      }, onDrawClosed: function () {
        this.showContainerDetail = false;
      }, reloadContainer: function () {
        this.updateContainerList()
        this.$message.info('刷新容器列表完成');
      }, async downloadAllLog() {
        this.showLogVisible = false
        const modal = this.$success({
          title: '正在导出,请稍等...',
          content: '正在导出，稍后会自动下载.......'
        });
        let containerId = this.currentContainerId
        try {
          let res = await containerApi.getContainerAllLog(containerId)
          this.$message.info(`获取容器全部日志完成,正在下载，请稍后....`);
          download(res.data, `${containerId}-all.log`)
        } finally {
          modal.destroy()
        }

      }, removeVolume: function (e) {
        this.remove.volume = e.target.checked
      }, removeLink: function (e) {
        this.remove.link = e.target.checked
      }, removeForce: function (e) {
        this.remove.force = e.target.checked
      }, openRemoveDetail: function (containerId) {
        this.showRemoveVisible = true;
        this.currentContainerId = containerId
      }, onlyRunContainerChanged: function (e) {
        this.onlyRunContainer = e.target.checked;
      },
      async callRemoveContainerApi() {
        let res = await containerApi.removeContainer(this.currentContainerId, this.remove)
        let {Code, Msg} = res.data;
        if (Code === 'OK') {
          this.$message.info(`移除容器成功`);
          this.showRemoveVisible = false
          this.updateContainerList()
        } else {
          this.$message.error(Msg);
        }

      }, async callControlContainerApi(containerId, state) {
        if (!state) {
          return
        }
        this.currentContainerId = containerId
        let operateName = containerApi.getOperatorNameByState(state)
        let key = guid()
        let messageHide = this.$message.loading(
            {content: `正在${operateName} 容器，请稍后.....`, key, duration: 0});
        try {
          let res = await containerApi.controlContainer(containerId, state, operateName);
          let {Code, Msg} = res.data
          if (Code === 'OK') {
            this.$message.info({content: `${operateName} 容器成功`, key});
            this.updateContainerList()
          } else {
            this.$message.info({content: Msg, key});
          }
        } catch (e) {
          this.$message.error({content: "服务连接失败，请检查服务是否正常启动", key});
        }
      }, async openContainerLogModal(containerId) {
        this.showLogVisible = true
        this.currentContainerId = containerId
        let res = await containerApi.getContainerLog(containerId)
        let {Code, Data} = res.data
        if (Code === 'OK') {
          this.containerLog = Data
          this.showLogVisible = true
        }
      }
    }
  }
  ;
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
</style>
