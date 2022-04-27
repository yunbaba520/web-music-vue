<template>
  <div class="top-list">
    <div class="left">
      <h3>巅峰榜</h3>
      <template v-for="item in list.slice(0, 4)" :key="item.id">
        <div
          :class="['item', selectTabId == item.id ? 'active-tab' : '']"
          @click="handlerClickTab(item)"
        >
          <img class="img" :src="item.coverImgUrl" alt="" />
          <div class="info">
            <div class="title">{{ item.name }}</div>
            <div class="updateFrequency">{{ item.updateFrequency }}</div>
          </div>
        </div>
      </template>
      <h3>全球媒体榜</h3>
      <template v-for="item in list.slice(4, list.length)" :key="item.id">
        <div :class="['item', selectTabId == item.id ? 'active-tab' : '']"
          @click="handlerClickTab(item)">
          <img class="img" :src="item.coverImgUrl" alt="" />
          <div class="info">
            <div class="title">{{ item.name }}</div>
            <div class="updateFrequency">{{ item.updateFrequency }}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="right">
      <div class="info">
        <img class="img" :src="selectTabItem.coverImgUrl" alt="" />
        <div class="content">
          <div class="name">{{ selectTabItem.name }}</div>
          <div class="count">
            播放:<span>{{ selectTabItem.playCount }}</span
            >次
          </div>
          <div class="update">
            <el-icon><timer /></el-icon>最近更新:{{
              formatTime(selectTabItem.updateTime)
            }}({{ selectTabItem.updateFrequency }})
          </div>
          <div class="description">{{ selectTabItem.description }}</div>
          <div class="btns">
            <span @click="handlerPlayAllClick">播放全部</span>
            <span @click="handlerAddPlayListClick">添加到列表</span>
          </div>
        </div>
      </div>
      <h3>歌曲列表</h3>
      <div class="list-table">
        <div class="list-title">
          <span class="title-1">歌曲</span>
          <span class="title-2">歌手</span>
          <span class="title-3">专辑</span>
          <span class="title-4">时长</span>
        </div>
        <template v-for="(item, index) in selectList" :key="item.id">
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
            <span class="time">{{ item.dt }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestTopList } from "../../server/page_request/toplist_request";
import { requestRankingData } from "../../server/page_request/home_request";
import { Timer } from "@element-plus/icons-vue";
import { formatTime } from "../../utils/format";
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
  data() {
    return {
      list: [],
      selectTabId: 0,
      selectTabItem: {},
      selectList: [],
    };
  },
  created() {
    requestTopList().then((res) => {
      this.list = res.list;
      this.selectTabId = res.list[0].id;
      this.selectTabItem = res.list[0];
    });
  },
  watch: {
    selectTabId(newID, oldID) {
      this.getSelectTabList(newID);
    },
  },
  computed:{
    ...mapState(["playList","currentSong","currentSongIndex"])
  },  
  methods: {
    handlerClickTab(item) {
      this.selectTabId = item.id;
      this.selectTabItem = item;
    },
    getSelectTabList(id) {
      requestRankingData(id).then((res) => {
        this.selectList = res.playlist.tracks;
      });
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
    handlerPlayAllClick() {
      this.changePlayList([...this.selectList])
      this.changeCurrentSong(this.selectList[0])
      this.changeCurrentSongIndex(0)
    },
    //添加到列表
    handlerAddPlayListClick() {
      const newPlayList = [...this.playList,...this.selectList]
      this.changePlayList(newPlayList)
    },
    formatTime,
    ...mapActions(["getSongDetail","getSongDetailPush"]),
    ...mapMutations(["changePlayList","changeCurrentSong","changeCurrentSongIndex"])
  },
  components: {
    Timer,
  },
};
</script>

<style lang="less" scoped>
.top-list {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  .left {
    width: 200px;
    padding: 10px;
    border: 1px solid #999;
    .item {
      display: flex;
      align-items: center;
      width: 200px;
      height: 70px;
      cursor: pointer;
      &:hover {
        background-color: #f8f8f8;
      }
      .img {
        margin-left: 15px;
        width: 50px;
        height: 50px;
      }
      .info {
        margin-left: 15px;
        .title {
          margin-bottom: 6px;
        }
        .updateFrequency {
          font-size: 13px;
          color: #666;
        }
      }
    }
    .active-tab {
      background-color: #f8f8f8;
    }
  }
  .right {
    width: 950px;
    .info {
      margin-top: 30px;
      display: flex;
      align-items: center;
      .img {
        width: 200px;
        height: 200px;
        margin-right: 30px;
      }
      .content {
        .name {
          font-size: 24px;
          margin-bottom: 15px;
        }
        .count {
          margin-bottom: 6px;
          span {
            color: #f77870;
          }
        }
        .update,
        .description {
          color: #666;
          margin-bottom: 10px;
        }

        .btns {
          display: flex;
          span {
            padding: 3px 12px;
            background-color: #f77870;
            margin: 0 3px;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
              background-color: #ff6347;
            }
          }
        }
      }
    }
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
  }
}
</style>
