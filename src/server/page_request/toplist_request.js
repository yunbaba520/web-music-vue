import request from "../request";
/* 所有榜单 */
export function requestTopList() {
  return request({
    url: "/toplist",
    method: "get",
  });
}
