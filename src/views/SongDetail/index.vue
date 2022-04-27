<template>
  <div class="song-detail">
    <div class="top" v-if="songInfo.al">
      <img class="img" :src="songInfo.al.picUrl" alt="" />
      <div class="info">
        <div class="title">
          <span class="title-icon">单曲0.0</span>{{ songInfo.name }}
        </div>
        <div class="artist">
          <span>歌手:</span>
          <template v-for="item in songInfo.ar" :key="item.id">
            <span class="artist-name">&nbsp;&nbsp;{{ item.name }}&nbsp;&nbsp;</span>
          </template>
        </div>
        <div class="al">所属专辑:{{songInfo.al.name}}</div>
        <div class="btns">
          <span class="play" @click="handlerPlay">播放</span>
          <span class="add" @click="handlerAddList">加入列表</span>
          <span class="collect">收藏</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="lyric">
        <h3>歌词</h3>
        <div class="text">
          <template v-for="item in lyricData" :key="item.time">
            <div class="text-item">{{item.text}}</div>
          </template>
        </div>
      </div>
      <div class="recommend">
        <div class="simi">相关推荐</div>
        <template v-for="item in simiSongs" :key="item.id">
          <SongRecommend :id="item.id" 
                          :img="item.album.picUrl" 
                          :name="item.artists[0].name" 
                          :title="item.name"
                          @clickAuthorEmit="JumpAuthor(item.artists[0].id)"
                          @clickSongEmit="JumpSong(item.id)"/>
        </template>
      </div>
    </div>

  </div>
</template>

<script>
import SongRecommend from '../../components/song-recommend.vue'
import { requestSongDetail,requestSongLyric,requestSongSimi } from "../../server/page_request/song_request.js";
import {parseLyric} from '../../utils/parseLyric'
import {mapActions,mapMutations,mapState} from 'vuex'

export default {
  data() {
    return {
      id: 0,
      songInfo: {},
      lyricData:[],
      simiSongs:[]
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getPageData()
  },
  watch:{
    $route(newVal){
      this.id = newVal.query.id;
      this.getPageData()
    }
  },
  computed:{
    ...mapState(["playList","currentSong","currentSongIndex"])
  }, 
  components:{
    SongRecommend
  },
  methods:{
    getPageData() {
      requestSongDetail(this.id).then((res) => {
      this.songInfo = res.songs[0];
      });
      requestSongLyric(this.id).then(res=>{
        const parseLyricData = parseLyric(res.lrc.lyric)
        this.lyricData =parseLyricData
      })
      requestSongSimi(this.id).then(res=>{
        this.simiSongs = res.songs
        console.log(res);
      })
    },
    handlerPlay() {
      this.getSongDetail(this.id)
    },
    handlerAddList() {
      this.getSongDetailPush(this.id)
    },
    JumpAuthor(id) {
      this.$router.push({
        path:'/layout/singer/singerDetail',
        query:{
          id
        }
      })
    },
    JumpSong(id) {
      this.$router.push({
        path:'/layout/songDetail',
        query:{
          id
        }
      })
    },
    ...mapActions(["getSongDetail","getSongDetailPush"]),
    ...mapMutations(["changePlayList","changeCurrentSong","changeCurrentSongIndex"])
  }
};
</script>

<style lang="less" scoped>
.song-detail {
  width: 1200px;
  margin: 0 auto;
  .top {
    display: flex;
    align-items: center;
    margin-top: 40px;
    .img {
      width: 250px;
      height: 250px;
      margin-right: 40px;
    }
    .info {
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
      .artist {
        .artist-name {
          color: #f77870;
        }
      }
      .al {
        margin: 10px 0;
      }
      .btns {
        display: flex;
        span {
          height: 30px;
          line-height: 30px;
          margin: 0 10px;
          background-color: #f77870;
          text-align: center;
          border-radius: 5px;
          cursor: pointer;
          &:hover {
            background-color: #ff6347;
          }
        }
        .play {
          width: 70px;
          margin-left: 0;
        }
        .add {
          width: 90px;
        }
        .collect {
          width: 70px;
        }
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    .lyric {
      width: 850px;
      border-right: 1px solid #999;
      .text {
        .text-item {
          text-align: center;
          height: 30px;
          line-height: 30px;
          color: #333;
        }
      }
    }
    .recommend {
      width: 300px;
      
      .simi {
        font-size:20px ;
        border-bottom: 1px solid #999;
        padding-bottom: 5px;
      }
    }
  }
}
</style>
