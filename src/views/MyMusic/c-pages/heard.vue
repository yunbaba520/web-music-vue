<template>
  <div class="created-wrap">
    <h2>最近常听</h2>
    <div class="list">
      <div class="list-table">
        <div class="list-title">
          <span class="title-1">歌曲</span>
          <span class="title-2">歌手</span>
          <span class="title-3">专辑</span>
          <span class="title-4">时长</span>
        </div>
        <template
          v-for="(item, index) in userRecord.slice(0, 10)"
          :key="item.song.id"
        >
          <div class="item">
            <span class="index">{{ index + 1 }}</span>
            <span class="song-name">{{ item.song.name }}</span>
            <div class="btns">
              <span @click="handlerSongPlay(item.song.id)" class="btn-play"></span>
              <span @click="handlerSongPushList(item.song.id)" class="btn-addlist"></span>
            </div>
            <span class="ar-name">{{ item.song.ar[0].name }}</span>
            <span class="al-name">{{ item.song.al.name }}</span>
            <span class="time">{{formatTimeLength(item.song.dt)  }}</span>
            <div class="progress"><el-progress :text-inside="true" :stroke-width="26" :percentage="item.score"  color="#f77870"/></div>
          </div>
        </template>
        <div class="down">
          <div class="more">查看更多内容 请下载客户端</div>
          <div class="now-down">立即下载</div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import {formatTimeLength} from '../../../utils/format'
import {mapActions,mapMutations,mapState} from 'vuex'

export default {
  
  computed: {
    ...mapState(["userRecord","playList","currentSong","currentSongIndex"]),
  },

  components: {
    
  },
  methods: {
    ...mapActions(["getSongDetail","getSongDetailPush"]),
    ...mapMutations(["changePlayList","changeCurrentSong","changeCurrentSongIndex"]),
    formatTimeLength,
    handlerSongPlay(id) {
      this.getSongDetail(id)
    },
    handlerSongPushList(id) {
      this.getSongDetailPush(id)
    },
  },
};
</script>

<style lang="less" scoped>
.created-wrap {
  width: 1360px;
  margin: 0 auto;
  .list {
    .list-table {
      width: 1360px;
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
          width: 220px;
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
          width: 220px;
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
        .progress {
          width: 300px;
        }
        &:nth-child(2n) {
          background-color: #f8f8f8;
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
      .down {
        text-align: center;
        margin: 40px 0;
        .more {
          height: 27px;
          line-height: 27px;
          font-size: 18px;
        }
        .now-down {
          margin: 10px 580px;
          height: 40px;
          line-height: 40px;
          background-color: #f77870;
          color: #fff;
          border-radius: 20px;
        }
      }
    }
    
  }
}
</style>
