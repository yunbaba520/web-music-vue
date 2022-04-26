import request from "../request";

/* 歌曲详情 */
export function requestSongDetail(ids){
  return request({
    url:"/song/detail",
    method:"GET",
    params:{
      ids
    }
  })
}
/* 获取音乐url */
export function requestSongUrl(id){
  return request({
    url:"/song/url",
    method:"GET",
    params:{
      id
    }
  })
}
/* 音乐是否可用 */
export function requestSongIsPlay(id){
  return request({
    url:"/check/music",
    method:"GET",
    params:{
      id
    }
  })
}
/* 获取歌词 */
export function requestSongLyric(id){
  return request({
    url:"/lyric",
    method:"GET",
    params:{
      id
    }
  })
}
/* 歌曲评论 */
export function requestSongComment(id,limit=10){
  return request({
    url:"/comment/music",
    method:"GET",
    params:{
      id,
      limit
    }
  })
}
/* 相似音乐 */
export function requestSongSimi(id){
  return request({
    url:"/simi/song",
    method:"GET",
    params:{
      id,
    }
  })
}