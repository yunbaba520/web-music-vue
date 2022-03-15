
let BASEURL = ''
//开发环境
if (process.env.NODE_ENV === 'development') {
    BASEURL = 'https://zhao-wangyiyun-cloud-music-api.vercel.app/'
} else if(process.env.NODE_ENV === 'production') {  //生产环境
    BASEURL = ''
} else {
    BASEURL = '/'
}


let TIMEOUT = 100000

export {BASEURL,TIMEOUT}