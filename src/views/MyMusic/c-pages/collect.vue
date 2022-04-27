<template>
  <div class="created-wrap">
    <h2>我收藏的歌单</h2>
    <div class="list">
      <template v-for="item in userCollectSongSheet" :key="item.id">
        <div class="card">
          <CardCover
            :coverImgUrl="item.coverImgUrl"
            @click="handleSongSheetClick(item.id)"
          />
          <div class="card-title" @click="handleSongSheetClick(item.id)">
            {{ item.name }}
          </div>
          <div class="card-playCount">
            播放量: {{ formatCount(item.playCount) }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import CardCover from "@/components/songsheet-cover.vue";
import { formatCount } from "@/utils/format";
import { mapState } from "vuex";

export default {
 
  computed: {
    ...mapState(["userCollectSongSheet"]),
  },
  components: {
    CardCover,
  },
  methods: {
    handleSongSheetClick(id) {
      this.$router.push({
        path:'/layout/songsheet/songsheetDetail',
        query:{
          id
        }
      })
    },
    formatCount,
  },
};
</script>

<style lang="less" scoped>
.created-wrap {
  width: 1360px;
  margin: 0 auto;
  .list {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    justify-items: center;
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
}
</style>
