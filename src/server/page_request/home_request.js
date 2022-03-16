import request from "../request";

export function requestBannerData() {
  return request({
    url: "banner",
    method: "get",
  });
}
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
