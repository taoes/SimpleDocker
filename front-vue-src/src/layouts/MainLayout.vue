<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          id="titleIcon"
          flat
          dense
          round
          :icon="menuIcon"
          aria-label="Menu"
          @click="this.toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t('appName') }}
        </q-toolbar-title>


        <q-btn-dropdown flat :label="$t('client')" icon="fab fa-codepen">


          <q-list dense class="q-mt-sm">
            <q-item clickable tabindex="0">
              本地Docker
            </q-item>

            <q-item clickable tabindex="0">
              远程Docker
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown flat :label="$t('setting')" icon="fab fa-codepen">
          <q-item-label header>{{ $t('sourceCode') }}</q-item-label>

          <q-list dense class="q-mt-sm">
            <q-item clickable tabindex="0">
              Github
            </q-item>

            <q-item clickable tabindex="0">
              GitEE
            </q-item>
          </q-list>

          <q-item-label header>{{ $t('language') }}</q-item-label>
          <q-list class="q-mt-sm">
            <q-item dense v-for="lang in langList" :key="`lang.title`" clickable v-close-popup tabindex="0"
                    @click="langUpdate(lang.name)">
              {{ lang.title }}
            </q-item>
          </q-list>

          <q-item-label header>{{ $t('account') }}</q-item-label>
          <q-list class="q-mt-sm">
            <q-item clickable @click="exit">📩 {{ $t('exit') }}</q-item>
          </q-list>

        </q-btn-dropdown>


      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
              dark
              bordered
              :mini="miniState"
              @mouseover="miniState = false"
              @mouseout="miniState = true">
      <q-list>
        <q-item-label header/>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'


import {defineComponent} from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  methods: {
    // 侧边栏
    toggleLeftDrawer: function () {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    // 切换语言
    langUpdate: function (val) {
      localStorage.setItem('lang', val)
      window.location.reload()
    },
    exit: function () {
      localStorage.removeItem('TOKEN')
      this.$router.push("/")
    }
  },
  watch: {
    leftDrawerOpen(val) {
      if (val) {
        this.menuIcon = 'fas fa-arrow-left'
      } else {
        this.menuIcon = 'fab fa-docker'
      }
    }
  },
  data() {
    return {
      essentialLinks: [
        {
          title: this.$t('index'),
          icon: 'fas fa-blog',
          link: '/app/index'
        },
        {
          title: this.$t('image'),
          icon: 'fas fa-layer-group',
          link: '/app/images'
        },
        {
          title: this.$t('container'),
          icon: 'fas fa-box',
          link: '/app/container'
        },
        {
          title: this.$t('volume'),
          icon: 'fas fa-save',
          link: '/app/volume'
        },
        {
          title: this.$t('network'),
          icon: 'fas fa-network-wired',
          link: '/app/network'
        },
        {
          title: this.$t('component'),
          icon: 'far fa-object-group',
          link: '/app/images'
        },
        {
          title: this.$t('system'),
          icon: 'fas fa-asterisk',
          link: '/app/config'
        },
        {
          title: this.$t('security'),
          icon: 'fas fa-shield-alt',
          link: '/app/security'
        }
      ],
      miniState: true,
      leftDrawerOpen: true,
      menuIcon: 'fab fa-docker',
      langList: [{
        title: '🇺🇸 English',
        name: 'en-US'
      }, {
        title: '🇨🇳 简体中文',
        name: 'zh-CN'
      }, {
        title: '🇭🇰 繁體中文',
        name: 'zh-TW'
      }

      ]
    }
  },
})
</script>

<style lang="sass">
#titleIcon
  .q-icon
    font-size: 1.7em !important

</style>
