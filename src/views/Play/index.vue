<template>
  <div class="play-page" >
    <div class="paly-page-bg" :style="{ background: `url(${bgUrl}) center center/6000px ` }"></div>
    <div class="gohome" @click="JumpHome">218音乐网</div>
    <div class="delete-list" v-if="playList.length!==0" @click="handlerDeletePlayList">清空播放列表</div>
    <div class="content">
      <div class="left">
        <div class="list-table">
        <div class="list-title">
          <span class="title-1">歌曲</span>
          <span class="title-2">歌手</span>
          <span class="title-3">专辑</span>
          <span class="title-4">时长</span>
        </div>
        <el-scrollbar height="450px">
          <template v-for="(item, index) in playList" :key="item.id">
          <div :class="['item',currentSongIndex==index?'activeItem':'']">
            <span class="index">{{ index + 1 }}</span>
            <span class="song-name">{{ item.name }}</span>
            <div class="btns">
              <span class="btn-play" @click="handlerPlayClick(index)"></span>
              <span class="btn-addlist" @click="handlerDeleteClick(index)"></span>
            </div>
            <span class="ar-name">
              <template v-for="ar in item.ar" :key="ar.id"
                >{{ ar.name }}&nbsp;&nbsp;&nbsp;</template
              >
            </span>
            <span class="al-name">{{ item.al.name }}</span>
            <span class="time">{{formatTimeLength(item.dt)  }}</span>
          </div>
        </template>
        </el-scrollbar>
        
      </div>
      </div>
      <div class="right">
        <img class="cover" :src="bgUrl" alt="">
         
          <div class="list-lyric">
            <el-scrollbar height="350px">
              <template v-for="lyric in lyricData" :key="lyric.time">
                <div class="lyric">{{lyric.text}}</div>
              </template>
            </el-scrollbar>
          </div>
        
        
      </div>
    </div>
  </div>
</template>

<script>
import {requestSongLyric} from '../../server/page_request/song_request'
import {parseLyric} from '../../utils/parseLyric'
import {formatTimeLength} from '../../utils/format'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      bgUrl:'',
      lyricData:[]
    }
  },
  computed:{
    ...mapState(["playList","currentSong","currentSongIndex"])
  },
  mounted(){
    if (this.currentSong.al) {
      this.bgUrl = this.currentSong.al.picUrl
      requestSongLyric(this.currentSong.id).then(res=>{
        const parseLyricData = parseLyric(res.lrc.lyric)
        this.lyricData =parseLyricData
      })
    }
  },
  watch:{
    currentSong(newVal,oldVal){
      this.bgUrl= newVal.al.picUrl
      requestSongLyric(this.currentSong.id).then(res=>{
        const parseLyricData = parseLyric(res.lrc.lyric)
        this.lyricData =parseLyricData
      })
    }
  },
  methods:{
    handlerDeleteClick(index){
      const nowPlayList = [...this.playList]
      nowPlayList.splice(index,1)
      this.changePlayList(nowPlayList)
    },
    handlerPlayClick(index){
      this.changeCurrentSong(this.playList[index])
      this.changeCurrentSongIndex(index)
    },
    handlerDeletePlayList() {
      this.changePlayList([])
    },
    JumpHome() {
      this.$router.push({
        path: "/layout/home",
      });
    },
    ...mapMutations(["changePlayList","changeCurrentSong","changeCurrentSongIndex"]),
    formatTimeLength
  }
};
</script>

<style lang="less" scoped>
.play-page {
  width: 100%;
  height: 720px;
  position: relative;
  // background-color: #888;    
  .paly-page-bg {
    background-color: #888;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(95px);
    opacity: 0.7;
    z-index: -1;
  }
  .gohome {
    position: absolute;
    left: 0;
    top: 0;
    color: #333;
    width: 140px;
    font-size: 28px;
    font-weight: 700;
    cursor: pointer;
    &:hover {
      color: #000;
    }
  }
  .delete-list {
    position: absolute;
    left: 880px;
    top: 50px;
    color: #666;
    width: 100px;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    border: 1px solid #444;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
  .content {
    padding-top: 80px;
    width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 900px;
      .list-table {
      width: 900px;
      .list-title {
        height: 50px;
        color: #333;
        display: flex;
        align-items: center;
        padding: 0 17px;
        .title-1 {
          margin-left: 36px;
          width: 350px;
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
          color: #333;
        }
        .song-name {
          width: 350px;
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
            cursor: pointer;
          }
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
            cursor: pointer;
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
          &:hover {
            color: #f77870;
            cursor: pointer;
          }
        }
        .time {
          color: #333;
          width: 80px;
        }
        &:hover {
          .song-name {
            width: 260px;
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
              &:hover {
              background-position: -120px 0;

              }
            }
            .btn-addlist {
              width: 36px;
              height: 36px;
              background: url("../../assets/img/icon_play.png") no-repeat;
              background-size: 200px 320px;
              background-position: 0 -160px;
              cursor: pointer;
              &:hover {
              background-position: -120px -160px;

              }
            }
          }
        }
      }
    }
    .activeItem {
      .song-name,.ar-name,.al-name,.time {
        color: #f77870;
      }
      &:hover {
          
        .btns {
          .btn-play {
            background-position: 0 -200px !important;
            &:hover {
            background-position: -120 -200px !important;

            }
          }
        }
      }
    }
    }
    .right {
      width: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .cover {
        width: 180px;
        height: 180px;
      }
      .list-lyric {
        margin-top: 20px;
        .lyric {
          text-align: center;
          height: 25px;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
