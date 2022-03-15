import request from "../request"

export function requestBannerData() {
    return request({
      url: "banner",
      method: "get",
    });
  }