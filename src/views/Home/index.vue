<template>
  <div>
    <Banner />
    <SongSheet/>
    <NewSongs/>
  </div>
</template>

<script>
import Banner from "./c_cpns/banner.vue";
import SongSheet from "./c_cpns/songsheet.vue"
import NewSongs from "./c_cpns/newsongs"
export default {
  
  components: {
    Banner,
    SongSheet,
    NewSongs
  },
 
};
</script>

<style lang="less" scoped>

</style>
