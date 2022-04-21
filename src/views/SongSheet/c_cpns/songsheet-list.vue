<template>
  <div class="songsheet-list-wrap">
    <div class="songsheet-list">
      <div class="header">
        {{ songSheetSelectCat }}
      </div>
      <div class="list">
        <template v-for="item in songSheetListData.playlists" :key="item.id">
          <div class="card">
            <CardCover :coverImgUrl="item.coverImgUrl" @click="handleSongSheetClick(item)"/>
            <div class="card-title" @click="handleSongSheetClick(item)">{{ item.name }}</div>
            <div class="card-playCount">
              播放量: {{ formatCount(item.playCount) }}
            </div>
          </div>
        </template>
      </div>
      <div class="pagination">
        <el-pagination
          :page-size="50"
          layout="prev, pager, next"
          :total="songSheetListData.total"
          v-model:currentPage="currentIndex"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardCover from "@/components/songsheet-cover.vue";
import { formatCount } from "@/utils/format";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      currentIndex: 1, //当前页
    };
  },
  computed: {
    ...mapState(["songSheetSelectCat", "songSheetListData"]),
  },
  watch: {
    songSheetSelectCat() {
      this.currentIndex = 1;
    },
    
  },
  components: {
    CardCover,
  },
  methods: {
    //分页器改变
    handleCurrentChange(val) {
      let offset = (val - 1) * 50;
      this.getSongsheetListData([this.songSheetSelectCat, 50, offset]);
    },
    //进入歌单详情页
    handleSongSheetClick(item){
      this.$router.push({
        name:'songsheetDetail',
        params:{
          id:item.id
        }
      })
      // console.log(item);
      //新分支已建好，开始歌单详情开发吧
    },
    formatCount,
    ...mapActions(["getSongsheetListData"]),
  },
};
</script>

<style lang="less" scoped>
.songsheet-list-wrap {
  .songsheet-list {
    width: 1200px;
    margin: 0 auto;
    .header {
      height: 35px;
      font-size: 26px;
      padding: 10px 0 20px 0;
      border-top: 1px solid #333;
      margin-top: 20px;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .card {
        width: 224px;
        height: 300px;
          margin-bottom: 20px;

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
        .card-playCount {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .pagination{
        display: flex;
        justify-content: center;
    }
  }
}
</style>
