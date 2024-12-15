<template>
  <a-config-provider :locale="zhCN">
    <router-view />
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import GlobalSetting from '@/components/global-setting/index.vue';
</script>
