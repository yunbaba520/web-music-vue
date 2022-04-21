import request from "../request";

/* 获取歌单分类 */
export function requestSongSheetCategoryData() {
  return request({
    url: "playlist/catlist",
    method: "get",
  });
}

/* 相关歌单推荐 */
export function requestSongSheetRecommend(id) {
  return request({
    url: "related/playlist",
    method: "get",
    params:{
      id
    }
  });
}