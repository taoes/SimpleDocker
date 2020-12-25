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

    <a-table :columns="columns" :data-source="imageList" style="margin-top: 30px" size="default">
    <span slot="action" slot-scope="text, record">
      <a-space>

        <a href="#">详情</a>
        <a-divider type="vertical"></a-divider>
        <a href="#">删除</a>
        <a-divider type="vertical"></a-divider>
        <a-dropdown>
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">更多 <a-icon
              type="down"/> </a>
          <a-menu slot="overlay">
            <a-menu-item>
                <a href="#">运行镜像</a>
            </a-menu-item>
            <a-menu-item>
              <a href="#">导出镜像</a>
            </a-menu-item>
            <a-menu-item>
                <a href="#">重新标记</a>
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

  let imageList = [];

  export default {
    data() {
      return {
        form: {},
        imageList,
        columns,
      };
    }, mounted() {
      this.$axios.get('http://localhost:8081/api/image').then(res => {
        let {data} = res;

        let newList = []
        for (let i = 0; i < data.length; i++) {
          let image = data[i];
          let tags = image.RepoTags;
          for (let tag in tags) {
            newList.push({
              rep: tags[tag],
              size: (image.Size / 1000000).toFixed(2) + 'Mb',
              imageId: image.Id.split(":")[1].substring(0, 12),
              created: this.formatDate(image.Created)
            })
          }
          this.imageList = [...newList]

        }
      });
    }, methods: {
      formatDate: function (date) {
        var date = new Date(date * 1000);
        var YY = date.getFullYear() + '-';
        var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
            + '-';
        var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
        var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return YY + MM + DD + " " + hh + mm + ss;
      }
    }
  }
  ;
</script>
