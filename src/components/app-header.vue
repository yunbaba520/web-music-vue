<template>
  <div class="header-wrap">
    <div class="app-header">
      <div class="logo">
        <img class="logo-img" src="../assets/img/logo.webp" alt="" />
        <span>218音乐网</span>
      </div>
      <div class="nav-list">
        <template v-for="item of headerLinks" :key="item.link">
          <router-link :to="item.link" custom v-slot="props">
            <div
              :class="{ active: props.isActive, 'nav-item': true }"
              @click="props.navigate"
            >
              {{ item.title }}
            </div>
          </router-link>
        </template>
      </div>
      <div class="nav-input">
        <el-input v-model="inputValue" placeholder="Type something">
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="nav-login">登录</div>
    </div>
  </div>
</template>

<script>
import { headerLinks } from "../common/local-data";
import { Search } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      headerLinks,
      inputValue: "",
    };
  },
  components: {
    Search,
  },
};
</script>

<style lang="less" scoped>
.header-wrap {
  background-color: #f6f6f6;
  border-bottom: 5px solid #f77870;
}
.app-header {
  display: flex;
  width: 1200px;
  height: 90px;
  margin: 0 auto;
  .logo {
    font-size: 24px;
    font-weight: 700;
    margin-right: 20px;
    .logo-img {
      width: 65px;
      height: 60px;
      margin: 15px 5px;
      vertical-align: middle;
    }
  }
  .nav-list {
    display: flex;
    .nav-item {
      height: 90px;
      padding: 0 30px;
      font-size: 18px;
      line-height: 90px;
      color: #000;
      cursor: pointer;
      &:hover{
        color: #f77870;
      }
    }
    .active {
      color: #fff;
      background-color: #f77870;
      border-bottom: 5px solid #FFBE66;
      &:hover {
        color: #fff;
      }
    }
  }
  .nav-input {
      line-height: 90px;
      margin: 0 20px 0 150px;
  }
  .nav-login {
    font-size: 18px;
    line-height: 90px;
    cursor: pointer;
    &:hover{
        color: #f77870;
    }
  }

}
</style>
