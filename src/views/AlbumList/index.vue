<template>
  <div class="album-list">
    <h3>热门新碟</h3>
    <div class="hot-album">
      <template v-for="item in hotAlbum" :key="item.id">
        <div class="card">
          <CardCover :coverImgUrl="item.picUrl" @click="handlerJumpDetail(item)"/>
          <div class="card-title" @click="handlerJumpDetail(item)">{{ item.name }}</div>
          <div class="card-name">{{ item.artist.name }}</div>
        </div>
      </template>
    </div>
    <h3>全部新碟</h3>
    <div class="btns">
      <template v-for="item in tabs" :key="item.value">
        <span
          :class="{ activeTab: item.value == activeTab }"
          @click="handlerClickTab(item.value)"
          >{{ item.label }}</span
        >
      </template>
    </div>
    <div class="all-album">
      <template v-for="item in allAlbum" :key="item.id">
        <div class="card">
          <CardCover :coverImgUrl="item.picUrl"  @click="handlerJumpDetail(item)"/>
          <div class="card-title"  @click="handlerJumpDetail(item)">{{ item.name }}</div>
          <div class="card-name">{{ item.artist.name }}</div>
        </div>
      </template>
    </div>
    <el-pagination :page-size="30" :current-page="currentPage" layout="prev, pager, next" :page-count="pageCount" @current-change="handlerCurrentChange"/>
  </div>
</template>

<script>
import {
  requestHotAlbum,
  requestAllAlbum,
} from "../../server/page_request/album_request";
import CardCover from "../../components/songsheet-cover.vue";
import { tabs } from "./data";
export default {
  data() {
    return {
      tabs,
      activeTab: "ALL",
      hotAlbum: [],
      allAlbum: [],
      currentPage:1,//当前页
      pageCount:0,//共多少页
    };
  },
  components: {
    CardCover,
  },
  created() {
    requestHotAlbum().then((res) => {
      this.hotAlbum = res.monthData.slice(0, 10);
    });
    this.getAllAlbum(this.activeTab,0);
  },
  methods: {
    handlerClickTab(value) {
      this.activeTab = value;
      this.getAllAlbum(this.activeTab,0);
      this.currentPage = 1
    },
    getAllAlbum(area,offset) {
      requestAllAlbum(area,offset).then((res) => {
        this.allAlbum = res.albums;
        this.pageCount = Math.ceil(res.total/30)
      });
    },
    handlerCurrentChange(val) {
      this.currentPage = val
      this.getAllAlbum(this.activeTab,(val-1)*30)
    },
    handlerJumpDetail(item) {
      this.$router.push({
        path:"albumDetail",
        query:{
          id:item.id
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.album-list {
  width: 1200px;
  margin: 0 auto;
  .hot-album,
  .all-album {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    justify-items: center;
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
  .btns {
    display: flex;
    margin-bottom: 10px;
    span {
      margin: 0 10px;
      &:hover {
        color: #f77870;
        cursor: pointer;
      }
    }
    .activeTab {
      color:#f77870;
    }
  }
}
</style>
