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
          <a-tooltip>
            <template slot="title">删除未运行的容器</template>
            <a-button html-type="reset" @click="cleanNotRunContainer('all')" type="danger">
              <a-icon type="delete"></a-icon>
              精简
            </a-button>
          </a-tooltip>

          <a-checkbox v-model="onlyRunContainer" @change="onlyRunContainerChanged">
            仅显示运行中的容器
          </a-checkbox>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="containerList" style="margin-top: 30px" size="small"
             :scroll="{ x: true }">

      <template slot="containerName" slot-scope="text, record">
        <EditCell :text="record.containerName"
                  @change="onContainerNameChange(record.containerName, record.containerLongId, $event)"/>
      </template>

      <template slot="imageName" slot-scope="text,record">
        {{ record.imageName }}
      </template>

      <span slot="action" slot-scope="text, record">
      <a-space>
        <template v-if="['已停止','已创建'].indexOf(record.state) !==-1">
          <a-tooltip>
            <template slot="title">启动</template>
            <a-icon type="play-circle" style="color: #52c41a;font-size: 18px"
                    @click="callControlContainerApi(record.containerId,'start')"/>
          </a-tooltip>

          <a-divider type="vertical"></a-divider>
        </template>

        <template v-if="['暂停中'].indexOf(record.state) !==-1">
          <a-tooltip>
            <template slot="title">继续</template>
            <a-icon type="right-circle" style="color: #52c41a;font-size: 18px"
                    @click="callControlContainerApi(record.containerId,'unpause')"/>
          </a-tooltip>

          <a-divider type="vertical"></a-divider>
        </template>

        <template v-if="record.state === '运行中'">
          <a-tooltip>
          <template slot="title">停止</template>
            <a-icon type="poweroff" style="color: orangered;font-size: 18px"
                    @click="callControlContainerApi(record.containerId,'stop')"/>
          </a-tooltip>
          <a-divider type="vertical"></a-divider>
        </template>

                <a-tooltip>
          <template slot="title">终端命令</template>
        <a-icon type="code" style="color:darkslategray;font-size: 18px"
                @click="openTerminal(record.state,record.containerId)"/>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>

        <a-tooltip>
          <template slot="title">文件管理</template>
        <a-icon type="file-pdf" style="color:darkslategray;font-size: 18px"
                @click="openFileManagementModal(record.state,record.containerId)"/>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>

        <a-tooltip>
          <template slot="title">性能监控</template>
        <a-icon type="bar-chart" style="color:darkslategray;font-size: 18px"
                @click="openContainerMonitor(record.state,record.containerId)"/>
        </a-tooltip>
        <a-divider type="vertical"></a-divider>

        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <a-icon type="down-circle" style="color: darkslategray;font-size: 18px"/>
          </a>

          <a-menu slot="overlay">

            <a-menu-item key="containerLog">
               <a @click="openContainerLogModal(record.containerId)">
                 <a-icon type="profile"/>&nbsp;
                 容器日志
               </a>
            </a-menu-item>

            <a-menu-item>
               <a @click="openDetail(record.containerId)">
                 <a-icon type="container"/>&nbsp;
                 容器详情
               </a>
            </a-menu-item>


            <a-menu-item>
               <a @click="exposeContainer(record.containerId)">
                 <a-icon type="download"/>&nbsp;
                 导出容器
               </a>
            </a-menu-item>

            <a-menu-item>
                <a @click="callControlContainerApi(record.containerId,'restart')">
                  <a-icon type="reload"/>&nbsp;
                  重启容器
                </a>
            </a-menu-item>

            <a-menu-item>
                <a @click="callControlContainerApi(record.containerId,'pause')">
                  <a-icon type="pause"/>&nbsp;
                  暂停容器
                </a>
            </a-menu-item>

            <a-menu-item>
                <a @click="openRemoveDetail(record.containerId)">
                  <a-icon type="delete"/> &nbsp;
                  删除容器
                </a>
            </a-menu-item>

            <a-menu-item>
               <a @click="openNetworkConnectModal(record.containerId)">
                 <a-icon type="container"/>&nbsp;
                 网络管理
               </a>
            </a-menu-item>
            </a-menu>
        </a-dropdown>
      </a-space>
    </span>
    </a-table>

    <!--    侧边栏-->
    <a-drawer
        placement="right"
        width="800px"
        @close="onDrawClosed"
        :visible="showContainerDetail">
      <a-collapse :activeKey="['info']">
        <a-collapse-panel key="info" header="容器信息">
          <p>Id: {{ containerInfo.Id }}</p>
          <p>名称: {{ containerInfo.Name }}</p>
          <p>平台: {{ containerInfo.Platform }}</p>
          <p>启动参数: {{ containerInfo.Args }}</p>
          <p>容器状态: {{ containerInfo.State.Status }}</p>
          <p>存储驱动: {{ containerInfo.Driver }}</p>
          <p>自动重启次数: {{ containerInfo.RestartCount }}</p>
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
                <td>{{ port.containerPort }}</td>
                <td> {{ port.portConfig }}</td>
              </tr>
            </template>
          </table>


          <p>网络地址</p>
          <template v-for="(network,key,index) in containerNetworkInfo">
            <table class="configTable">
              <tr>
                <td class="tagTd">网络名</td>
                <td class="contentTd" align="left"> {{ key }}</td>
              </tr>
              <tr>
                <td class="tagTd">网络ID</td>
                <td class="contentTd" align="left"> {{ network.NetworkID }}</td>
              </tr>
              <tr>
                <td class="tagTd">网关地址</td>
                <td class="contentTd" align="left"> {{ network.Gateway }}</td>
              </tr>

              <tr>
                <td class="tagTd">IP 地址</td>
                <td class="contentTd" align="left"> {{ network.IPAddress }}</td>
              </tr>
              <tr>
                <td class="tagTd">Mac 地址</td>
                <td class="contentTd" align="left">{{ network.MacAddress }}</td>
              </tr>
            </table>
          </template>
        </a-collapse-panel>


        <a-collapse-panel key="volumeConfig" header="存储配置">
          <template v-for="volume in containerMountInfo">
            <table class="configTable">
              <tr>
                <td class="tagTd">名称</td>
                <td class="contentTd" align="left"> {{ volume.Name }}</td>
              </tr>
              <tr>
                <td class="tagTd">类型</td>
                <td class="contentTd" align="left"> {{ volume.Type }}</td>
              </tr>
              <tr>
                <td class="tagTd">可读写</td>
                <td class="contentTd" align="left"> {{ volume.RW }}</td>
              </tr>
              <tr>
                <td class="tagTd">宿主目录</td>
                <td class="contentTd" align="left"> {{ volume.Source }}</td>
              </tr>
              <tr>
                <td class="tagTd">容器目录</td>
                <td class="contentTd" align="left"> {{ volume.Destination }}</td>
              </tr>
            </table>
          </template>
        </a-collapse-panel>

      </a-collapse>
    </a-drawer>


    <!--    日志模态框-->
    <a-modal v-model="showLogVisible" title="最近日志(200行)"
             width="60%"
             okText="下载全部"
             @ok="downloadAllLog()"
             cancelText="关闭">
      <pre style="overflow-y: scroll; overflow-x:auto;height: 400px">{{ this.formatLog }}</pre>
    </a-modal>

    <!--    网络模态框-->
    <a-modal v-model="connectNetworkConnectModal" title="连接/断开 网络"
             width="600px"
             okText="确定"
             :footer="null"
             cancelText="关闭">
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
                    style="overflow-y: scroll; overflow-x:auto;height: 350px;">
        <template v-for="network in this.$store.state.network.list">
          <div style="display: flex;justify-content: space-around;align-items: center">
            <div style="flex-grow: 1">{{ network.Id }}</div>
            <div style="flex-grow: 2"> {{ network.Name }}</div>
            <div style="padding: 5px;">
              <template v-if="connectNetworkList.indexOf(network.Name) !== -1">
                <a-button type="danger"
                          @click="operatorNetwork('disconnect',network.LongId)">
                  <a-icon type="disconnect"></a-icon>
                  断开
                </a-button>
              </template>
              <template v-else>
                <a-button type="primary"
                          @click="operatorNetwork('connect',network.LongId)">
                  <a-icon type="api"></a-icon>
                  连接
                </a-button>
              </template>
            </div>
          </div>
          <a-divider style="margin: 0"></a-divider>
        </template>

      </a-form-model>

    </a-modal>


    <!--    容器删除模态框-->
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
    title: '名称',
    dataIndex: 'containerName',
    key: 'containerName',
    width: '300px',
    scopedSlots: {customRender: 'containerName'},
  },

  {
    title: '镜像',
    dataIndex: 'imageName',
    key: 'imageName',
    scopedSlots: {customRender: 'imageName'},
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: '60px',
    key: 'state',
  },
  {
    title: '创建时间',
    key: 'created',
    width: '180px',
    dataIndex: 'created'

  },
  {
    title: '操作',
    key: 'action',
    width: '50px',
    fixed: 'right',
    scopedSlots: {customRender: 'action'},
  },
];
import EditCell from "@/components/EditCell";
import ContainerApi from '../api/ContainerApi'

