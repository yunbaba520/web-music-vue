<template>
  <div class="play-page" style="">
    <div>xx</div>
    <div class="play-bar" v-if="currentSong.al">
      <div class="bar">
        <div class="control">
          <span class="prev"></span>
          <span :class="['play',isPlaying?'play-true':'play-false']" @click="handlerPlayBtnClick"></span>
          <span class="next"></span>
        </div>
        <div class="play-info">
          <img
            class="cover"
            :src="currentSong.al.picUrl"
            alt=""
          />
          <div class="info">
            <div class="title">{{currentSong.name}}-
              <template v-for="ar in currentSong.ar" :key="ar.id">
                <span>{{ar.name}}&nbsp;&nbsp;&nbsp;</span>
              </template>
            </div>
            <div class="progress-wrap">
              <div class="progress"><el-slider v-model="progress" @input="handlerSlideChange" @change="handlerSlideEnd"/></div>
              <div class="time">{{formatTimeLength(progressTime)}}/{{formatTimeLength(currentSong.dt)}}</div>
            </div>
          </div>
        </div>
        <div class="operator">
          <span class="loop"></span>
          <span class="like"></span>
        </div>
      </div>
    </div>
    <audio ref="audioRef" @timeupdate="handleTimeUpdate"/>
  </div>
</template>

<script>
import {formatTimeLength,getSongPlay} from '../../utils/format'
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      progress:0,
      progressTime:0,
      currentTime:0,//单位秒
      isChangingSlider:false,
      isPlaying:false,
    }
  },
  created(){
    this.getSongDetail(1940771892)
  },
  mounted(){
    
  },
  watch:{
    currentSong(newVal,oldVal){
      this.$refs.audioRef.src = this.getSongPlay(newVal.id)
    }
  },
  computed:{
    ...mapState(["currentSong"])
  },
  methods:{
    handlerPlayBtnClick() {
      this.isPlaying?this.$refs.audioRef.pause():this.$refs.audioRef.play()
      this.isPlaying = !this.isPlaying
    },
    handleTimeUpdate(e) {
      if (!this.isChangingSlider) {
        this.currentTime =  e.target.currentTime,
        this.progress = this.currentTime*1000/this.currentSong.dt*100
        this.progressTime = this.currentTime*1000
      }
      
    },
    handlerSlideChange(val){
      this.isChangingSlider = true
      this.progressTime = val/100*this.currentSong.dt
    },
    handlerSlideEnd(val) {
      this.$refs.audioRef.currentTime = val/100*this.currentSong.dt/1000
      this.isChangingSlider = false
      //拖动抬起后播放
      if (!this.isPlaying) {
        this.handlerPlayBtnClick()
      }
    },
    ...mapActions(["getSongDetail"]),
    formatTimeLength,
    getSongPlay
  }
};
</script>

<style lang="less" scoped>
.play-page {
  width: 1300px;
  margin: 0 auto;
  .play-bar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    background-color: #888;
    .bar {
      width: 1200px;
      height: 50px;
      margin: 0 auto;
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
          background: url("../../assets/img/player_play.png") no-repeat;
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
          background: url("../../assets/img/player_play.png") no-repeat;
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
        .cover {
          width: 45px;
          height: 45px;
          margin-right: 15px;
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
        width: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .loop{
          width: 26px;
          height: 25px;
          background: url("../../assets/img/player_play.png");
          background-size: 132px 1000px;
          background-position: 0 -205px;
        }
        .like {
          width: 23px;
          height: 21px;
          background: url("../../assets/img/player_play.png");
          background-size: 132px 1000px;
          background-position: 0 -96px;
        }
      }
    }
  }
}
</style>
