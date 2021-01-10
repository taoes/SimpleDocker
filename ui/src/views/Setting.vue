<template>
  <div>
    <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="安全设置">
        开发中....
      </a-tab-pane>
      <a-tab-pane key="3" tab="关于软件">
        开发中....
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import ResetPassword from "../components/ResetPassword";

  export default {
    components: {ResetPassword},
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


