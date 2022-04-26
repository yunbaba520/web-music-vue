import moment from "moment";

/* 对播放量格式化 例：452272转为45.2万 */
export function formatCount(count) {
  var counter = parseInt(count); //确保传入的是数字
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + "亿";
  } else if (counter > 10000) {
    return (counter / 10000).toFixed(1) + "万";
  } else {
    return counter;
  }
}

/* 时间格式化 */
//时间搓转为 yyyy-mm-dd
export function formatTime(time) {
  return moment(time).format("YYYY-MM-DD");
}

/* 补零算法 */
export function addZero(count) {
  //将4:9补成04:09
  count = count + ""
  return ("00"+count).slice(count.length)
}

/* 对时长格式化 */
export function formatTimeLength(time) {
  var newTime = parseInt(time)
  newTime = newTime/1000//毫秒转为秒
  var minute = Math.floor(newTime/60)
  var second = Math.floor(newTime%60)

  return addZero(minute)+":"+addZero(second)
}

/* 获取音乐播放链接 */
export function getSongPlay(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}