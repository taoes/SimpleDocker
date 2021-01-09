<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="安全设置">
        Content of Tab Pane 1
      </a-tab-pane>
      <a-tab-pane key="3" tab="关于软件">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      callback(key) {
        console.log(key);
      },
    },
  };
</script>


