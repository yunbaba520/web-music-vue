<template>
  <div class="ranking-wrap" v-if="upData.tracks">
    <div class="ranking">
      <div class="header">
        <div class="header-bg"></div>
        <span class="header-more" @click="JumpRankingList">更多</span>
      </div>
      <div class="toplist-list">
        <ToplistItem :toplistData="upData"></ToplistItem>
        <ToplistItem :toplistData="newData"></ToplistItem>
        <ToplistItem :toplistData="originData"></ToplistItem>
        <ToplistItem :toplistData="hotData"></ToplistItem>
        <ToplistItem :toplistData="balladData"></ToplistItem>
        
      </div>
    </div>
  </div>
</template>

<script>
import ToplistItem from '../../../components/toplist-item.vue'
import {requestRankingData} from '../../../server/page_request/home_request'
export default {
  created() {
    /* 飙升榜 */
    requestRankingData(19723756).then(res=>{
      this.upData= res.playlist
    })
    /* 新歌榜 */
    requestRankingData(3779629).then(res=>{
      this.newData= res.playlist
    })
    /* 原创榜 */
     requestRankingData(2884035).then(res=>{
      this.originData= res.playlist
    })
    /* 热歌榜 */
     requestRankingData(3778678).then(res=>{
      this.hotData= res.playlist
    })
    /* 民谣榜 */
     requestRankingData(5059661515).then(res=>{
      this.balladData= res.playlist
    })
  },
  data(){
    return{
      upData:{},
      newData:{},
      originData:{},
      hotData:{},
      balladData:{}
    }
  },
  components:{
    ToplistItem
  },
  methods:{
    JumpRankingList() {
      this.$router.push({
        path:'/layout/toplist',
      })
    }
  }
};
</script>

<style lang="less" scoped>
.ranking-wrap {
  background-image: linear-gradient(#fef9f3, #ffffff);
  .ranking {
    width: 1200px;
    margin: 0 auto;
    .header {
      position: relative;
      width: 1200px;
      height: 40px;
      padding: 50px 0 24px 0;
      .header-bg {
        width: 196px;
        height: 40px;
        margin: 0 auto;
        background: url("../../../assets/img/header-title.png") no-repeat 0 -200px;
        background-size: 196px;
      }
      .header-more {
        position: absolute;
        top: 60px;
        right: 0;
        color: #888;
        cursor: pointer;
      }
    }
    .toplist-list {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
