<template>
  <AppHeader />
  <router-view></router-view>
</template>
<script>
//有按需引入，自定义组件也不需要导入，但因为习惯，还是自己手动导入吧

import AppHeader from "./components/app-header.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>
<style lang="less">

</style>
