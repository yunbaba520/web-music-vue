<template>
  <div class="item">
    <img class="img" :src="img" alt="" @click="clickSong" />
    <div class="info">
      <div class="title" @click="clickSong">{{ title }}</div>
      <div class="create" @click="clickAuthor">
       by:{{ name }}
      </div>
    </div>
  </div>
</template>

<script>
/* 歌单详情页，推荐歌单 */
export default {
  props: ["img","title","name","id"],
  emits: ["clickAuthorEmit", "clickSongEmit"],
  methods: {
    clickSong() {
      this.$emit("clickSongEmit")
    },
    clickAuthor() {
      this.$emit("clickAuthorEmit")

    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  height: 90px;
  align-items: center;
  .img {
    width: 70px;
    height: 70px;
    margin-left: 10px;
    cursor: pointer;
  }
  .info {
    margin-left: 15px;

    .title {
      cursor: pointer;
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
    .create {
      color: #888;
      margin-top: 5px;
      font-size: 14px;
      cursor: pointer;
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
  }
}
</style>
