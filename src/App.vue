<template>
  <div>
    <router-view />
    <div class="play-bar" v-if="currentSong.al">
      <div class="bar">
        <div class="control">
          <span class="prev" @click="handlerPrevNext(-1)"></span>
          <span
            :class="['play', isPlaying ? 'play-true' : 'play-false']"
            @click="handlerPlayBtnClick"
          ></span>
          <span class="next" @click="handlerPrevNext(1)"></span>
        </div>
        <div class="play-info">
          <img @click="JumpPlayPage" 
                :class="['cover',isPlaying?'cover-running':'cover-paused']" 
                :src="currentSong.al.picUrl" 
                alt="" />
          <div class="info">
            <div class="title">
              {{ currentSong.name }}-
              <template v-for="ar in currentSong.ar" :key="ar.id">
                <span>{{ ar.name }}&nbsp;&nbsp;&nbsp;</span>
              </template>
            </div>
            <div class="progress-wrap">
              <div class="progress">
                <el-slider
                  v-model="progress"
                  size="small"
                  :show-tooltip="false"
                  @input="handlerSlideChange"
                  @change="handlerSlideEnd"
                />
              </div>
              <div class="time">
                {{ formatTimeLength(progressTime) }}/{{
                  formatTimeLength(currentSong.dt)
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="operator">
          <span :class="['loop',playModel===0?'loopSX':'',playModel===1?'loopDQ':'',playModel===2?'loopSJ':'',]" @click="handlerLoopClick"></span>
          <span class="like"></span>
          <span class="list" @click="JumpPlayPage"><span class="num">{{playList.length}}</span></span>
        </div>
        <div class="lyric">
          {{nowLyric}}
        </div>
      </div>
    </div>
    <audio ref="audioRef" @timeupdate="handleTimeUpdate" @ended="handlerEnded" />
  </div>
</template>
<script>
import {requestSongLyric} from './server/page_request/song_request'
import { formatTimeLength, getSongPlay } from "./utils/format";
import {parseLyric} from './utils/parseLyric'
import { mapState, mapActions,mapMutations } from "vuex";
export default {
  data() {
    return {
      progress: 0,
      progressTime: 0,
      currentTime: 0, //单位秒
      isChangingSlider: false,
      isPlaying: false,
      lyricList:[],
      nowLyric:"",
      nowLyricIndex:0,
    };
  },

  watch: {
    currentSong(newVal, oldVal) {
      this.$refs.audioRef.src = this.getSongPlay(newVal.id);
      this.$refs.audioRef.play().then(res=>{
        this.isPlaying = true
      }).catch(err=>{
        this.isPlaying = false
      })
      requestSongLyric(newVal.id).then(res=>{
        this.lyricList = parseLyric(res.lrc.lyric)
        console.log(this.lyricList);
      })
    },
  },
  computed: {
    ...mapState(["currentSong","playList","playModel"]),
  },
  methods: {
    handlerPlayBtnClick() {
      this.isPlaying ? this.$refs.audioRef.pause() : this.$refs.audioRef.play();
      this.isPlaying = !this.isPlaying;
    },
    handleTimeUpdate(e) {
      if (!this.isChangingSlider) {
        this.currentTime = e.target.currentTime
        this.progress =((this.currentTime * 1000) / this.currentSong.dt) * 100
        this.progressTime = this.currentTime * 1000;
      }
      let index = 0
      for (; index < this.lyricList.length; index++) {
        if (e.target.currentTime*1000<this.lyricList[index].time) {
          break
        }
      }
      let timeIndex = index-1
      if(timeIndex!==this.nowLyricIndex) {
        if (timeIndex===-1) {
          this.nowLyricIndex = timeIndex
          this.nowLyric = ""
        }else {
          this.nowLyricIndex = timeIndex
          this.nowLyric = this.lyricList[timeIndex].text
        }
      }
    },
    handlerSlideChange(val) {
      this.isChangingSlider = true;
      this.progressTime = (val / 100) * this.currentSong.dt;
    },
    handlerSlideEnd(val) {
      this.$refs.audioRef.currentTime =((val / 100) * this.currentSong.dt) / 1000;
      this.isChangingSlider = false;
      //拖动抬起后播放
      if (!this.isPlaying) {
        this.handlerPlayBtnClick();
      }
    },
    //改变播放模式
    handlerLoopClick() {
      let newPlayModel = this.playModel
      newPlayModel=newPlayModel+1
      if (newPlayModel>2) {
        newPlayModel = 0
      }
      this.changePlayModel(newPlayModel)
    },
    //上，下一首
    handlerPrevNext(tag) {
      //判断列表是否只有一首歌曲
      if (this.playList.length === 1) {
        this.$refs.audioRef.currentTime= 0
        this.$refs.audioRef.play()
        return
      }
      this.cahngeCurrentSongByPrevNext(tag)
    },
    handlerEnded() {
      //未知，这里可能组件内部改为true了
      this.isChangingSlider = false
      if (this.playModel==1) {
        //单曲
        this.$refs.audioRef.currentTime= 0
        this.$refs.audioRef.play()
      }else {
        this.handlerPrevNext(1)
      }
    },
    JumpPlayPage() {
      this.$router.push({
        path:'/play'
      })
    },
    ...mapActions(["getSongDetail"]),
    ...mapMutations(["changePlayModel","cahngeCurrentSongByPrevNext"]),
    formatTimeLength,
    getSongPlay,
  },
};
</script>
<style lang="less">
.play-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #ddd;
  border-top: 1px solid #999;
  box-shadow: 0 -3px 3px rgba(0, 0, 0, .3);
  .bar {
    width: 1400px;
    height: 50px;
    margin-left: 100px;
    display: flex;
    .control {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .prev,
      .next {
        width: 19px;
        height: 20px;
        background: url("./assets/img/player_play.png") no-repeat;
        background-size: 132px 1000px;
        cursor: pointer;
      }
      .prev {
        background-position: 0 -30px;
      }
      .next {
        background-position: 0 -52px;
      }
      .play {
        width: 21px;
        height: 29px;
        background: url("./assets/img/player_play.png") no-repeat;
        background-size: 132px 1000px;
        cursor: pointer;
      }
      .play-true {
        background-position: -30px 0;
      }
      .play-false {
        background-position: 0 0;
      }
    }
    .play-info {
      margin-left: 50px;
      display: flex;
      align-items: center;
      @keyframes albumA{
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .cover {
        width: 48px;
        height: 48px;
        margin-right: 15px;
        cursor: pointer;
        border-radius: 50%;
        position: relative;
        top: -10px;
      animation: albumA 16s linear infinite;

      }
      .cover-running {
        animation-play-state: running;
      }
      .cover-paused {
        animation-play-state: paused;
      }
      .info {
        .title {
          color: #444;
        }
        .progress-wrap {
          display: flex;
          align-items: center;

          .progress {
            width: 600px;
          }
          .time {
            font-size: 14px;
            color: #444;
          }
        }
      }
    }
    .operator {
      margin-left: 30px;
      width: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .loop {
        cursor: pointer;
        background: url("./assets/img/player_play.png");
        background-size: 132px 1000px;    
      }
      .loopSX {
        width: 26px;
        height: 25px;
        background-position: 0 -205px;
      }
      .loopDQ {
        width: 26px;
        height: 25px;
        background-position: 0 -232px;
      }
      .loopSJ {
        width: 26px;
        height: 20px;
        background-position: 0 -74px;
      }
      .like {
        
        cursor: pointer;
        width: 23px;
        height: 21px;
        background: url("./assets/img/player_play.png");
        background-size: 132px 1000px;
        background-position: 0 -96px;
      }
      .list {
        cursor: pointer;
        width: 23px;
        height: 21px;
        background: url("./assets/img/player_play.png");
        background-size: 132px 1000px;
        background-position: 0 -260px;
        position: relative;
        .num {
          position: absolute;
          top: -8px;
          right: -6px;
          font-size: 12px;
          color: #ff6347;
        }
      }
    }
    .lyric {
      margin-left: 20px;
      width: 280px;
      color:		#EE3B3B;
      text-align: center;
      line-height: 50px;
    }
  }
}
</style>
