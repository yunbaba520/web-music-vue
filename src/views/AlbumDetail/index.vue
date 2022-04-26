<template>
  <div class="album-detail">
    <div class="info">
      <img class="cover" :src="albumInfo.picUrl" alt="">
      <div class="detail">
        <div class="title"><span class="title-icon">专辑0.0</span>{{albumInfo.name}}</div>
        <div class="artists">
          <span>歌手:</span>
          <template v-for="item in albumInfo.artists" :key="item.id">
            <span class="artists-item">{{item.name}}</span>
          </template>
        </div>
        <div class="publish">发行时间:{{formatTime(albumInfo.publishTime)}}</div>
        <div class="company">发行公司:{{albumInfo.company}}</div>
        <div class="btns">
          <span class="play">播放</span>
          <span class="add">加入列表</span>
          <span class="collect">收藏</span>

        </div>
      </div>
    </div>
    <h4>专辑介绍:</h4>
    <div class="description">{{albumInfo.description}}</div>
    <h4>包含歌曲列表:</h4>
    <div class="list-table">
      <div class="list-title">
        <span class="title-1">歌曲</span>
        <span class="title-2">歌手</span>
        <span class="title-3">专辑</span>
        <span class="title-4">时长</span>
      </div>
      <template v-for="(item, index) in songsData" :key="item.id">
        <div class="item">
          <span class="index">{{ index + 1 }}</span>
          <span class="song-name">{{ item.name }}</span>
          <div class="btns">
            <span class="btn-play"></span>
            <span class="btn-addlist"></span>
          </div>
          <span class="ar-name">
            <template v-for="ar in item.ar" :key="ar.id">{{ar.name}}&nbsp;&nbsp;&nbsp;</template>
          </span>
          <span class="al-name">{{ item.al.name }}</span>
          <span class="time">{{ item.dt }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { requestAlbumDetail } from "../../server/page_request/album_request";
import {formatTime} from '../../utils/format'
export default {
  data() {
    return{
      songsData:[],
      albumInfo:{}
    }
  },
  created() {
    requestAlbumDetail(this.$route.query.id).then((res) => {
      console.log(res, "rr");
      this.albumInfo = res.album
      this.songsData = res.songs
    });
  },
  methods:{
    formatTime
  }
};
</script>

<style lang="less" scoped>
.album-detail {
  width: 1200px;
  margin: 0 auto;
  .info {
    margin-top: 40px;
    display: flex;
    align-items: center;
    .cover {
      width: 250px;
      height: 250px;
    }
    .detail {
      margin-left: 40px;
      .title {
        font-size: 24px;
        height: 30px;
        line-height: 30px;
        margin-bottom: 15px;
        .title-icon {
          display: inline-block;
          width: 60px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          font-size: 16px;
          background-color: #ff6347;
          border-radius: 15px;
          margin-right: 6px;
        }
      }
      .artists {
        color: #666;
        margin-bottom: 6px;
        .artists-item {
          color: #f77870;
          margin:0 3px;
        }
      }
      .publish,.company {
        color: #666;
        margin-bottom: 10px;
      }
      .btns {
        display: flex;
        span {
          padding: 3px 15px;
          margin: 0 3px;
          background-color: #f77870;
          color: #fff;
          cursor: pointer;
          &:hover {
            background-color: #ff6347;
          }
        }
        .play {
          margin-left: 0;
        }
      }
    }
  }
  .description {
    color: #666;
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
            background: url("../../assets/img/icon_play.png") no-repeat;
            background-size: 200px 320px;
            background-position: 0 0;
            cursor: pointer;
          }
          .btn-addlist {
            width: 36px;
            height: 36px;
            background: url("../../assets/img/icon_play.png") no-repeat;
            background-size: 200px 320px;
            background-position: 0 -80px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
