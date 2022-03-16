<template>
  <div>
    <Banner />
    <SongSheet/>
    <NewSongs/>
    <HotSinger/>
    <NewAlbum/>
  </div>
</template>

<script>
import Banner from "./c_cpns/banner.vue";
import SongSheet from "./c_cpns/songsheet.vue"
import NewSongs from "./c_cpns/newsongs"
import HotSinger from "./c_cpns/hotsinger.vue"
import NewAlbum from './c_cpns/newalbum.vue'
export default {
  
  components: {
    Banner,
    SongSheet,
    NewSongs,
    HotSinger,
    NewAlbum
  },
 
};
</script>

<style lang="less" scoped>

</style>
