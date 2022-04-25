import request from "../request";

/* 获取歌手list */
export function requestSingerList(params={type:-1,area:-1,initial:''},limit=30,offset=0) {
  return request({
    url: "artist/list",
    method: "get",
    params:{
      limit,
      offset,
      ...params
    }
  });
}
/* 歌手详情 */
export function requestSingerDetail(id){
  return request({
    url:"/artist/detail",
    method:"GET",
    params:{
      id
    }
  })
}
/* 歌手热门50首歌曲 */
export function requestSingerHotSongs(id){
  return request({
    url:"/artist/top/song",
    method:"GET",
    params:{
      id
    }
  })
}
/* 获取歌手全部歌曲 */
export function requestSingerAllSongs(id,order='hot',limit=50){
  return request({
    url:"/artist/songs",
    method:"GET",
    params:{
      id,
      order,
      limit
    }
  })
}
/* 获取歌手专辑 */
export function requestSingerAlbum(id,limit=10){
  return request({
    url:"/artist/album",
    method:"GET",
    params:{
      id,
      limit
    }
  })
}
/* 获取相似歌手 */
export function requestSimiSinger(id){
  return request({
    url:"/simi/artist",
    method:"GET",
    params:{
      id
    }
  })
}
