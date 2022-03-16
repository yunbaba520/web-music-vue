<template>
  <div class="newsongs-wrap">
    <div class="newsongs">
      <div class="header"><div class="header-bg"></div></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.newsongs-wrap {
  background-image: linear-gradient(#faebd7, #ffffff);
  .newsongs {
    width: 1200px;
    margin: 0 auto;
    .header {
      width: 1200px;
      height: 40px;
      padding: 50px 0 24px 0;
      .header-bg {
        width: 196px;
        height: 40px;
        margin: 0 auto;
        background: url("../../../assets/img/header-title.png") no-repeat;
        background-position: 0 -50px;
        background-size: 196px;
      }
    }
  }
}
</style>
