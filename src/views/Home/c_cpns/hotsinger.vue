<template>
  <div class="hotsinger-wrap" v-if="singerData.length > 0">
    <div class="hotsinger">
      <div class="header">
        <div class="header-title">热门歌手</div>
        <div class="header-more" @click="JumpSingerList">更多</div>
      </div>
      <div class="singer-list">
        <template v-for="item in singerData" :key="item.id">
          <singer-item :img="item.picUrl" :name="item.name" @imgClick="JumpSingerDetail(item.id)" @nameClick="JumpSingerDetail(item.id)"></singer-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import SingerItem from "../../../components/singer-item.vue";
import { requestHotSingerData } from "../../../server/page_request/home_request";
export default {
  created() {
    requestHotSingerData().then((res) => {
      this.singerData = res.artists;
    });
  },
  data() {
    return {
      singerData: [],
    };
  },
  components: {
    SingerItem,
  },
  methods:{
    JumpSingerDetail(id) {
      this.$router.push({
        path:"/layout/singer/singerDetail",
        query:{
          id
        }
      })
    },
    JumpSingerList() {
      this.$router.push({
        path:"/layout/singer/singerList",
      })
    }
  }
};
</script>

<style lang="less" scoped>
.hotsinger-wrap {
  background-image: linear-gradient(#fef9f3, #ffffff);
  .hotsinger {
    width: 1200px;
    margin: 0 auto;
    .header {
      position: relative;
      height: 40px;
      padding: 50px 0 24px 0;
      .header-title {
        width: 176px;
        height: 40px;
        margin: 0 502px;
        padding-left: 20px;
        color: #444;
        font-size: 30px;
        line-height: 40px;
        letter-spacing: 13px;
        text-shadow: 0 0 2px #555;
      }
      .header-more {
        position: absolute;
        top: 70px;
        right: 0px;
        color: #888;
        cursor: pointer;
      }
    }
    .singer-list {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
