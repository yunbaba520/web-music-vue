import request from "../request";
/* 轮播图数据 */
export function requestBannerData() {
  return request({
    url: "banner",
    method: "get",
  });
}
/* 歌单推荐 */
export function requestSongSheetData(cat="全部",limit=10) {
  return request({
    url: "top/playlist",
    method: "get",
    params:{
      cat,
      limit
    }
  });
}
/* 歌单详情，排行榜也是歌单 */
export function requestRankingData(id) {
  return request({
    url: "playlist/detail",
    method: "get",
    params:{
      id
    }
  });
}
/* 热门歌手 */
export function requestHotSingerData(limit=6,offset=0) {
  return request({
    url: "top/artists",
    method: "get",
    params:{
      limit,
      offset
    }
  });
}
/* home页，新碟上架 */
export function requestNewAlbumData() {
  return request({
    url: "album/newest",
    method: "get",
  });
}