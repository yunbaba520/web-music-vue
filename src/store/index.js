import { createStore } from "vuex";
import { requestSongSheetData } from "../server/page_request/home_request";
import {
  requestPhoneLogin,
  requestEmailLogin,
  requestGetUserInfo,
  requestGetUserSongSheet,
  requestGetUserfollows,
  requestGetUserfolloweds,
  requestGetUserRecord
} from "../server/page_request/login_request";
export default createStore({
  state: {
    // 登录信息
    loginInfo: {},
    isLogin: false,
    //用户信息
    userInfo: {},
    userCreateSongSheet: [],
    userCollectSongSheet: [],
    userFollows: [],
    userFolloweds:[],
    userRecord:[],
    //歌单
    songSheetSelectCat: "",
    songSheetListData: {},
  },
  mutations: {
    changeLoginInfo(state, payload) {
      state.loginInfo = payload;
      state.isLogin = true;
    },
    /* 用户信息 */
    changeUserInfo(state, payload) {
      state.userInfo = payload;
    },
    changeUserCreateSongSheet(state, payload) {
      state.userCreateSongSheet = payload;
    },
    changeUserCollectSongSheet(state, payload) {
      state.userCollectSongSheet = payload;
    },
    changeUserFollows(state, payload) {
      state.userFollows = payload;
    },
    changeUserFolloweds(state, payload) {
      state.userFolloweds = payload;
    },
    changeUserRecord(state,payload) {
      state.userRecord = payload
    },
    /* 歌单 */
    changeSongSheetCat(state, payload) {
      state.songSheetSelectCat = payload;
    },
    changeSongSheetListData(state, payload) {
      state.songSheetListData = payload;
    },
  },
  actions: {
    /* 登录信息 */
    getLoginInfoByPhone(context, payload) {
      requestPhoneLogin(...payload).then((res) => {
        if (res.code == 200) {
          context.commit("changeLoginInfo", res);
        }
      });
    },
    getLoginInfoByEmail(context, payload) {
      requestEmailLogin(...payload).then((res) => {
        if (res.code == 200) {
          context.commit("changeLoginInfo", res);
        }
      });
    },
    /* 用户信息 */
    getUserInfo(context, payload) {
      requestGetUserInfo(context.state.loginInfo.profile.userId).then((res) => {
        console.log(res);
        context.commit("changeUserInfo", res);
      });
    },
    /* 用户-最近常听 创建收藏歌单 关注粉丝 */
    getUserInfoOuther(context, payload) {
      const id = context.state.loginInfo.profile.userId;
      requestGetUserSongSheet(id).then((res) => {
        const createList = [];
        const collectList = [];
        res.playlist.forEach((item) => {
          if (item.userId == id) {
            createList.push(item);
          } else {
            collectList.push(item);
          }
        });
        context.commit("changeUserCreateSongSheet", createList);
        context.commit("changeUserCollectSongSheet", collectList);
      });
      requestGetUserfollows(id).then((res) => {
        context.commit("changeUserFollows", res.follow);
      });
      requestGetUserfolloweds(id).then(res=>{
        context.commit("changeUserFolloweds", res.followeds);
      })
      requestGetUserRecord(id,0).then(res=>{
        console.log(res);
        context.commit("changeUserRecord",res.allData)
      })
    },
    /* 获取歌单list数据 */
    getSongsheetListData(context, payload) {
      context.commit("changeSongSheetCat", payload[0]);
      //该发送请求了
      requestSongSheetData(...payload).then((res) => {
        context.commit("changeSongSheetListData", res);
      });
    },
  },
  modules: {},
});
