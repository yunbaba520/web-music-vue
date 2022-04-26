<template>
  <div class="my-music-wrap">
    <div class="nologin" v-if="!isLogin">
      <h2>万千音乐尽在眼前~~去登陆</h2>
    </div>
    <div class="islogin" v-if="isLogin && userInfo.profile">
      <div class="top">
        <div class="top-left">
          <el-avatar
            :size="150"
            :src="userInfo.profile.avatarUrl"
            shape="square"
          />
          <div class="base-info">
            <div class="name">{{ userInfo.profile.nickname }}</div>
            <div class="level">等级:{{ userInfo.level }}</div>
            <div class="num">
              <div class="eventCount">
                动态:{{ userInfo.profile.eventCount }}
              </div>
              <div class="follows">关注:{{ userInfo.profile.follows }}</div>
              <div class="followeds">粉丝:{{ userInfo.profile.followeds }}</div>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="gender">
            性别:<span class="text">{{
              userInfo.profile.gender == 0
                ? "保密"
                : userInfo.profile.gender == 1
                ? "男"
                : "女"
            }}</span>
          </div>
          <div class="signature">
            个人介绍: <span class="text">{{ userInfo.profile.signature }}</span>
          </div>
          <div class="createTime">
            加入时间:
            <span class="text">{{
              formatTime(userInfo.createTime)
            }}</span>
          </div>
          <div class="listenSongs">
            累计听歌: <span class="text">{{ userInfo.listenSongs }}</span>
          </div>
          <div class="playlistCount">
            创建歌单:
            <span class="text">{{ userInfo.profile.playlistCount }}</span>
          </div>
        </div>
        <div class="nav">
          <template v-for="item of myMusicLinks" :key="item.link">
            <router-link :to="item.link" custom v-slot="props">
              <div
                :class="{ active: props.isExactActive, 'nav-item': true }"
                @click="props.navigate"
              >
                {{ item.title }}
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {formatTime} from '../../utils/format'
import { myMusicLinks } from "../../common/local-data";
export default {
  data() {
    return {
      myMusicLinks,
    };
  },
  computed: {
    ...mapState(["isLogin", "userInfo"]),
  },
  watch: {
    isLogin(newVal, oldVal) {
      if (newVal) {
        this.getUserInfo();
        this.getUserInfoOuther();
      }
    },
  },
  methods: {
    ...mapActions(["getUserInfo", "getUserInfoOuther"]),
    formatTime,
  },
};
</script>

<style lang="less" scoped>
.my-music-wrap {
  min-height: 499px;
  .nologin {
    h2 {
      text-align: center;
    }
  }
  .islogin {
    .top {
      padding: 100px 0;
      height: 200px;
      background: url("../../assets/img/myMusicTopBG.webp") no-repeat;
      background-size: 100% 100%;
      display: flex;
      position: relative;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 130px;
        padding-top: 20px;
        margin-right: 20px;
        .el-avatar {
          margin-right: 40px;
        }
        .base-info {
          width: 450px;
          .name {
            font-size: 30px;
            margin-bottom: 10px;
          }
          .level {
            margin-bottom: 8px;
          }
          .num {
            display: flex;
            div {
              padding-right: 15px;
            }
            div:nth-child(-n + 2) {
              border-right: 2px solid #999;
            }
            div:nth-child(n + 2) {
              margin-left: 10px;
            }
          }
        }
      }
      .top-right {
        padding-top: 20px;
        .gender {
          margin-left: 170px;
          margin-bottom: 20px;
        }
        .signature {
          margin-left: 120px;
          margin-bottom: 20px;
        }
        .createTime {
          margin-left: 90px;
          margin-bottom: 20px;
        }
        .listenSongs {
          margin-left: 60px;
          margin-bottom: 20px;
        }
        .playlistCount {
          margin-left: 30px;
        }
        .text {
          margin-left: 10px;
          color: #333;
        }
      }
      .nav {
        position: absolute;
        width: 500px;
        left: 90px;
        bottom: 20px;
        display: flex;
        justify-content: space-between;
        .nav-item {
          color: #000;
          cursor: pointer;
          font-size: 18px;
          &:hover {
            color: #f77870;
          }
        }
        .active {
          color: red;
        }
      }
    }
  }
}
</style>
