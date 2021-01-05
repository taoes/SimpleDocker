<template>
  <div class="imageContainer">
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="搜索关键词" v-model="searchKey" @change="searchKeyOnchange"
                 v-focus
                 style="width: 400px">
          <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button html-type="reset" @click="reloadImageList">
            <a-icon type="reload"></a-icon>
            刷新
          </a-button>

          <a-button type="primary" @click="pullImage">
            <a-icon type="download"></a-icon>
            拉取
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="imageList"
             style="margin-top: 30px">
    <span slot="action" slot-scope="text, record">
      <a-space>
        <a href="#" @click="detail(record.imageLongId)">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="#" @click="remove(record.imageLongId)">删除</a>
        <a-divider type="vertical"></a-divider>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">更多 <a-icon
              type="down"/> </a>
          <a-menu slot="overlay">
            <a-menu-item>
                <a href="#" @click="openNewContainerConfigModal(record.rep)">运行镜像</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#" @click="exportImg(record.imageLongId)">导出镜像</a>
            </a-menu-item>
            <a-menu-item>
                <a href="#" @click="openReTagModal(record.rep)">重新标记</a>
            </a-menu-item>
            </a-menu>
        </a-dropdown>
      </a-space>
    </span>
    </a-table>


    <a-modal v-model="tagImageVisible" title="重新标记" okText="标记" cancelText="取消" @ok="callReTagApi">
      <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
        <a-form-item label="原 Tag">
          <a-input v-model="oldTag" disabled/>
        </a-form-item>
        <a-form-item label="新 Tag">
          <a-input @change="e=> this.newTag = e.target.value"/>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model="runImageVisible" title="运行新的容器" okText="运行" cancelText="取消"
             @ok="callRunNewContainerApi">
      <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }"
                    v-model="containerConfig">
        <a-form-model-item label="镜像名称">
          <a-input v-model="containerConfig.imageName" disabled=""/>
        </a-form-model-item>

        <a-form-model-item label="容器名称">
          <a-input v-model="containerConfig.containerName" placeholder="请输入容器名称"/>
        </a-form-model-item>

        <a-form-model-item label="端口映射">
          <a-input v-model="containerConfig.bindPort" placeholder="宿主机端口:容器端口(多个挂载使用;分割)"/>
        </a-form-model-item>

        <a-form-model-item label="环境变量">
          <a-input v-model="containerConfig.env" placeholder="环境变量键=环境变量值(多个变量使用;分割)"/>
        </a-form-model-item>

        <a-form-model-item label="目录挂载">
          <a-input v-model="containerConfig.volume" placeholder="宿主机目录:容器目录(多个挂载使用;分割)"/>
        </a-form-model-item>

      </a-form-model>
    </a-modal>


    <a-modal v-model="pullImageVisible" title="拉取新的镜像" okText="拉取" cancelText="关闭" width="800px"
             @ok="callPullImageApi">
      <a-form-model :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }"
                    v-model="containerConfig">
        <a-form-model-item label="镜像">
          <a-input v-model="pullImageConfig.imageName"/>
        </a-form-model-item>
      </a-form-model>

      <pre style="overflow-y: auto; overflow-x:auto;height: 300px;background-color: #EFEFEF">{{pullLog}}</pre>

    </a-modal>


    <a-drawer
        placement="right"
        width="35%"
        @close="close"
        :visible="showDetail">
      <a-collapse :activeKey="['info','config']">
        <a-collapse-panel key="info" header="镜像信息">
          <p style="text-wrap: inherit">ID: {{ this.imageInfo.Id }}</p>
          <p style="text-wrap: inherit">父级 ID: {{ this.imageInfo.Parent }}</p>
          <p>大小: {{ (this.imageInfo.Size / 1024 / 1024) .toFixed(2)}} M</p>
          <p>架构: {{ this.imageInfo.Architecture }}</p>
          <p>系统: {{ this.imageInfo.Os }}</p>
          <p>驱动: {{ this.imageInfo.GraphDriver.Name }}</p>
          <p>Docker版本 : {{ this.imageInfo.DockerVersion }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="config" header="镜像配置">
          <p>主机: {{ this.imageInfo.Config.Host }}</p>
          <p>域名: {{ this.imageInfo.Config.Domainname }}</p>
          <p>端口暴露: {{ this.imageInfo.Config.ExposedPorts}}</p>
          <p>环境变量：{{ this.imageInfo.Config.Env}}</p>
          <p>程序入口: {{ this.imageInfo.Config.Cmd}} </p>
          <p>工作目录: {{ this.imageInfo.Config.WorkingDir}} </p>
        </a-collapse-panel>
      </a-collapse>
    </a-drawer>
  </div>
</template>
<script>


  import {mapActions} from "vuex";
  import imageApi from "../api/ImageApi";
  import {guid} from '../utils/index'

  const columns = [
    {
      title: '镜像 Id',
      key: 'imageId',
      dataIndex: 'imageId',
    },
    {
      title: '镜像 Tag',
      dataIndex: 'rep',
      key: 'rep',
    },

    {
      title: '镜像大小',
      dataIndex: 'size',
      key: 'size',
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
        searchKey: '',
        oldTag: '',
        newTag: '',
        showDetail: false,
        currentImageId: '',
        currentRep: '',
        columns,
        containerConfig: {
          imageName: '',
          containerName: '',
          bindPort: '',
          env: '',
          volume: ''
        },
        pullImageConfig: {imageName: ''},
        pullLog: '',
        pulling: false,
        pullImageVisible: false,
        runImageVisible: false,
        tagImageVisible: false,
      };
    }, mounted() {
      this.updateImage()
    },
    computed: {
      imageList: function () {
        let allImageList = this.$store.state.image.imageList;
        if (this.searchKey === '' || this.searchKey.trim() === '') {
          return allImageList
        }
        return allImageList
        .filter(i => i.rep.indexOf(this.searchKey) >= 0 || i.imageId.indexOf(this.searchKey) >= 0)
      }, imageInfo: function () {
        return this.$store.state.image.imageInfo;
      }, containerList: function () {
        return this.$store.state.container.containerList;
      }
    },
    methods: {
      ...mapActions({
        updateImage: "updateImageList",
        getImageInfo: "getImageInfo",
        removeImage: "removeImage"
      }),
      searchKeyOnchange: function (e) {
        this.searchKey = e.target.value
      },
      detail: function (imageId) {
        this.showDetail = true;
        this.currentImageId = imageId;
        this.getImageInfo({imageId})
      },
      remove: function (imageId) {
        let context = this;
        this.$confirm({
          title: `是否确认删除此镜像?`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            context.$axios.get(`/api/image/${imageId}/remove/false`).then(res => {
              let data = res.data;
              if (data.Code === 'OK') {
                context.$message.info('镜像删除完成!');
                this.updateImage()
              } else {
                context.$confirm({
                  title: `删除镜像失败，是否强制删除?`,
                  content: data.Msg,
                  okText: '确认',
                  cancelText: '取消',
                  onOk: () => this.forceRemove(imageId)
                })
              }
            }).catch(e => {
              this.$notification['error']({
                message: '删除镜像失败',
                description: "访问 Docker 镜像出现异常,请检查 Docker 服务是否正常启动",

              });
            })

          },
          class: 'test',
        });

      },
      forceRemove: function (imageId) {
        this.$axios.get(`/api/image/${imageId}/remove/true`).then(res => {
              let {Code, Msg} = res.data;
              if (Code === 'OK') {
                this.$message.info('强制删除镜像完成!');
                this.updateImage()
              } else {
                this.$message.error(Msg);
              }
            }
        ).catch(e => {
          this.$message.error("访问 Docker 镜像出现异常,请检查 Docker 服务是否正常启动");
        })
      },
      reloadImageList: function () {
        this.updateImage()
        this.$message.info('刷新镜像列表完成');
      },
      pullImage: function () {
        this.pullImageVisible = true;
      },
      close: function (e) {
        this.showDetail = false;
      },
      openNewContainerConfigModal: function (imageName) {
        this.containerConfig.imageName = imageName;
        this.runImageVisible = true;
      }, callPullImageApi() {
        if (this.pulling) {
          this.$message.error("正在拉去镜像,请等待当前任务完成")
          return;
        }

        this.pulling = true
        this.pullLog = "正在拉取镜像，请稍后！<br/> 具体时间取决于网络状态以及和镜像中心的连接速度..."
        let imageName = this.pullImageConfig.imageName;
        if (imageName.trim() === '') {
          this.$message.error("镜像名称不能为空")
          return
        }

        let key = guid()
        this.$message.loading({content: "正在拉取镜像，请稍后....", key, duration: 0})
        this.$axios.get(`/api/image/pull?refStr=${imageName}`)
        .then(res => {
          let {Data, Code, Msg} = res.data
          if (Code === 'OK') {
            this.pullLog = Data
            this.$message.info({content: "拉取镜像完成", key})
          } else {
            this.pullLog = Msg
            this.$message.warning({content: Msg, key})
          }
        }).catch(e => {
          this.$message.error({content: '网络访问失败，请检查服务是否正常启动', key})
          this.pullLog = "网络访问失败，请检查服务是否正常启动"
        })
        this.pulling = false
      }, exportImg: function (imageId) {
        let key = guid()
        this.$message.loading({content: "正在导出镜像，请稍后....", key, duration: 0});

        let config = {
          withCredentials: true,
          timeout: 600000
        }
        this.$axios.create(config).get(`/api/image/${imageId}/save`, {responseType: 'blob'}).then(
            (res) => {
              this.download(res.data, `${imageId}.tar.gz`)
              this.$message.info({content: "镜像已成功导出并下载....", key});
            })
        .catch(e => {
          this.$message.error({content: "镜像导出失败,请检查 Docker 服务是否正常", key});
        })
      }, openReTagModal: function (oldTag) {
        this.tagImageVisible = true
        this.oldTag = oldTag
      }, async callRunNewContainerApi() {
        let res = await imageApi.runNewContainer(this.containerConfig)
        let {Code, Msg} = res.data
        if (Code === 'OK') {
          this.$message.info('新的容器启动完成!');
          this.runImageVisible = false;
        } else {
          this.$message.error(Msg);
        }
      },
      download: function (data, fileName) {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          let blob = new Blob([data], {
            type: 'application/vnd.ms-excel'
          })
          window.navigator.msSaveOrOpenBlob(blob, fileName)
        } else {
          let blob = new Blob([data])
          let downloadElement = document.createElement('a')
          let href = window.URL.createObjectURL(blob)
          downloadElement.href = href
          downloadElement.download = fileName
          document.body.appendChild(downloadElement)
          downloadElement.click()
          document.body.removeChild(downloadElement)
          window.URL.revokeObjectURL(href)
        }
      }, callReTagApi: function () {
        if (this.newTag === '' || this.newTag.trim() === '') {
          this.tagImageVisible = false
          this.$notification['warning']({
            message: '标记失败',
            description: "新的镜像tag 不能为空字符串"
          });
          return
        }

        if (this.newTag.trim() === this.oldTag.trim()) {
          this.tagImageVisible = false
          this.$notification['warning']({
            message: '标记失败',
            description: "新的镜像tag不能和原镜像重复"
          });
          return
        }

        let data = {
          source: this.oldTag,
          tag: this.newTag
        }
        this.$axios.get(
            `/api/image/tag`, {params: data}
        )
        .then((res) => {
          let data = res.data;
          if (data.Code === 'OK') {
            this.$message.info('标记镜像完成!');
            this.tagImageVisible = false
            this.updateImage()
          } else {
            this.$notification['warning']({
              message: '标记镜像失败',
              description: data.Msg
            });
          }
        })
        .catch(e => {
          this.$notification['warning']({
            message: '标记镜像失败',
            description: "镜像标记失败,请检查 Docker 服务是否正常"
          });
        })
      }
    }
  }
  ;
</script>

<style scoped>
  .ant-drawer-body {
    padding: 0 !important;
  }
</style>
