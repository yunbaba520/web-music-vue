<template>
  <div class="all-list">
    <h3>全部歌曲:{{ allNum }}首</h3>
    <div class="play-hot">
      <span class="icon"></span>
      <span @click="handlerAllPlayClick">播放全部歌曲</span>
    </div>
    <div class="list-table">
      <div class="list-title">
        <span class="title-1">歌曲</span>
        <span class="title-2">歌手</span>
        <span class="title-3">专辑</span>
        <span class="title-4">时长</span>
      </div>
      <template v-for="(item, index) in allData" :key="item.id">
        <div class="item">
          <span class="index">{{ index + 1 }}</span>
          <span class="song-name">{{ item.name }}</span>
          <div class="btns">
            <span  @click="handlerOnePlay(item.id)" class="btn-play"></span>
            <span @click="handlerOnePush(item.id)" class="btn-addlist"></span>
          </div>
          <span class="ar-name">{{ item.ar[0].name }}</span>
          <span class="al-name">{{ item.al.name }}</span>
          <span class="time">{{ item.dt }}</span>
        </div>
      </template>
    </div>
    <div class="more">下载客户端查看更多</div>
  </div>
</template>

<script>
import { requestSingerAllSongs } from "../../../server/page_request/singer_request";
import {mapActions,mapMutations,mapState} from 'vuex'

export default {
  data() {
    return {
      allData: [],
      allNum: 0,
    };
  },
  created() {
    requestSingerAllSongs(this.$route.query.id).then((res) => {
      this.allData = res.songs;
      this.allNum = res.total;
    });
  },
   computed:{
    ...mapState(["playList","currentSong","currentSongIndex"])
  },
  methods:{
    ...mapActions(["getSongDetail","getSongDetailPush"]),
    ...mapMutations(["changePlayList","changeCurrentSong","changeCurrentSongIndex"]),
    handlerAllPlayClick() {
      this.changePlayList([...this.allData])
      this.changeCurrentSong(this.allData[0])
      this.changeCurrentSongIndex(0)
    },
     handlerOnePlay(id) {
      this.getSongDetail(id)
    },
    handlerOnePush(id) {
      this.getSongDetailPush(id)
    },
  }
};
</script>

<style lang="less" scoped>
.all-list {
  .play-hot {
    display: flex;
    align-items: center;
    width: 120px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-right: 20px;
    background-color: #f77870;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #ff6347;
    }
    .icon {
      width: 13px;
      height: 16px;
      margin-right: 5px;
      background: url("../../../assets/img/icon_sprite.png");
      background-size: 200px 336px;
      background-color: transparent;
      background-position: -80px -220px;
    }
  }
  .list-table {
    width: 1200px;
    .list-title {
      height: 50px;
      color: #999;
      display: flex;
      align-items: center;
      padding: 0 17px;
      .title-1 {
        margin-left: 36px;
        width: 470px;
        padding: 0 15px;
      }
      .title-2 {
        width: 120px;
        padding: 0 15px;
      }
      .title-3 {
        width: 170px;
        padding: 0 15px;
      }
      .title {
        width: 80px;
      }
    }
    .item {
      display: flex;
      height: 50px;
      color: #333;
      font-size: 14px;
      align-items: center;
      padding: 0 17px;
      .index {
        width: 36px;
        color: #999;
      }
      .song-name {
        width: 470px;
        padding: 0 15px;
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
      }
      .ar-name {
        width: 120px;
        padding: 0 15px;
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
      .al-name {
        width: 170px;
        padding: 0 15px;
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
      }
      .time {
        color: #999;
        width: 80px;
      }
      &:nth-child(2n) {
        background-color: #fff;
      }
      &:hover {
        .song-name {
          width: 380px;
        }
        .btns {
          width: 90px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .btn-play {
            width: 36px;
            height: 36px;
            background: url("../../../assets/img/icon_play.png") no-repeat;
            background-size: 200px 320px;
            background-position: 0 0;
            cursor: pointer;
          }
          .btn-addlist {
            width: 36px;
            height: 36px;
            background: url("../../../assets/img/icon_play.png") no-repeat;
            background-size: 200px 320px;
            background-position: 0 -80px;
            cursor: pointer;
          }
        }
      }
    }
  }
  .more {
    width: 300px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0 auto;
    font-size: 24px;
  }
}
</style>
