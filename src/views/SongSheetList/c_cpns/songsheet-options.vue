<template>
  <div class="songsheet-options-wrap">
    <div class="songsheet-options">
      <div class="all-songsheet" v-if="all.name" @click="clickOption(all.name)">{{ all.name }}</div>
      <div class="option-list">
        <template v-for="(item, i) in categories" :key="item">
          <div class="option-item">
            <div class="item-title">{{ item }}</div>
            <div class="item-content">
              <template v-for="iten in this[`option${i}`]" :key="iten.name">
                <span class="one" @click="clickOption(iten.name)">{{ iten.name }}</span>
              </template>
              <i/><i/><i/>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestSongSheetCategoryData } from "../../../server/page_request/songsheet_request";
import {mapActions} from 'vuex'
export default {
  created() {
    requestSongSheetCategoryData().then((res) => {
      this.all = res.all;
      this.categories = res.categories;
      res.sub.forEach((item) => {
        switch (item.category) {
          case 0:
            this.option0.push(item);
            break;
          case 1:
            this.option1.push(item);
            break;
          case 2:
            this.option2.push(item);
            break;
          case 3:
            this.option3.push(item);
            break;
          case 4:
            this.option4.push(item);
            break;
          default:
            break;
        }
      });
    });
    this.getSongsheetListData(["全部歌单",50,0])
  },
  data() {
    return {
      option0: [],
      option1: [],
      option2: [],
      option3: [],
      option4: [],
      all: {},
      categories: {},
    };
  },
  methods:{
    clickOption(name){
      this.getSongsheetListData([name,50,0])
    },
    ...mapActions(['getSongsheetListData'])
  }
};
</script>

<style lang="less" scoped>
.songsheet-options-wrap {
  .songsheet-options {
    width: 1200px;
    margin: 0 auto;
    .all-songsheet {
      width: 80px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      border-radius: 5px;
      background-color: #f77870;
      margin-bottom: 3px;
      cursor: pointer;
    }
    .option-list {
      display: flex;
      justify-content: space-between;
      .option-item {
        width: 220px;
        .item-title {
          font-size: 16px;
          font-weight: 700;
        }
        .item-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .one {
            width: 70px;
            height: 25px;
            margin: 3px 0;
            font-size: 14px;
            color: #333;
            line-height: 25px;
            text-align: center;
            background-color: #f8f8f8;
            border-radius: 20px;
            cursor: pointer;
            /* 显示一行 */
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            display: -moz-box;
            -moz-line-clamp: 1;
            -moz-box-orient: vertical;
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal;
            overflow: hidden;
            &:hover {
              color: #f77870;
            }
          }
          i{
            width: 70px;
          }
        }
      }
    }
  }
}
</style>
