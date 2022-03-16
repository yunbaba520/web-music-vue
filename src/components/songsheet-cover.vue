<template>
  <a href="javascript:void(0);" class="card-top">
    <img class="card-img" :src="item.coverImgUrl" alt="" />
    <i class="card-cover"></i>
  </a>
</template>

<script>
import { formatCount } from "@/utils/format";
export default {
  props: ["item"],
  methods: {
    formatCount,
  },
};
</script>

<style lang="less" scoped>
.card-top {
  position: relative;
  display: inline-block;
  width: 224px;
  height: 224px;
  overflow: hidden;
  .card-img {
    width: 224px;
    height: 224px;
    cursor: pointer;
    transform: scale(1);
    transition: all ease 0.5s;
  }
  .card-cover {
    position: absolute;
    top: 77px;
    bottom: 77px;
    left: 77px;
    right: 77px;
    background: url("../assets/img/cover_play.png") no-repeat;
    background-size: 70px 70px;
    transform: scale(0);
    opacity: 0;
    transition: all ease 0.5s;
  }
  &:hover {
    .card-img {
      transform: scale(1.1);
    }
    .card-cover {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