export default {
  components: {EditCell},
  data() {
    return {
      form: {},
      showLogVisible: false,
      showContainerDetail: false,
      showRemoveVisible: false,
      showFileModal: false,
      connectNetworkConnectModal: false,
      currentContainerId: '',
      containerLog: '',
      searchKey: '',
      columns,
      onlyRunContainer: false,
      remove: {volume: true, link: false, force: true}
    };
  },
  computed: {
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

    },
    containerInfo: function () {
      return this.$store.state.container.containerInfo
    },
    containerMountInfo: function () {
      let mounts = this.containerInfo.Mounts;
      return !mounts ? [] : mounts;
    },
    containerNetworkInfo: function () {
      let settings = this.containerInfo.NetworkSettings;
      return !settings ? {} : settings.Networks;
    },
    containerPorts: function () {
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
      return formatLog.replace('/\s/g', "&nbsp;");
    },
    connectNetworkList: function () {
      return Object.keys(this.containerNetworkInfo)
    }
  },
  mounted() {
    this.updateContainerList()
  }, methods: {
    ...mapActions({
      updateContainerList: 'updateContainerList',
      updateContainerInfo: 'updateContainerInfo',
      updateNetworkList: 'updateNetworkList'
    }), onContainerNameChange: function (containerName, containerId, containerNewName) {
      if (containerNewName === containerName) {
        return
      }
      ContainerApi.renameContainer(containerId, containerNewName)
    }, onSearchKeyChange: function (e) {
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
    }, async cleanNotRunContainer(containerId) {
      let that = this;
      let state = 'prune';
      let operateName = containerApi.getOperatorNameByState(state)
      this.$confirm({
        title: `${operateName}提示`,
        content: '此操作将清空所有未处于运行中的容器，包含停止运行或者计划运行的容器，是否继续?',
        okText: '好',
        cancelText: '取消',
        onOk() {
          that.callControlContainerApi(containerId, state)
        }
      });
    },
    async callControlContainerApi(containerId, state) {
      if (!state) {
        return
      }
      let operateName = containerApi.getOperatorNameByState(state)
      let key = guid()
      this.$message.loading({content: `正在${operateName} 容器，请稍后.....`, key, duration: 0});
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
    }, async exposeContainer(containerId) {
      let key = guid()
      this.$message.loading({content: "正在导出容器数据，请稍后....", key, duration: 0});
      let headers = {responseType: 'blob', Authorization: localStorage.token};
      this.$axios.get(`/api/container/${containerId}/export`, {headers}).then(
          (res) => {
            download(res.data, `${containerId}.tar.gz`)
            this.$message.info({content: "容器已成功导出并下载....", key});
          })
          .catch(e => {
            this.$message.error({content: "容器导出失败,请检查 Docker 服务是否正常", key});
          })
    }, openNetworkConnectModal(containerId) {
      this.connectNetworkConnectModal = true
      this.updateContainerInfo(containerId)
      this.updateNetworkList()
      this.currentContainerId = containerId
    }, operatorNetwork(operator, networkId) {
      let operatorName = operator === 'connect' ? '连接' : '断开'
      this.$axios.get(
          `/api/network/${networkId}/container/${this.currentContainerId}/${operator}`)
          .then(res => {
            let {Code, Msg} = res.data;
            if (Code === 'OK') {
              this.$message.info(`${operatorName} 网络完成！`)
            } else {
              this.$message.warning(`${operatorName} 失败,${Msg}`)
            }
            this.updateContainerInfo(this.currentContainerId)
          }).catch(e => {
        this.$message.error({content: `${operatorName} 网络 失败, 请检查 Docker 服务是否正常`});
      })
    }, openTerminal(state, containerId) {
      if (state !== '运行中') {
        this.$message.error("容器尚未运行，不能打开终端管理界面");
        return
      }

      let router = this.$router;
      let openUrl = function () {
        let routeUrl = router.resolve({
          path: "/terminal/console",
          query: {containerId: containerId}
        });
        window.open(routeUrl.href, '_blank');
      }

      this.$confirm({
        title: '运行提示',
        content: '目前终端仅支持基于 Linux 平台的容器,在使用前请确认是否是Linux平台的容器，否则可能出现各种未知的错误 !!!',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          openUrl()
        }
      });

    }, openFileManagementModal(state, containerId) {
      if (state !== '运行中') {
        this.$message.error("容器尚未运行，不能打开文件管理界面");
        return
      }

      let router = this.$router;
      this.currentContainerId = containerId
      let openUrl = function () {
        let routeUrl = router.resolve({
          path: "/terminal/file",
          query: {containerId: containerId}
        });
        window.open(routeUrl.href, '_blank');
      }

      this.$confirm({
        title: '运行提示',
        content: '目前文件管理仅支持基于 Linux/64位 平台的容器,在使用前请确认容器是否是 Linux/64位平台的容器，否则可能出现各种未知的错误 !!!',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          openUrl()
        }
      });
    }, openContainerMonitor(state, containerId) {

      if (state !== '运行中') {
        this.$message.error("容器尚未运行，不能打开性能监控界面");
        return
      }

      let routeUrl = this.$router.resolve({
        path: "/terminal/monitor",
        query: {containerId: containerId}
      });
      window.open(routeUrl.href, '_blank');
    }
  }
}
;
</script>

<style scoped>
.ant-drawer-body {
  padding: 0 !important;
}


.ant-modal-body {
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
