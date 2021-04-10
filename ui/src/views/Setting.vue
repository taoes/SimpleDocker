<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="Docker 设置">
        <SystemDockerConfig/>
      </a-tab-pane>

      <a-tab-pane key="2" tab="事件通知设置">
        <SystemNotifyConfig/>
      </a-tab-pane>

      <a-tab-pane key="3" tab="关于系统">
        <SystemAboutConfig/>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import ResetPassword from "../components/ResetPassword";
import SystemDockerConfig from "@/components/config/SystemDockerConfig";
import SystemNotifyConfig from "@/components/config/SystemNotifyConfig";
import SystemAboutConfig from "@/components/config/SystemAboutConfig";

export default {
  components: {SystemAboutConfig, SystemNotifyConfig, SystemDockerConfig, ResetPassword},
};
</script>


