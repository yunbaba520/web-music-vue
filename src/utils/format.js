/* 对播放量格式化 例：452272转为45.2万 */
export function formatCount(count) {
    var counter = parseInt(count) //确保传入的是数字
    if (counter > 100000000) {
        return (counter / 100000000).toFixed(1) + "亿"
    } else if (counter > 10000) {
        return (counter / 10000).toFixed(1) + "万"
    } else {
        return counter
    }
}