<template>

    <a-form-model :label-col="{span:2}" :wrapper-col="{span:20}" v-model="config">

        <a-form-model-item label="启用 Docker 日志">
            <span style="margin-left: 20px"></span>
            <a-switch v-model="config.enableDockerLog" checked-children="启用" un-checked-children="关闭"/>
        </a-form-model-item>

        <a-form-model-item label="镜像/容器备份目录">
            <span style="margin-left: 20px"></span>
            <a-input placeholder="请输入备份目录" v-model="config.backDir"></a-input>
        </a-form-model-item>

        <a-space>
            <a-button type="danger" icon="issues-close">默认</a-button>
            <a-button type="primary" icon="save" @click="save">保存</a-button>
        </a-space>
    </a-form-model>
</template>

<script>

    import systemConfigApi from "@/api/SystemConfigApi";

    export default {
        name: "SystemDockerConfig",
        data() {
            return {
                config: {
                    enableDockerLog: true,
                    backDir: ''
                }
            }
        }, async beforeMount() {
            let res = await systemConfigApi.getDockerConfig();
            let {Code, Data} = res.data;
            if (Code === 'OK') {
                let {backDir, enableDockerLog} = Data;
                this.config.enableDockerLog = enableDockerLog;
                this.config.backDir = backDir;
            }
        },
        methods: {
            async save() {
                let res = await systemConfigApi.saveDockerConfig(this.config)
                let {Code} = res.data;
                if (Code === 'OK') {
                    this.$message.info('配置保存成功');
                }
            }
        }
    }
</script>

<style scoped>

</style>