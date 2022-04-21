<template>
  <div class="item">
    <img class="img" :src="item.coverImgUrl" alt="" @click="clickSongsheet" />
    <div class="info">
      <div class="title" @click="clickSongsheet">{{ item.name }}</div>
      <div class="create" @click="clickAuthor">
        by:{{ item.creator.nickname }}
      </div>
    </div>
  </div>
</template>

<script>
/* 歌单详情页，推荐歌单 */
export default {
  props: ["item"],
  emits: ["clickAuthorEmit", "clickSongsheetEmit"],
  methods: {
    clickSongsheet() {
      this.$emit("clickSongsheetEmit",this.item.id)
    },
    clickAuthor() {},
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
