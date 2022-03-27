import { createStore } from 'vuex'
import {requestSongSheetData} from '../server/page_request/home_request'
export default createStore({
  state: {
    songSheetSelectCat:'',
    songSheetListData:{}
  },
  mutations: {
    changeSongSheetCat(state,payload){
      state.songSheetSelectCat = payload
    },
    changeSongSheetListData(state,payload){
      state.songSheetListData = payload
    }
  },
  actions: {
    /* 获取歌单list数据 */
    getSongsheetListData(context,payload) {
      context.commit('changeSongSheetCat',payload[0])
      //该发送请求了
      requestSongSheetData(...payload).then(res=>{
        context.commit('changeSongSheetListData',res)
      })
    }
  },
  modules: {
  }
})
