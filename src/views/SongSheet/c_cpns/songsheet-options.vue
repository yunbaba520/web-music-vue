<template>
  <div class="songsheet-options-wrap">
    <div class="songsheet-options">
      <div>{{ all.name }}</div>
      <div class="option-list">
        <template v-for="(item, i) in categories" :key="item">
          <div class="option-item">
            <div class="item-title">{{ item }}</div>
            <div class="item-content">
              <template v-for="iten in this[`option${i}`]" :key="iten.name">
                <span class="one">{{ iten.name }}</span>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { requestSongSheetCategoryData } from "../../../server/page_request/songsheet_request";

export default {
  created() {
    requestSongSheetCategoryData().then((res) => {
      console.log(res);
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
};
</script>

<style lang="less" scoped>
.songsheet-options-wrap {
  .songsheet-options {
    width: 1200px;
    margin: 0 auto;
    .option-list {
      display: flex;
      justify-content: space-between;
      .option-item {
        width: 220px;
        // .item-title {
        // }
        .item-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .one {
            width: 70px;
            height: 25px;
            margin: 3px 0;
            line-height: 25px;
            text-align: center;
            background-color: #ddd;
            border-radius: 20px;
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
          }
        }
      }
    }
  }
}
</style>
