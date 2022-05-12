
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
import {requestSongDetail} from '../server/page_request/song_request'
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
    //全局播放器相关
    playList:[],//播放列表
    currentSong:{},//播放的歌曲
    currentSongIndex:0,
    playModel:0,//0顺序，1单曲，2随机
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
    /* 播放器 */
    changePlayList(state,payload) {
      //数组去重
      const newList = [...new Set(payload)] 
      state.playList = newList
    },
    changeCurrentSong(state,payload) {
      state.currentSong = payload
    },
    changeCurrentSongIndex(state,payload) {
      state.currentSongIndex = payload
    },
    changePlayModel(state,payload) {
      state.playModel = payload
    },
    cahngeCurrentSongByPrevNext(state,tag) {
      const nowPlayModel = state.playModel
      let nowCurrentSongIndex = state.currentSongIndex
      const nowPlayList = state.playList

      switch (nowPlayModel) {
        case 2:
          //随机
            let randomIndex =  Math.floor(Math.random() * nowPlayList.length);
            while (randomIndex === nowCurrentSongIndex) {
              randomIndex = Math.floor(Math.random() * nowPlayList.length);
            }
            state.currentSongIndex = randomIndex
            state.currentSong = nowPlayList[randomIndex]
          break;
      
        default:
          //顺序 单曲 点击下一首都要列表播放
            nowCurrentSongIndex=nowCurrentSongIndex+tag
            if (nowCurrentSongIndex>=nowPlayList.length) {
              nowCurrentSongIndex=0
            }
            if (nowCurrentSongIndex<0) {
              nowCurrentSongIndex = nowPlayList.length-1
            }
            state.currentSongIndex = nowCurrentSongIndex
            state.currentSong = nowPlayList[nowCurrentSongIndex]
          break;
      }
    }
  },
  actions: {
    /* 登录信息 */
    getLoginInfoByPhone(context, payload) {
      requestPhoneLogin(...payload).then((res) => {
        if (res.code == 200) {
          context.commit("changeLoginInfo", res);
          const infoStr  = JSON.stringify(res)
          localStorage.setItem("musicLoginInfo",infoStr)
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
    /* 播放器 */
    //歌曲详情,改变当前播放歌曲
    getSongDetail(context,payload) {
      //1，判断playlist中是否包含该歌曲
      const playList = context.state.playList
      const songIndex =  playList.findIndex(song=> {return song.id === payload})
      if (songIndex !== -1) {
        //存在
        context.commit("changeCurrentSongIndex",songIndex)
        context.commit("changeCurrentSong",playList[songIndex])
      }else {
        //不存在
        requestSongDetail(payload).then(res=>{
          const song = res.songs && res.songs[0]
          if(!song)return
          const newPlayList = [...playList]
          newPlayList.push(song)
          //commit
          context.commit("changePlayList",newPlayList)
          context.commit("changeCurrentSong",song)
          context.commit("changeCurrentSongIndex",newPlayList.length-1)
        })
      }
      
    },
    //把歌曲加入列表
    getSongDetailPush(context,payload) {
      //1，判断playlist中是否包含该歌曲
      const playList = context.state.playList
      const songIndex =  playList.findIndex(song=> {return song.id === payload})
      if (songIndex == -1) {
        requestSongDetail(payload).then(res=>{
          const song = res.songs && res.songs[0]
          if(!song)return
          const newPlayList = [...playList]
          newPlayList.push(song)
          //commit
          context.commit("changePlayList",newPlayList)
        })
      }
      
    }
  },
  modules: {},
});
