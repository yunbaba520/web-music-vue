<template>
    <div class="hotsinger-wrap" v-if="singerData.length>0">
        <div class="hotsinger">
            <div class="header">
                <div class="header-title">热门歌手</div>
                <div class="header-more">更多</div>
            </div>
            <div class="singer-list">
                <template v-for="item in singerData" :key="item.id">
                    <div class="singer-item">
                        <div class="img-wrap">
                            <img class="img-img" :src="item.picUrl" alt="">
                        </div>
                        <div class="name">{{item.name}}</div>
                    </div>
                </template>
            </div>
        </div>

    </div>
</template>

<script>
import {requestHotSingerData} from "../../../server/page_request/home_request"
    export default {
        created() {
            requestHotSingerData().then(res=>{
                this.singerData = res.artists
            })
        },
        data(){
            return {
                singerData:[]
            }
        }
    }
</script>

<style lang="less" scoped>
.hotsinger-wrap {
      background-image: linear-gradient(#FEF9F3, #ffffff);
      .hotsinger {
          width: 1200px;
          margin: 0 auto;
          .header {
              position: relative;
              height: 40px;
              padding: 50px 0 24px 0;
              .header-title {
                  width: 176px;
                  height: 40px;
                  margin: 0 502px;
                  padding-left: 20px;
                  color: #444;
                  font-size: 30px;
                  line-height: 40px;
                  letter-spacing: 13px;
                  text-shadow: 0 0 2px #555;
              }
              .header-more {
                  position: absolute;
                  top: 70px;
                  right: 0px;
                  color: #888;
                  cursor: pointer;
              }
          }
          .singer-list {
              display: flex;
              justify-content: space-between;
              .singer-item {
                  width: 180px;
                  height: 250px;
                  cursor: pointer;
                  .img-wrap {
                      width: 180px;
                      height: 180px;
                      border-radius: 50%;
                      overflow: hidden;
                      .img-img {
                          width: 180px;
                          height: 180px;
                          transform: scale(1);
                          transition: transform 0.5s;
                          &:hover{
                              transform: scale(1.2);
                              
                          }
                      }

                  }
                  .name {
                      text-align: center;
                      margin-top: 20px;
                  }
              }
          }
      }
}
</style>