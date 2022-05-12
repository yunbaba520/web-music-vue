<template>
  <div class="search-page">
    <div class="top">
      <div class="input-div">
        <el-input v-model="inputValue" placeholder="搜索音乐" @change="handlerInputChange">
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
        <div class="hot-search">
          热门搜索:
          <template v-for="item in hotData.slice(0,5)" :key="item.first">
            <span @click="handlerHotSearchClick(item.first)" class="hot-item">{{item.first}}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="单曲" name="first">
          <div class="list-table">
            <div class="list-title">
              <span class="title-1">歌曲</span>
              <span class="title-2">歌手</span>
              <span class="title-3">专辑</span>
              <span class="title-4">时长</span>
            </div>
            <template v-for="(item, index) in searchDataSong" :key="item.id">
              <div class="item">
                <span class="index">{{ index + 1 }}</span>
                <span class="song-name" @click="JumpSongDetail(item.id)">{{ item.name }}</span>
                <div class="btns">
                  <span @click="handlerSongPlay(item.id)" class="btn-play"></span>
                  <span @click="handlerSongPushList(item.id)" class="btn-addlist"></span>
                </div>
                <span class="ar-name">
                  <template v-for="ar in item.ar" :key="ar.id"
                    >{{ ar.name }}&nbsp;&nbsp;&nbsp;</template
                  >
                </span>
                <span class="al-name">{{ item.al.name }}</span>
                <span class="time">{{formatTimeLength( item.dt) }}</span>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="second">
          <div class="album-wrap">
            <template v-for="item in searchDataAlbum" :key="item.id">
              <div class="card">
                <CardCover :coverImgUrl="item.picUrl" @click="JumpAlbumDetail(item.id)"/>
                <div class="card-title" @click="JumpAlbumDetail(item.id)">{{ item.name }}</div>
                <div class="card-name">{{ item.artist.name }}</div>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="third">
          <div class="singer-wrap">
            <template v-for="item in searchDataSinger" :key="item.id">
              <singer-item :img="item.picUrl" :name="item.name" @imgClick="JumpSingerDetail(item.id)" @nameClick="JumpSingerDetail(item.id)"></singer-item>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="fourth">
          <div class="songsheet-wrap">
            <template v-for="item in searchDataSongSheet" :key="item.id">
              <div class="card">
                <CardCover @click="JumpSongSheetDetail(item.id)" :coverImgUrl="item.coverImgUrl" />
                <div @click="JumpSongSheetDetail(item.id)" class="card-title">{{ item.name }}</div>
                <div class="card-name">{{ item.creator.nickname }}</div>
              </div>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
      
    </div>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
import CardCover  from '../../components/songsheet-cover.vue'
import SingerItem from '../../components/singer-item.vue'
import {requestHotSearch,requestSearch} from '../../server/page_request/search_request'
import {formatTimeLength} from '../../utils/format'
import {mapActions,mapMutations,mapState} from 'vuex'

  export default {
    data() {
      return{
        activeName:"first",
        inputValue:'',
        hotData:[],
        searchDataSong:[],
        searchDataAlbum:[],
        searchDataSinger:[],
        searchDataSongSheet:[],
      }
    },
    created(){
      requestHotSearch().then(res=>{
        this.hotData = res.result.hots
      })
      //传过来关键字存在且不为空
      if (this.$route.query.keyword && this.$route.query.keyword !== '') {
        this.getDataByKeyword(this.$route.query.keyword)
      }
    },
    watch:{
      $route(newVal) {
        this.getDataByKeyword(newVal.query.keyword)
      }
    },
     computed:{
      ...mapState(["playList","currentSong","currentSongIndex"])
    }, 
    components:{
      Search,
      CardCover,
      SingerItem
    },
    methods:{
      ...mapActions(["getSongDetail","getSongDetailPush"]),
      ...mapMutations(["changePlayList","changeCurrentSong","changeCurrentSongIndex"]),
      formatTimeLength,
      getDataByKeyword(keyword) {
        requestSearch(keyword,1).then(res=>{
          this.searchDataSong =  res.result.songs
        })
        requestSearch(keyword,10).then(res=>{
          this.searchDataAlbum = res.result.albums
        })
         requestSearch(keyword,100,12).then(res=>{
          this.searchDataSinger = res.result.artists
        })
        requestSearch(keyword,1000).then(res=>{
          this.searchDataSongSheet = res.result.playlists
        })
      },
      handlerInputChange() {
        this.getDataByKeyword(this.inputValue)
      },
      handlerHotSearchClick(item) {
        this.getDataByKeyword(item)
        this.inputValue = item
      },
      JumpSongDetail(id) {
        this.$router.push({
          path:'/layout/songDetail',
          query:{
            id
          }
        })
      },
      handlerSongPlay(id) {
        this.getSongDetail(id)
      },
      handlerSongPushList(id) {
        this.getSongDetailPush(id)
      },
      JumpAlbumDetail(id) {
         this.$router.push({
          path:'/layout/album/albumDetail',
          query:{
            id
          }
        })
      },
      JumpSingerDetail(id) {
        this.$router.push({
          path:'/layout/singer/singerDetail',
          query:{
            id
          }
        })
      },
      JumpSongSheetDetail(id) {
        this.$router.push({
          path:'/layout/songsheet/songsheetDetail',
          query:{
            id
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.search-page {
  .top {
    width: 100%;
    height: 250px;
    background-color: #f77870;
    position: relative;
    .input-div {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      width: 500px;
      height: 100px;
      .hot-search {
        color: #eee;
        margin-top: 20px;
        .hot-item {
          margin-right: 30px;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
      }
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    .list-table {
      width: 950px;
      .list-title {
        height: 50px;
        color: #999;
        display: flex;
        align-items: center;
        padding: 0 17px;
        .title-1 {
          margin-left: 36px;
          width: 400px;
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
          width: 400px;
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
            width: 310px;
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
    .album-wrap,.songsheet-wrap {
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
    .singer-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
}
</style>