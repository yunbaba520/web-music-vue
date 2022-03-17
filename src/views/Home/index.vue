<template>
  <div>
    <Banner />
    <SongSheet/>
    <NewSongs/>
    <HotSinger/>
    <NewAlbum/>
    <Ranking/>
  </div>
</template>

<script>
import Banner from "./c_cpns/banner.vue";
import SongSheet from "./c_cpns/songsheet.vue"
import NewSongs from "./c_cpns/newsongs"
import HotSinger from "./c_cpns/hotsinger.vue"
import NewAlbum from './c_cpns/newalbum.vue'
import Ranking from './c_cpns/ranking.vue'
export default {
  
  components: {
    Banner,
    SongSheet,
    NewSongs,
    HotSinger,
    NewAlbum,
    Ranking
  },
 
};
</script>

<style lang="less" scoped>

</style>
