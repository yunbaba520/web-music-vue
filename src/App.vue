<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter/>
</template>
<script>
//有按需引入，自定义组件也不需要导入，但因为习惯，还是自己手动导入吧

import AppHeader from "./components/app-header.vue";
import AppFooter from "./components/app-footer.vue"
export default {
  components: {
    AppHeader,
    AppFooter
  },
};
</script>
<style lang="less">

</style>
