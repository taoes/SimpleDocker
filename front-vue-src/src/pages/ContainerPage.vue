<template>
  <div>
    <q-table
      dense
      :rows="containerListOfFilter"
      :columns="columns"
      :pagination="{rowsPerPage:10}"
      row-key="name"
    >
      <template v-slot:top>
        <q-btn color="primary"
               :label="$t('refresh')"
               class="q-ma-sm"
               icon="fa fa-sync"
               @click="refresh"/>

        <q-btn color="secondary"
               :label="$t('create')"
               class="q-ma-sm"
               icon="fas fa-plus-circle"
               @click="refresh"/>

        <q-space/>

        <q-input dense color="primary" v-model="filterKey" @input="(val=>this.filterKey = val)">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>


      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('run')"/>
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('tag')"/>
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('detail')" @click="showInfoDialog = true"/>
          <q-btn dense flat color="primary" class="q-mr-sm-sm" :label="$t('delete')" @click="remove(props)"/>
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
import api from '../api/ContainerApi'
import formatTimestamp from "src/utils/TimeUtils";


export default defineComponent({
  name: 'ContainerPage',
  mounted() {
    this.refresh()
  },
  methods: {
    refresh: async function () {
      this.tableData = await api.containerListApi();
      this.containerListOfFilter = this.tableData
      this.$q.notify({
        message: '容器列表加载完成',
        position: 'top',
        color: 'purple',
        icon:'fab fa-docker'
      })

    },
    remove: function (props) {
      console.log(props)
      this.$q.notify({
        message: '容器列表加载完成',
        position:'top-right'
      })
    }
  },
  watch: {
    filterKey() {
      if (!this.filterKey || this.filterKey === '') {
      }
      let inId = container => container.Id.indexOf(this.filterKey) !== -1;
      let inImage = container => container.Image.indexOf(this.filterKey) !== -1;
      let inNames = container => (JSON.stringify(container.Names).indexOf(this.filterKey) !== -1);
      this.containerListOfFilter = this.tableData.filter(container => inId(container) || inImage(container)) || inNames(container);
    }
  },
  data() {
    return {
      filterKey: '',
      columns: [
        {
          name: 'Id',
          label: this.$t('containerId'),
          align: 'left',
          field: 'Id',
          format: val => `${val.substr(0, 12)}`,
          sortable: true
        },
        {name: 'Names', align: 'left', label: this.$t('containerName'), field: 'Names', format: names => names.map(name=>name.substr(1))},
        {
          name: 'Image',
          align: 'left',
          label: this.$t('imageTag'),
          field: 'Image',
          format: Image => Image
        },
        {
          name: 'State',
          align: 'left',
          label: this.$t('state'),
          field: 'State',
          format: State => State
        },
        {
          name: 'Created',
          align: 'left',
          label: this.$t('createTime'),
          field: 'Created',
          format: Created => formatTimestamp(Created * 1000)
        },
        {name: 'actions', label: this.$t('actions'), align: 'right', field: 'actions'}
      ],
      tableData: [],
      containerListOfFilter: [],
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
