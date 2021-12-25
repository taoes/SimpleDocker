<template>
  <q-layout class="lHh Lpr lFf flex-row">
    <router-view/>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'


import {defineComponent} from 'vue'

export default defineComponent({
  name: 'LoginLayout',
  components: {
    EssentialLink
  },
  methods: {},
  data() {
    return {}
  },
})
</script>


<style scoped>
.flex-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FEFEFE;
}

</style>
