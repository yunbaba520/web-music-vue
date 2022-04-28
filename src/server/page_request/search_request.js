import request from "../request";

/* 搜索*/
// type：1单曲，10专辑，100歌手，1000歌单
export function requestSearch(keywords ,type=1,limit=10) {
  return request({
    url: "/cloudsearch",
    method: "get",
    params:{
      limit,
      type,
      keywords
    }
  });
}
/* 搜索多重匹配 */
export function requestSearchMore(keywords) {
  return request({
    url: "/search/multimatch",
    method: "get",
    params:{
      keywords
    }
  });
}
/* 热门搜索 */
export function requestHotSearch() {
  return request({
    url: "/search/hot",
    method: "get",
  });
}