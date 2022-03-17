<template>
  <div class="toplist-item" v-if="toplistData.tracks">
    <div class="imgdiv">
      <img class="imgdiv-img" :src="toplistData.tracks[0].al.picUrl" alt="">
      <div class="imgdiv-title">{{toplistData.name}}</div>
    </div>
    <div class="song-list">
      <template v-for="(item,index) in toplistData.tracks.slice(0,5)" :key="item.id">
        <div class="song-item">
          <div class="item-index">{{index}}</div>
          <div class="item-info">
            <div class="info-title">{{item.name}}</div>
            <div class="info-ar">{{item.ar[0].name}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props:["toplistData"]
};
</script>

<style lang="less" scoped>
.toplist-item {
  width: 220px;
  background-image: linear-gradient(#FBBFB8, #fef9f3);
  .imgdiv {
    position: relative;
    width: 220px;
    height: 150px;
    overflow: hidden;
    .imgdiv-img {
      width: 220px;
      filter: contrast(40%);
    }
    .imgdiv-title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: #fff;
      font-size: 30px;
      font-weight: 700;
      font-family: SimSun;
    }
  }
  .song-list {
    padding: 20px;
    .song-item {
      width: 180px;
      height: 60px;
      display: flex;
      align-items: center;
      .item-index {
        width: 30px;
        font-weight: 700;
      }
      .item-info {
        .info-title {
          color: #333;
          font-size: 16px;
        }
        .info-ar {
          color: #999;
          font-size: 14px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>
