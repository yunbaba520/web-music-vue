<template>
  <div
    class="banner-wrap"
    :style="{ background: `url(${bgimg}) center center/6000px ` }"
    v-if="bannerData.length > 0"
  >
    <div class="banner" >
      <div class="left">
        <el-carousel
          :interval="4000"
          height="270px"
          trigger="click"
          arrow="never"
          ref="carousel"
          @change="carouselChange"
        >
          <el-carousel-item v-for="item in bannerData" :key="item.encodeId">
            <img class="image" :src="item.imageUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="right">
        <div class="title">让我们嗨起来！</div>
        <img src="../../../assets/img/bglogo.webp" alt="" />
      </div>
    </div>
    <div class="btn-wrap">
        <span class="btn btn-left" @click="clickLeftBtn"></span>
        <span class="btn btn-right" @click="clickRightBtn"></span>
    </div>
  </div>
</template>

<script>
import { requestBannerData } from "../../../server/page_request/home_request";
export default {
  data() {
    return {
      bannerData: [],
      bgimg: "",
    };
  },
  created() {
    requestBannerData().then((res) => {
      this.bannerData = res.banners;
      this.bgimg = res.banners[0].imageUrl + "?imageView&blur=40x20";
    });
  },
  methods: {
    carouselChange(to, from) {
      this.bgimg = this.bannerData[to].imageUrl + "?imageView&blur=40x20";
    },
    clickLeftBtn() {
        this.$refs.carousel.prev()
    },
    clickRightBtn() {
        this.$refs.carousel.next()
    }
  },
};
</script>

<style lang="less" scoped>
.banner-wrap{
    position: relative;
}
.banner {
  width: 980px;
  margin: 0 auto;
  display: flex;
  .left {
    width: 730px;
    .image {
      width: 100%;
    }
  }
  .right {
    width: 250px;
    .title {
      text-align: center;
      font-size: 20px;
      height: 28px;
      line-height: 28px;
      background-color: #f6f6f6;
    }
    img {
      width: 100%;
    }
  }
}
.btn-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    transform: translateY(-50%);
    .btn {
      position: absolute;
      width: 37px;
      height: 63px;
      background: url("../../../assets/img/banner_sprite.png");
      background-color: transparent;
      cursor: pointer;
      &:hover {
        background-color: #000;
        opacity: 0.1;
      }
    }

    .btn-left {
      left: 188px;
      background-position: 0 -360px;
    }
    .btn-right {
      right: 188px;
      background-position: 0 -508px;
      
    }
}

</style>
