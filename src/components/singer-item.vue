<template>
  <div class="singer-item">
    <div class="img-wrap" @click="handlerImgClick">
      <img class="img-img" :src="img" alt="" />
    </div>
    <div class="name" @click="handlerNameClick">{{ name }}</div>
  </div>
</template>

<script>
/* 歌手组件，首页热门歌手 */
export default {
  props: ["img", "name"],
  emits:["nameClick","imgClick"],
  methods:{
    handlerNameClick() {
      this.$emit("nameClick")
    },
    handlerImgClick() {
      this.$emit("imgClick")
    }
  }
};
</script>

<style lang="less" scoped>
.singer-item {
  width: 180px;
  height: 250px;
  cursor: pointer;
  .img-wrap {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    .img-img {
      width: 180px;
      height: 180px;
      transform: scale(1);
      transition: transform 0.5s;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .name {
    text-align: center;
    margin-top: 20px;
    &:hover {
      color: #f77870;
    }
  }
}
</style>
