import request from "../request";

/* 手机登录 */
export function requestPhoneLogin(phone="13460787646",password="1224251X"){
  return request({
    url:"/login/cellphone",
    method:"GET",
    params:{
      phone,
      password
    }
  })
}
/* 邮箱登录 */
export function requestEmailLogin(email,password){
  return request({
    url:"/login",
    method:"GET",
    params:{
      email,
      password
    }
  })
}
/* 获取用户详情 */
export function requestGetUserInfo(uid){
  return request({
    url:"/user/detail",
    method:"GET",
    params:{
      uid
    }
  })
}
/* 获取用户歌单*/
export function requestGetUserSongSheet(uid){
  return request({
    url:"/user/playlist",
    method:"GET",
    params:{
      uid
    }
  })
}
/* 获取用户关注*/
export function requestGetUserfollows(uid,limit=30,offset=0){
  return request({
    url:"/user/follows",
    method:"GET",
    params:{
      uid,
      limit,
      offset
    }
  })
}
/* 获取用户粉丝*/
export function requestGetUserfolloweds(uid,limit=30,offset=0){
  return request({
    url:"/user/followeds",
    method:"GET",
    params:{
      uid,
      limit,
      offset
    }
  })
}
/* 获取用户播放记录，1周数据，0全部 */
export function requestGetUserRecord(uid,type=1){
  return request({
    url:"/user/record",
    method:"GET",
    params:{
      uid,
      type
    }
  })
}
/* 最近播放-歌曲 */
export function requestLatelySongs(){
  return request({
    url:"/record/recent/song",
    method:"GET",
  })
}