<template>
  <div class="newalbum-wrap" v-if="albumList.length>0">
    <div class="newalbum">
      <div class="header">
        <div class="header-bg"></div>
        <span class="header-more">更多</span>
      </div>
      <div class="album-list">
        <template v-for="item in albumList" :key="item.id">
          <div class="card">
            <CardCover :coverImgUrl="item.picUrl" />
            <div class="card-title">{{ item.name }}</div>
            <div class="card-name">{{ item.artist.name }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestNewAlbumData } from "../../../server/page_request/home_request";
import CardCover from "../../../components/songsheet-cover.vue";
export default {
  created() {
    requestNewAlbumData().then((res) => {
      this.albumList = res.albums.slice(0, 10);
    });
  },
  data() {
    return {
      albumList: [],
    };
  },
  components: {
    CardCover,
  },
};
</script>

<style lang="less" scoped>
.newalbum-wrap {
  background-image: linear-gradient(#fef9f3, #ffffff);
  .newalbum {
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
        background: url("../../../assets/img/header-title.png") no-repeat 0 -150px;
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
    .album-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .card {
        width: 224px;
        height: 300px;

        .card-title {
          margin: 15px 0 5px 0;
          font-size: 14px;
          cursor: pointer;
          /* 显示一行 */
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          display: -moz-box;
          -moz-line-clamp: 1;
          -moz-box-orient: vertical;
          word-wrap: break-word;
          word-break: break-all;
          white-space: normal;
          overflow: hidden;
          &:hover {
            color: #f77870;
          }
        }
        .card-name {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
