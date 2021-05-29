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

                    <a-button @click="pullImage">
                        <a-icon type="cloud-download"></a-icon>
                        拉取
                    </a-button>

                    <a-button @click="importImageVisible = true" type="primary">
                        <a-icon type="cloud-upload"></a-icon>
                        导入
                    </a-button>

                    <a-tooltip>
                        <template slot="title">删除无用镜像</template>
                        <a-button @click="callPruneImageApi()" type="danger">
                            <a-icon type="cloud-upload"></a-icon>
                            精简
                        </a-button>
                    </a-tooltip>

                </a-space>
            </a-form-item>
        </a-form>

        <a-table :columns="imageColumns" :data-source="imageList"
                 size="small"
                 :scroll="{ x: true }"
                 style="margin-top: 30px">
    <span slot="action" slot-scope="text, record">
      <a-space>

        <a-tooltip>
            <template slot="title">启动镜像</template>
            <a-icon type="play-circle" style="color: #52c41a;font-size: 18px"
                    @click="openCreateContainerGuide(record)"/>
        </a-tooltip>




        <a-tooltip>
            <template slot="title">镜像详情</template>
            <a-icon type="profile" style="color:darkslategray;font-size: 18px"
                    @click="detail(record.imageLongId)"/>
        </a-tooltip>





        <a-tooltip>
            <template slot="title">删除镜像</template>
            <a-icon type="delete" style="color:red;font-size: 18px"
                    @click="remove(record.imageLongId)"/>
        </a-tooltip>


        <a-tooltip>
            <template slot="title">备份至本地</template>
            <a-icon type="cloud-sync" style="font-size: 18px"
                    @click="backImageToLocal(record.imageLongId)"/>
        </a-tooltip>




        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <a-icon type="down-circle"
                  style="color: darkslategray;font-size: 18px"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
                <a href="#" @click="exportImg(record.imageLongId,record.rep)">
                <a-icon type="cloud-download"/>&nbsp;
                  导出镜像
                </a>
            </a-menu-item>

            <a-menu-item>
                <a href="#" @click="openReTagModal(record.rep)">
                  <a-icon type="tags"/>&nbsp;
                  重新标记</a>
            </a-menu-item>

            <a-menu-item>
                <a href="#" @click="push(record.imageLongId)">
                  <a-icon type="cloud-upload"/>&nbsp;
                  推送镜像</a>
            </a-menu-item>

            </a-menu>
        </a-dropdown>
      </a-space>
    </span>
        </a-table>

        <!--    更新Tag -->
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

        <!--    导入新的镜像-->
        <a-modal v-model="importImageVisible" title="导入新的镜像" okText="导入" cancelText="取消"
                 :footer="null"
                 @ok="closeImportImageVisible()">
            <a-form-model :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" v-model="containerConfig">
                <a-upload
                        name="file"
                        :headers="uploadFileHeader"
                        @change="importStatusChange"
                        :action="getFileUploadLink()">
                    选择文件上传
                </a-upload>

                <a-divider></a-divider>
                <span style="color:darkslategray">导入结果: {{ importResp }}</span>
            </a-form-model>
        </a-modal>

        <!--    拉取新的镜像-->
        <a-modal v-model="pullImageVisible" title="拉取新的镜像" width="800px" @ok="callPullImageApi">
            <a-form-model :label-col="{ span: 1 }" :wrapper-col="{ span: 23 }" v-model="containerConfig">
                <a-form-model-item label="镜像">
                    <a-input v-model="pullImageConfig.imageName"/>
                </a-form-model-item>

                <a-form-model-item label="授权" style="display: none">
                    <a-select v-model="pullImageConfig.auth">
                        <a-select-option value="无">无</a-select-option>
                    </a-select>
                </a-form-model-item>
            </a-form-model>

            <div class="pullLog">{{ pullLog }}
            </div>

        </a-modal>


        <!--    简单模式创建容器-->
        <a-modal v-model="runImageVisible" title="运行新的容器" okText="运行" cancelText="取消" @ok="callRunNewContainerApi">
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

        <!--   侧边栏-->
        <a-drawer
                placement="right"
                width="35%"
                @close="close"
                :visible="showDetail">

            <a-collapse :activeKey="['imageInfo','imageConfig']">
                <a-collapse-panel key="imageInfo" header="镜像信息">
                    <table class="configTable">
                        <tr>
                            <td class="tagTd">ID</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Id }}</td>
                        </tr>
                        <tr v-if="this.imageInfo.Parent">
                            <td class="tagTd">父级Id</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Parent }}</td>
                        </tr>
                        <tr>
                            <td class="tagTd">镜像大小</td>
                            <td class="contentTd" align="left"> {{ (this.imageInfo.Size / 1000000).toFixed(2) }}
                            </td>
                        </tr>

                        <tr>
                            <td class="tagTd">镜像架构</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Architecture }}</td>
                        </tr>

                        <tr>
                            <td class="tagTd">镜像系统</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Os }}</td>
                        </tr>

                        <tr>
                            <td class="tagTd">镜像模式</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.GraphDriver.Name }}</td>
                        </tr>

                        <tr>
                            <td class="tagTd">构建版本</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.DockerVersion }}</td>
                        </tr>
                    </table>
                </a-collapse-panel>

                <a-collapse-panel key="imageConfig" header="镜像配置">
                    <table class="configTable">
                        <tr v-if="this.imageInfo.Config.Host">
                            <td class="tagTd">主机名</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Config.Host }}</td>
                        </tr>
                        <tr v-if="this.imageInfo.Config.Domainname">
                            <td class="tagTd">域名</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Config.Domainname }}</td>
                        </tr>
                        <tr v-if="this.imageInfo.Config.ExposedPorts">
                            <td class="tagTd">端口</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Config.ExposedPorts }}
                            </td>
                        </tr>

                        <tr>
                            <td class="tagTd">环境变量</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Config.Env }}</td>
                        </tr>

                        <tr>
                            <td class="tagTd">入口命令</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Config.Cmd }}</td>
                        </tr>

                        <tr v-if="this.imageInfo.Config.WorkingDir">
                            <td class="tagTd">工作目录</td>
                            <td class="contentTd" align="left"> {{ this.imageInfo.Config.WorkingDir }}</td>
                        </tr>
                    </table>
                </a-collapse-panel>
            </a-collapse>
        </a-drawer>
    </div>
