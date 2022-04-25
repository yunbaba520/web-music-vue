<template>
  <div class="singer-wrap">
    <div class="singer">
      <div class="options">
        <div class="options-row">
          <template v-for="item in initialData" :key="item.value">
            <span
              :class="[
                'option',
                selectValue.initial === item.label ? 'select-option' : '',
              ]"
              @click="optionOneClick(item.label)"
              >{{ item.value }}</span
            >
          </template>
        </div>
        <div class="options-row">
          <template v-for="item in typeData" :key="item.value">
            <span
              :class="[
                'option',
                selectValue.type === item.value ? 'select-option' : '',
              ]"
              @click="optionTwoClick(item.value)"
              >{{ item.label }}</span
            >
          </template>
        </div>
        <div class="options-row">
          <template v-for="item in areaData" :key="item.value">
            <span
              :class="[
                'option',
                selectValue.area === item.value ? 'select-option' : '',
              ]"
              @click="optionThreeClick(item.value)"
              >{{ item.label }}</span
            >
          </template>
        </div>
      </div>
      <div class="list">
        <div class="list-row">
          <template v-for="item in singerList.slice(0, 6)" :key="item.id">
            <singer-item :img="item.picUrl" :name="item.name" @imgClick="singerItemClick(item.id)" @nameClick="singerItemClick(item.id)"></singer-item>
          </template>
        </div>
        <div class="list-row">
          <template v-for="item in singerList.slice(6, 12)" :key="item.id">
            <singer-item :img="item.picUrl" :name="item.name" @imgClick="singerItemClick(item.id)" @nameClick="singerItemClick(item.id)"></singer-item>
          </template>
        </div>
        <div class="list-text">
          <template v-for="item in singerList.slice(12, nowLength)" :key="item.id">
            <span class="singer-i" @click="singerItemClick(item.id)">{{ item.name }}</span>
          </template>
        </div>
      </div>
      <div><span v-if="more">已加载{{nowLength}}位歌手</span><span v-else>共{{nowLength}}位歌手</span></div>
    </div>
  </div>
</template>

<script>
import SingerItem from "@/components/singer-item.vue";
import { requestSingerList } from "@/server/page_request/singer_request";
import { initialData, typeData, areaData } from "./data";
export default {
  data() {
    return {
      initialData,
      typeData,
      areaData,
      selectValue: {
        type: -1,
        area: -1,
        initial: -1,
      },
      singerList: [],
      nowLength:0,//list数组里有多少歌手
      more: false, //下拉加载更多
      offset: 0, //第几次加载，偏移量
    };
  },
  created() {
    this.getData()
    console.log(this.singerList);
  },
  mounted() {
    // 监听页面滚动
    window.onscroll = this.pageScroll;
  },
  methods: {
    getData() {
      let newOffset = this.offset * 72;
      requestSingerList(this.selectValue, 72, newOffset).then((res) => {
        // this.singerList = [...this.singerList,...res.artists]
        this.singerList.push(...res.artists)
        this.more = res.more;
        this.nowLength = this.singerList.length
      });
    },
    optionOneClick(label) {
      if(this.selectValue.initial === label)return
      this.selectValue.initial = label;
      this.initData()
      this.getData()
    },
    optionTwoClick(value) {
      if(this.selectValue.type === value)return
      this.selectValue.type = value;
      this.initData()
      this.getData()
    },
    optionThreeClick(value) {
      if(this.selectValue.area === value)return
      this.selectValue.area = value;
      this.initData()
      this.getData()
    },
    pageScroll() {
      // 获取滚动的距离
      let scrollTop = document.documentElement.scrollTop;
      // 获取滚动的高度（获取整个html的高度）
      let scrollHeight = document.documentElement.scrollHeight;
      // 获取屏幕(浏览器)高度
      let clienHeight = document.documentElement.clientHeight;
      if (scrollTop + clienHeight >= scrollHeight) {
        if (this.more) {
            this.offset++
            this.getData()
        }
      }
    },
    //初始化数据
    initData() {
      this.singerList = []
      this.nowLength = 0
      this.more =false
      this.offset = 0
    },
    singerItemClick(id) {
      this.$router.push({
        path:'singerDetail',
        query:{
          id
        }
      })
    }
  },
  components: {
    SingerItem,
  },
};
</script>

<style lang="less" scoped>
.singer-wrap {
  .singer {
    width: 1200px;
    margin: 0 auto;
    .options {
      color: #888;
      .options-row {
        margin-top: 20px;
        display: flex;
        .option {
          padding: 0 15px;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          cursor: pointer;
          &:hover {
            color: #f77870;
          }
        }
        .select-option {
          color: #fff;
          background-color: #f77870;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .list {
      min-height: 319px;
      margin-top: 30px;
      .list-row {
        display: flex;
        justify-content: space-between;
      }
      .list-text {
        display: flex;
        flex-wrap: wrap;
        .singer-i {
          width: 200px;
          margin: 15px 0;
          text-align: center;
          cursor: pointer;
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
      }
    }
  }
}
</style>
