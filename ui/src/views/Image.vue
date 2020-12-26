<template>
  <div class="imageContainer">
    <a-form layout="inline">
      <a-form-item>
        <a-input placeholder="搜索关键词" v-model="searchKey" @change="searchKeyOnchange"
                 style="width: 400px">
          <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-space>
          <a-button html-type="reset" @click="refreshImageList">
            <a-icon type="reload"></a-icon>
            刷新
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-table :columns="columns" :data-source="imageList"
             style="margin-top: 30px"
             size="default">
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
                <a href="#">运行镜像</a>
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


    <a-modal v-model="tagImageVisible" title="重新标记" okText="标记" cancelText="取消" @ok="tagImage">
      <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
        <a-form-item label="原 Tag">
          <a-input v-model="oldTag" disabled/>
        </a-form-item>
        <a-form-item label="新 Tag">
          <a-input @change="e=> this.newTag = e.target.value"/>
        </a-form-item>
      </a-form>
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
          <p>大小: {{ (this.imageInfo.Size / 1024 / 1024) .toFixed(2)}} Mb</p>
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

  const qs = require('qs');

  const columns = [
    {
      title: '镜像ID',
      key: 'imageId',
      dataIndex: 'imageId',
    },
    {
      title: '仓库',
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
        tagImageVisible: false,
      };
    }, mounted() {
      this.updateImage();
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
              let data = res.data;
              if (data.Code === 'OK') {
                this.$message.info('强制删除镜像完成!');
                this.updateImage()
              } else {
                this.$notification['error']({
                  message: '强制删除镜像失败',
                  description: data.Msg
                });
              }
            }
        ).catch(e => {
          this.$notification['error']({
            message: '强制删除镜像失败',
            description: "访问 Docker 镜像出现异常,请检查 Docker 服务是否正常启动",
          });
        })
      },
      refreshImageList: function () {
        this.searchKey = ''
        this.updateImage()
      },
      close: function (e) {
        this.showDetail = false;
      }, exportImg: function (imageId) {
        const modal = this.$success({
          title: '正在导出,请稍等...',
          content: '正在导出，稍后会自动下载.......',
        });

        let config = {
          withCredentials: true,
          timeout: 600000
        }
        this.$axios.create(config).get(`/api/image/${imageId}/save`, {responseType: 'blob'}).then(
            (res) => {
              this.download(res.data, `${imageId}.tar.gz`)
              this.$notification['info']({
                message: '导出成功',
                description: "镜像已成功导出并下载....",
                duration: 10
              });
              modal.destroy()
            })
        .catch(e => {
          this.$notification['info']({
            message: '导出失败',
            description: "镜像导出失败,请检查 Docker 服务是否正常",
            duration: 10
          });
          modal.destroy()
        })
      }, openReTagModal: function (oldTag) {
        this.tagImageVisible = true
        this.oldTag = oldTag
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
      }, tagImage: function () {
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

<style>
  .ant-drawer-body {
    padding: 0 !important;
  }
</style>
