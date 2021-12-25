<template>
  <div>
    <q-table
      :rows="volumeListOfFilter"
      :columns="columns"
      :pagination="{rowsPerPage:10}"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary" :label="$t('refresh')" class="q-ma-sm" icon="fa fa-sync" @click="refreshList"/>
        <q-btn color="secondary" :label="$t('create')" class="q-ma-sm" icon="fas fa-plus-circle" @click="createVolume"/>
        <q-space/>
        <q-input dense color="primary" v-model="filterKey" @input="(val=>this.filterKey = val)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>


      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('tag')"/>
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
import api from '../api/VolumeApi'


export default defineComponent({
  name: 'VolumeList',
  mounted() {
    this.refreshList()
  },
  methods: {
    refreshList: async function () {
      this.tableData = await api.volumeListApi();
      this.volumeListOfFilter = this.tableData.Volumes
      this.$q.notify({
        message: '存储卷列表加载完成',
        position: 'top',
        color: 'purple',
        icon: 'fab fa-docker'
      })
    },
    removeVolume: function () {

    },
    createVolume: function () {

    }
  },
  watch: {
    filterKey() {
      if (!this.filterKey || this.filterKey === '') {
      }
      // let inId = image => image.Id.indexOf(this.filterKey) !== -1;
      // let inRepoTag = image => (JSON.stringify(image.RepoTags).indexOf(this.filterKey) !== -1);
      // this.volumeListOfFilter = this.tableData.filter(image => inId(image) || inRepoTag(image));
    }
  },
  data() {
    return {
      filterKey: '',
      columns: [
        {
          name: 'Name',
          label: this.$t('name'),
          align: 'left',
          field: 'Name',
          format: val => `${val.replaceAll('sha256:', '').substr(0, 12)}`
        },
        {
          name: 'Mountpoint',
          label: this.$t('mount'),
          align: 'left',
          field: 'Mountpoint'
        },
        {
          name: 'Driver',
          align: 'left',
          label: this.$t('driver'),
          field: 'Driver'
        },
        {
          name: 'Scope',
          align: 'left',
          label: this.$t('scope'),
          field: 'Scope'
        },
        {
          name: 'CreatedAt',
          align: 'left',
          label: this.$t('createTime'),
          field: 'CreatedAt',
        },
        {name: 'actions', label: this.$t('actions'), align: 'right', field: 'actions'}
      ],
      tableData: [],
      volumeListOfFilter: [],
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
