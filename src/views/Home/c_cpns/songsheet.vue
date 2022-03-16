<template>
  <div class="songsheet-wrap" v-if="songsheetData.length > 0">
    <div class="songsheet">
      <div class="header"><div class="header-bg"></div></div>
      <div class="tab">
        <template v-for="item of tabList" :key="item">
          <span
            :class="['tab-item', tabActive == item ? 'tabactive' : '']"
            @click="changeTabActive(item)"
            >{{ item }}</span
          >
        </template>
      </div>
      <div class="carousel">
        <el-carousel indicator-position="outside" arrow="never" ref="carousel">
          <el-carousel-item
            v-for="i in Math.ceil(songsheetData.length / 5)"
            :key="i"
            class="carousel-item"
          >
            <template
              v-for="item in songsheetData.slice((i - 1) * 5, i * 5)"
              :key="item.id"
            >
              <div class="card">
                <a href="javascript:void(0);" class="card-top">
                  <img class="card-img" :src="item.coverImgUrl" alt="" />
                  <i class="card-cover"></i>
                </a>
                <div class="card-title">{{ item.name }}</div>
                <div class="card-playCount">
                  播放量: {{ formatCount(item.playCount) }}
                </div>
              </div>
            </template>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="btn-wrap">
      <span class="btn btn-left" @click="clickLeftBtn"
        ><span class="btn-btn-left btn-btn"></span
      ></span>
      <span class="btn btn-right" @click="clickRightBtn"
        ><span class="btn-btn-right btn-btn"></span
      ></span>
    </div>
  </div>
</template>

<script>
import { requestSongSheetData } from "@/server/page_request/home_request";
import { formatCount } from "@/utils/format";
export default {
  data() {
    return {
      tabList: ["全部", "华语", "古风", "欧美", "流行"],
      tabActive: "全部",
      songsheetData: [],
    };
  },
  created() {
    requestSongSheetData().then((res) => {
      this.songsheetData = res.playlists;
    });
  },
  methods: {
    changeTabActive(item) {
      this.tabActive = item;
      requestSongSheetData(item).then((res) => {
        this.songsheetData = res.playlists;
      });
    },
    clickLeftBtn() {
        this.$refs.carousel.prev()
    },
    clickRightBtn() {
        this.$refs.carousel.next()
    },
    formatCount,
  },
};
</script>

<style lang="less" scoped>
.songsheet-wrap {
  position: relative;
  background-image: linear-gradient(#faebd7, #ffffff);

  &:hover {
    .btn-wrap {
      .btn {
        width: 79px;
        opacity: 1;
      }
    }
  }
  .songsheet {
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
        background: url("../../../assets/img/header-title.png") no-repeat 0 4px;
        background-size: 196px;
      }
    }
    .tab {
      text-align: center;
      height: 50px;
      .tab-item {
        display: inline-block;
        margin: 0 24px;
        font-size: 15px;
        color: #333;
        cursor: pointer;
        &:hover {
          color: #f77870;
        }
      }
      .tabactive {
        color: #f77870;
      }
    }
    .carousel {
      .carousel-item {
        display: flex;
        .card {
          width: 224px;
          height: 300px;
          margin-right: 20px;
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
              background: url("../../../assets/img/cover_play.png") no-repeat;
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
  }
  .btn-wrap {
    position: absolute;
    top: 40%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    .btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0px;
      opacity: 0;
      height: 108px;
      transition: width ease 0.5s,opacity ease 0.3s;
      cursor: pointer;
      background-color: #FAEBD7;
      .btn-btn {
        background: url("../../../assets/img/icon_sprite.png");
        background-size: 200px 336px;
        background-color: transparent;
        width: 20px;
        height: 39px;
      }
      &:hover {
          background-color: #FFEBCD;
      }
    }

    .btn-left {
      left: 0px;
      .btn-btn-left {
        background-position: -20px -120px;
      }
    }
    .btn-right {
      right: 0px;
      .btn-btn-right {
        background-position: 0px -120px;
      }
    }
  }
}
</style>
