<template>
  <div>
    <q-table
      :rows="listOfFilter"
      :columns="columns"
      :pagination="{rowsPerPage:10}"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary" :label="$t('refresh')" class="q-ma-sm" icon="fa fa-sync" @click="refresh"/>
        <q-btn color="secondary" :label="$t('create')" class="q-ma-sm" icon="fas fa-plus-circle" @click="create"/>
        <q-space/>
        <q-input dense color="primary" v-model="filterKey" @input="(val=>this.filterKey = val)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>


      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('run')" @click="toContainerCreate(props)"/>
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('bound')"/>
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('detail')" @click="showInfoDialog = true"/>
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('delete')"/>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="showInfoDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 50vh" class="scroll">
          <p v-for="n in 15" :key="n">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit
            voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem
            aut, natus minima, porro labore.</p>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup/>
          <q-btn flat label="Accept" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script>
import {defineComponent} from 'vue';
import api from '../api/NetworkApi'
import _ from 'lodash'
import bytesToSize from "src/utils/SizeUtils";
import formatTimestamp from "src/utils/TimeUtils";


export default defineComponent({
  name: 'NetworkList',
  mounted() {
    this.refresh()
  },
  methods: {
    refresh: async function () {
      this.tableData = await api.networkListApi();
      this.listOfFilter = this.tableData
      this.$q.notify({
        message: '网络配置列表加载完成',
        position: 'top',
        color: 'purple',
        icon: 'fab fa-docker'
      })
    },
    remove: function () {

    },
    bound: function () {

    }, create: function () {

    }
  },
  watch: {
    filterKey() {
      if (!this.filterKey || this.filterKey === '') {
      }
      // let inId = image => image.Id.indexOf(this.filterKey) !== -1;
      // let inRepoTag = image => (JSON.stringify(image.RepoTags).indexOf(this.filterKey) !== -1);
      // this.listOfFilter = this.tableData.filter(image => inId(image) || inRepoTag(image));
    }
  },
  data() {
    return {
      filterKey: '',
      columns: [
        {
          name: 'Id',
          label: this.$t('imageId'),
          align: 'left',
          field: 'Id',
          format: val => `${val.replaceAll('sha256:', '').substr(0, 12)}`,
          sortable: true
        },
        {
          name: '网关',
          align: 'left',
          label: this.$t('gateway'),
          format: (val, row) => _.get(row, "IPAM.Config", []).map(config => config.Gateway)
        },
        {
          name: '子网掩码',
          align: 'left',
          label: this.$t('subnet'),
          format: (val, row) => _.get(row, "IPAM.Config", []).map(config => config.Subnet)
        },
        {
          name: 'Created',
          align: 'left',
          label: this.$t('createTime'),
          field: 'Created'
        },
        {name: 'actions', label: this.$t('actions'), align: 'right', field: 'actions'}
      ],
      tableData: [],
      listOfFilter: [],
      showInfoDialog: false,
    }
  }
})
</script>


<style lang="sass" scoped>
.sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #fff

  td:first-child
    background-color: #f5f5dc

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
