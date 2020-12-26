<template>
  <div class="imageContainer">
    <a-form layout="inline" :form="form">
      <a-form-item>
        <a-input placeholder="搜索关键词">
          <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>


      <a-form-item>
        <a-space>
          <a-button type="primary">
            搜索
          </a-button>

          <a-button html-type="reset">
            重置
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <a-table :columns="columns" :data-source="containerList" style="margin-top: 30px"
             size="default">
    <span slot="action" slot-scope="text, record">
      <a-space>
        <a href="#">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="#">停止</a>
        <a-divider type="vertical"></a-divider>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">更多 <a-icon
              type="down"/> </a>
          <a-menu slot="overlay">
            <a-menu-item>
                <a href="#">重启容器</a>
            </a-menu-item>
            <a-menu-item>
                <a href="#">删除容器</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#">导出容器</a>
            </a-menu-item>

            </a-menu>
        </a-dropdown>

      </a-space>
    </span>
    </a-table>
  </div>
</template>
<script>
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

  let containerList = [];

  export default {
    data() {
      return {
        form: {},
        containerList,
        columns,
      };
    }, mounted() {
      this.$axios.get('/api/container').then(res => {
        let data = res.data;
        let newList = []
        for (let i = 0; i < data.length; i++) {
          let container = data[i];
          let names = container.Names;
          for (let index in names) {
            let imageName = container.Image;
            if (imageName.startsWith("sha256")) {
              imageName = imageName.substring(7, 19);
            }

            newList.push({
              containerId: container.Id.substring(0, 12),
              containerName: names[index].substring(1),
              imageName: imageName,
              created: this.formatDate(container.Created),
              state: container.State
            })
          }
          this.containerList = [...newList]
        }
      });
    }, methods: {
      formatDate: function (dateValue) {
        let date = new Date(dateValue * 1000);
        let YY = date.getFullYear() + '-';
        let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            + '-';
        let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      }
    }
  }
  ;
</script>
