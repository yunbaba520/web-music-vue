<template>
  <div class="wrap" v-if="listData.coverImgUrl">
    <div class="info">
      <img :src="listData.coverImgUrl" alt="" />
      <div class="content">
        <div class="title">{{ listData.name }}</div>
        <div class="avatar">
          <el-icon :size="19" color="#cccccc"><avatar /></el-icon
          >{{ listData.creator.nickname }}
        </div>
        <div class="line tags">
          标签:
          <template v-for="item in listData.tags" :key="item"
            ><span class="tag">{{ item }}</span></template
          >
        </div>
        <div class="line">播放量:{{ formatCount(listData.playCount) }}</div>
        <div class="line">
          收藏量:{{ formatCount(listData.subscribedCount) }}
        </div>
        <div class="btns"><span class="btn1">播放全部</span></div>
        <div class="introduce">介绍:{{ listData.description }}</div>
      </div>
    </div>
    <div class="list">
      <div class="list-table">
        <div class="list-title">
          <span class="title-1">歌曲</span>
          <span class="title-2">歌手</span>
          <span class="title-3">专辑</span>
          <span class="title-4">时长</span>
        </div>
        <template
          v-for="(item, index) in listData.tracks.slice(0, 10)"
          :key="item.id"
        >
          <div class="item">
            <span class="index">{{ index + 1 }}</span>
            <span class="song-name">{{ item.name }}</span>
            <div class="btns">
              <span class="btn-play"></span>
              <span class="btn-addlist"></span>
            </div>
            <span class="ar-name">{{ item.ar[0].name }}</span>
            <span class="al-name">{{ item.al.name }}</span>
            <span class="time">{{ item.dt }}</span>
          </div>
        </template>
        <div class="down">
          <div class="more">查看更多内容 请下载客户端</div>
          <div class="now-down">立即下载</div>
        </div>
      </div>
      <div class="list-recommend">
        <div class="recommend-title">相关推荐</div>
        <template v-for="item in recommendData" :key="item.id">
          <SongsheetRecommend
            :item="item"
            @clickSongsheetEmit="handleClickSongsheet"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
/* 歌单详情，params需歌单id */
import { requestRankingData } from "../../server/page_request/home_request";
import { requestSongSheetRecommend } from "../../server/page_request/songsheet_request";
import { Avatar } from "@element-plus/icons-vue";
import SongsheetRecommend from "../../components/songsheet-recommend.vue";
import { formatCount } from "../../utils/format";
export default {
  created() {
    this.getDataById(this.$route.params.id);
  },
  data() {
    return {
      listData: {},
      recommendData: [],
    };
  },
  components: {
    Avatar,
    SongsheetRecommend,
  },
  methods: {
    formatCount,
    handleClickSongsheet(id) {
      this.getDataById(id);
    },
    getDataById(id) {
      requestRankingData(id).then((res) => {
        this.listData = res.playlist;
      });
      requestSongSheetRecommend(id).then((res) => {
        this.recommendData = res.playlists;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  width: 1200px;
  margin: 0 auto;
  .info {
    display: flex;
    margin: 40px 0;
    align-items: center;
    img {
      width: 250px;
      height: 250px;
    }
    .content {
      margin-left: 40px;
      .title {
        font-size: 31px;
        height: 50px;
        line-height: 50px;
      }
      .avatar {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #333;
      }
      .line {
        height: 27px;
        line-height: 27px;
        font-size: 14px;
        color: #555;
      }
      .tags {
        margin-top: 6px;
        .tag {
          margin-left: 10px;
        }
      }
      .btns {
        display: flex;
        .btn1 {
          width: 84px;
          height: 36px;
          padding: 0 18px;
          line-height: 36px;
          text-align: center;
          background-color: #f77870;
          border: 1px solid #f77870;
          color: #fff;
        }
      }
      .introduce {
        margin-top: 6px;
        line-height: 27px;
        font-size: 14px;
        color: #333;
        /* 显示二行 */
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -moz-box;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
        overflow: hidden;
      }
    }
  }
  .list {
    display: flex;
    .list-table {
      width: 900px;
      .list-title {
        height: 50px;
        color: #999;
        display: flex;
        align-items: center;
        padding: 0 17px;
        .title-1 {
          margin-left: 36px;
          width: 370px;
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
          width: 370px;
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
          background-color: #f8f8f8;
        }
        &:hover {
          .song-name {
            width: 280px;
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
      .down {
        text-align: center;
        margin: 40px 0;
        .more {
          height: 27px;
          line-height: 27px;
          font-size: 18px;
        }
        .now-down {
          margin: 10px 380px;
          height: 40px;
          line-height: 40px;
          background-color: #f77870;
          color: #fff;
          border-radius: 20px;
        }
      }
    }
    .list-recommend {
      width: 300px;
      .recommend-title {
        font-size: 18px;
        height: 30px;
        border-bottom: 1px solid #999;
      }
    }
  }
}
</style>
