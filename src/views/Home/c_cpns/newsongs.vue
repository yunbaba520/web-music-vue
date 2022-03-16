<template>
  <div class="newsongs-wrap">
    <div class="newsongs">
      <div class="header"><div class="header-bg"></div></div>
      <div class="song-list">
        <template v-for="item in newSongsList" :key="item.id">
          <div class="song-item">
            <div class="item-img">
                <div class="item-img-cover"></div>
                <img class="item-img-img" :src="item.al.picUrl" alt="" />
            </div>
            <div class="item-info">
              <div class="title">{{ item.name }}</div>
              <div class="name">{{ item.ar[0].name }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestRankingData } from "../../../server/page_request/home_request";
export default {
  created() {
    requestRankingData(3779629).then((res) => {
      this.newSongsList = res.playlist.tracks.slice(0, 6);
    });
  },
  data() {
    return {
      newSongsList: [],
    };
  },
};
</script>

<style lang="less" scoped>
.newsongs-wrap {
  background-image: linear-gradient(#faebd7, #ffffff);
  .newsongs {
    width: 1200px;
    margin: 0 auto;
    .header {
      width: 1200px;
      height: 40px;
      padding: 50px 0 24px 0;
      .header-bg {
        width: 196px;
        height: 40px;
        margin: 0 auto;
        background: url("../../../assets/img/header-title.png") no-repeat;
        background-position: 0 -50px;
        background-size: 196px;
      }
    }
    .song-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .song-item {
        display: flex;
        align-items: center;
        width: 386px;
        height: 120px;
        margin: 10px 0;
        background-color: #fffafa;
        cursor: pointer;
        &:hover {
          .item-info {
            .title {
              color: #f77870;
            }
          }
        }
        .item-img {
          position: relative;
          width: 150px;
          height: 120px;
          &:hover {
              .item-img-cover {
                  transform: translateX(8px);
                  
              }
          }
          .item-img-img {
              position: absolute;
              top: 0;
              left: 0;
              width: 120px;
              height: 120px;
              z-index: 999;
          }
          .item-img-cover {
              position: absolute;
              top: 5px;
              left: 25px;
              width: 110px;
              height: 110px;
              background: url("../../../assets/img/cover-play2.png");
              background-size: 100% 100%;
              transition: transform 0.5s;
          }
        }
        .item-info {
          width: 250px;
          padding: 0 36px;
          .title {
            font-size: 16px;
            color: #303133;
          }
          .name {
            margin-top: 7px;
            font-size: 14px;
            color: #909399;
          }
        }
      }
    }
  }
}
</style>