</template>
<script>


    import {mapActions} from "vuex";
    import imageApi from "../api/ImageApi";
    import {download, guid} from '../utils/index'
    import Config from '../api/Config'

    // eslint-disable-next-line no-undef
    const {imageColumns} = require('../utils/TableModelDefine')

    export default {
        data() {
            return {
                searchKey: '',
                oldTag: '',
                newTag: '',
                showDetail: false,
                currentImageId: '',
                currentRep: '',
                imageColumns,
                containerConfig: {
                    imageName: '',
                    containerName: '',
                    bindPort: '',
                    env: '',
                    volume: ''
                },
                importResp: '',
                pullImageConfig: {imageName: '', auth: ''},
                pullLog: '',
                pulling: false,
                importImageVisible: false,
                pullImageVisible: false,
                runImageVisible: false,
                tagImageVisible: false,
            };
        }, mounted() {
            this.updateImageList()
        },
        computed: {
            uploadFileHeader: function () {
                return {
                    "authorization": localStorage.token
                }
            }, imageList: function () {
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
                updateImageList: "updateImageList",
                getImageInfo: "getImageInfo",
                removeImage: "removeImage"
            }),
            getFileUploadLink() {
                return `${Config.HOST}/api/image/import`
            }, closeImportImageVisible() {
                this.importImageVisible = false
                this.updateImageList()
            }, importStatusChange(event) {
                let {file} = event;
                if (file.status === 'done') {
                    this.$message.info(`文件:${file.name} 导入完毕`)
                    let {Data} = file.response
                    this.importResp = Data
                }
            }, searchKeyOnchange: function (e) {
                this.searchKey = e.target.value
            }, detail: function (imageId) {
                this.showDetail = true;
                this.currentImageId = imageId;
                this.getImageInfo({imageId})
            }, push: function () {
                this.$message.warning("暂不支持推送镜像，请期待后续版本")
            },
            remove: function (imageId) {
                let context = this;
                this.$confirm({
                    title: `是否确认删除此镜像?`,
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        context.$axios.get(`/api/image/${imageId}/remove/false`).then(res => {
                            let {Code, Msg} = res.data;
                            if (Code === 'OK') {
                                context.$message.info('镜像删除完成!');
                                this.updateImageList()
                            } else {
                                context.$confirm({
                                    title: `删除镜像失败，是否强制删除?`,
                                    content: Msg,
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => this.forceRemove(imageId)
                                })
                            }
                        }).catch(() => {
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
                            this.updateImageList()
                        } else {
                            this.$message.error(Msg);
                        }
                    }
                ).catch(() => {
                    this.$message.error("访问 Docker 镜像出现异常,请检查 Docker 服务是否正常启动");
                })
            },
            reloadImageList: function () {
                this.updateImageList()
                this.$message.info('刷新镜像列表完成');
            },
            pullImage: function () {
                this.pullImageVisible = true;
            }, close: function () {
                this.showDetail = false;
            }, async openCreateContainerGuide(record) {
                let that = this;
                let {rep: imageName, imageId} = record;
                const h = this.$createElement;
                let content = h('div', {}, [
                    h('p', '🔥 简单模式: 快速创建容器, 功能小巧'),
                    h('p', '🛠 专业模式: 向导创建容器, 功能强大'),
                ]);
                this.$confirm({
                    title: `请选择容器创建模式`,
                    content,
                    okText: '简单模式',
                    cancelText: '专业模式',
                    onOk() {
                        that.containerConfig.imageName = imageName;
                        that.runImageVisible = true;
                    }, async onCancel() {
                        await that.$router.push(`/content/container_create?imageTag=${imageName}&imageId=${imageId}`)
                    }
                });


            },
            callPullImageApi() {
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
                this.$axios.get(`/api/image/pull?refStr=${imageName}`,
                    {headers: {'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(res => {
                        let data = res.data
                        this.pullLog = this.pullLog + data;
                        this.$message.info({content: '镜像获取完成', key})
                    }).catch(() => {
                    this.$message.error({content: '网络访问失败，请检查服务是否正常启动', key})
                    this.pullLog = "网络访问失败，请检查服务是否正常启动"
                })
                this.pulling = false
            }, async exportImg(imageId, imageTag) {
                let key = guid()
                this.$message.loading({content: "正在导出镜像，请稍后....", key, duration: 0});
                let config = {
                    withCredentials: true,
                    timeout: 600000,
                    responseType: 'blob', headers: {Authorization: localStorage.token}
                }
                this.$axios.create(config).post(`/api/image/save`, {imageTag, imageId})
                    .then(
                        (res) => {
                            download(res.data, `${imageId}.tar.gz`)
                            this.$message.info({content: "镜像已成功导出并下载....", key});
                        }).catch(() => {
                    this.$message.error({content: "镜像导出失败,请检查 Docker 服务是否正常", key});
                });
            }, async backImageToLocal(imageTag) {
                let key = guid()
                this.$message.loading({content: "正在备份镜像数据，请稍后....", key, duration: 0});
                let res = await imageApi.backImageToLocal(imageTag);
                let {Code, Msg, Data} = res.data;
                if (Code === 'OK') {
                    this.$message.info({content: `镜像已成功备份到: ${Data}`, key, duration: 5});
                } else {
                    this.$message.error({content: Msg, key});
                }


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
            }, async callReTagApi() {
                if (this.newTag.trim() === '') {
                    this.tagImageVisible = false
                    this.$message.warning("新的镜像tag 不能为空字符串");
                    return
                }
                if (this.newTag.trim() === this.oldTag.trim()) {
                    this.tagImageVisible = false
                    this.$message.warning("新的镜像tag不能和原镜像重复");
                    return
                }

                let res = await imageApi.renameImage({source: this.oldTag, tag: this.newTag});
                let {Code} = res.data;
                if (Code === 'OK') {
                    this.$message.info('标记镜像完成!');
                    this.tagImageVisible = false
                    this.updateImageList()
                }
            }, async callPruneImageApi() {
                let res = await imageApi.pruneImage()
                let {Code} = res.data
                if (Code === 'OK') {
                    this.$message.info(`精简镜像完成!!`);
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

    .pullLog {
        overflow-y: auto;
        overflow-x: auto;
        height: 300px;
        background-color: #EFEFEF;
    }
</style>
