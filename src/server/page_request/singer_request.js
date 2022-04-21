import request from "../request";

/* 获取歌单分类 */
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
