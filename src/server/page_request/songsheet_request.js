import request from "../request";

/* 轮播图数据 */
export function requestSongSheetCategoryData() {
    return request({
      url: "playlist/catlist",
      method: "get",
    });
  }