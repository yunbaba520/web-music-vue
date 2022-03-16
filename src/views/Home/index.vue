<template>
  <div>
    <Banner />
    <SongSheet/>
    <NewSongs/>
    <HotSinger/>
  </div>
</template>

<script>
import Banner from "./c_cpns/banner.vue";
import SongSheet from "./c_cpns/songsheet.vue"
import NewSongs from "./c_cpns/newsongs"
import HotSinger from "./c_cpns/hotsinger.vue"
export default {
  
  components: {
    Banner,
    SongSheet,
    NewSongs,
    HotSinger
  },
 
};
</script>

<style lang="less" scoped>

</style>
