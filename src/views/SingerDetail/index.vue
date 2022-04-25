<template>
  <div class="singer-detail-wrap">
    <div class="singer-detail">
      <div class="info">
        <img class="img" :src="baseInfo.cover" alt="" />
        <div class="content">
          <div class="info-title">{{ baseInfo.name }}</div>
          <div class="info-desc">{{ baseInfo.briefDesc }}</div>
          <div class="info-num">
            <span>单曲:{{ baseInfo.musicSize }}</span>
            <span>专辑:{{ baseInfo.albumSize }}</span>
            <span>MV:{{ baseInfo.mvSize }}</span>
          </div>
          <div class="info-btns">
            <div class="main" @click="jumpMain">
              <span>个人主页</span>
            </div>
            <div class="see-all" @click="jumpAllList">
              <span>查看全部歌曲</span>
            </div>
          </div>
        </div>
      </div>
      <router-view/>
      
    </div>
  </div>
</template>

<script>
/* 歌手详情 query需要id */
import {
  requestSingerDetail,
} from "../../server/page_request/singer_request";
export default {
  created() {
    this.getPageData(this.$route.query.id);
  },
  data() {
    return {
      baseInfo: {},

    };
  },
  methods: {
    getPageData(id) {
      requestSingerDetail(id).then((res) => {
        this.baseInfo = res.data.artist;
      });
      
    },
    jumpAllList() {
      this.$router.push({
        path:"allList",
        query:{
          id:this.$route.query.id
        }
      })
    },
    jumpMain() {
      this.$router.push({
        path:"hotList",
        query:{
          id:this.$route.query.id
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.singer-detail-wrap {
  background-color: #f8f8f8;
  .singer-detail {
    width: 1200px;
    margin: 0 auto;
    .info {
      display: flex;
      align-items: center;
      padding: 30px 0;
      .img {
        width: 250px;
        height: 250px;
        border-radius: 50%;
        margin-right: 50px;
      }
      .content {
        .info-title {
          font-size: 38px;
        }
        .info-desc {
          color: #666;
          margin-top: 8px;
          /* 显示一行 */
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -moz-box;
          -moz-line-clamp: 2;
          -moz-box-orient: vertical;
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
          overflow: hidden;
        }
        .info-num {
          margin-top: 10px;
          display: flex;
          span {
            width: 100px;
            font-size: 18px;
          }
        }
        .info-btns {
          margin-top: 10px;
          display: flex;
          .main {
            width: 80px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding: 0 20px;
            margin-right: 20px;
            background-color: #f77870;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              background-color: #ff6347;
            }
          }
          .see-all {
            width: 140px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #f77870;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
              background-color: #ff6347;
            }
          }
        }
      }
    }
    
  }
}
</style>
