import request from "../request";

/* 获取歌单分类 */
export function requestSongSheetCategoryData() {
    return request({
      url: "playlist/catlist",
      method: "get",
    });
  }