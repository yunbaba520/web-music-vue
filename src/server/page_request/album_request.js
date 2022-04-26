import request from "../request";

/* 新碟上架，热门 */
export function requestHotAlbum(limit=10,type='hot',area='ZH') {
  return request({
    url: "/top/album",
    method: "get",
    params:{
      limit,
      type,
      area
    }
  });
}
/* 全部新碟 */
//area : ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
export function requestAllAlbum(area='ALL',offset=0,limit=30) {
  return request({
    url: "/album/new",
    method: "get",
    params:{
      limit,
      offset,
      area
    }
  });
}
/* 专辑内容 */
export function requestAlbumDetail(id) {
  return request({
    url: "/album",
    method: "get",
    params:{
      id
    }
  });
}