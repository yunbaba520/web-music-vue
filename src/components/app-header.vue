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
        <el-input v-model="inputValue" placeholder="搜索音乐" @change="handlerInputChange">
          <template #suffix>
            <el-icon class="el-input__icon"><search /></el-icon>
          </template>
        </el-input>
      </div>
      <div class="nav-login" v-if="!isLogin"  @click="dialogFormVisible = true">登录</div>
      <div class="login-info" v-else> <el-avatar :size="50" :src="loginInfo.profile.avatarUrl" /></div>
      
    </div>

    <el-dialog v-model="dialogFormVisible" title="登录" width="30%" draggable>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="手机登录" name="phone">
          <el-form
            :model="formPhone"
            label-width="70px"
            :rules="rulesPhone"
            ref="formRefPhone"
          >
            <el-form-item label="手机号" prop="name">
              <el-input v-model="formPhone.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formPhone.password"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="resetPhone">重置</el-button>
              <el-button type="primary" @click="submitPhone"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱登录" name="emil">
          <el-form
            :model="formEmil"
            label-width="70px"
            :rules="rulesEmil"
            ref="formRefEmil"
          >
            <el-form-item label="邮箱" prop="name">
              <el-input v-model="formEmil.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formEmil.password"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="resetEmil">重置</el-button>
              <el-button type="primary" @click="submitEmil"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
import { headerLinks } from "../common/local-data";
import { mapState, mapActions,mapMutations } from "vuex";

export default {
  data() {
    return {
      headerLinks,
      inputValue: "",
      inputSearchData:[],
      dialogFormVisible: false,
      activeName: "phone",
      formPhone: {
        name: "13460787646",
        password: "1224251X",
      },
      rulesPhone: {
        name: [
          { required: true, message: "请输入你的手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入你的密码", trigger: "blur" },
        ],
      },
      formEmil:{
        name: "zhao13460787646@163.com",
        password: "1224251X",
      },
      rulesEmil: {
        name: [
          { required: true, message: "请输入你的邮箱", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入你的密码", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const infoStr =  localStorage.getItem("musicLoginInfo")
    const loginInfoByLocal = JSON.parse(infoStr)
    if (loginInfoByLocal) {
      this.changeLoginInfo(loginInfoByLocal)
    }
  },
  computed:{
    ...mapState(["loginInfo","isLogin"])
  },
  components: {
    Search,
  },
  methods: {
    submitPhone() {
     this.$refs.formRefPhone.validate((valid, fields) => {
        if (valid) {
          this.getLoginInfoByPhone([this.formPhone.name,this.formPhone.password])
          this.dialogFormVisible = false
          this.resetPhone()
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    submitEmil() {
      this.$refs.formRefEmil.validate((valid, fields) => {
        if (valid) {
          this.getLoginInfoByEmail([this.formEmil.name,this.formEmil.password])
          this.dialogFormVisible = false
          this.resetEmil()
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    resetPhone() {
      this.$refs.formRefPhone.resetFields()
    },
    resetEmil() {
      this.$refs.formRefEmil.resetFields()
    },
    handlerInputChange() {
      this.$router.push({
        path:"/layout/search",
        query:{
          keyword:this.inputValue
        }
      })
    },
    ...mapActions(["getLoginInfoByPhone","getLoginInfoByEmail"]),
    ...mapMutations(["changeLoginInfo"])
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
      &:hover {
        color: #f77870;
      }
    }
    .active {
      color: #fff;
      background-color: #f77870;
      border-bottom: 5px solid #ffbe66;
      &:hover {
        color: #fff;
      }
    }
  }
  .nav-input {
    line-height: 90px;
    margin: 0 20px 0 50px;
  }
  .nav-login {
    font-size: 18px;
    line-height: 90px;
    cursor: pointer;
    &:hover {
      color: #f77870;
    }
  }
  .login-info {
    display: flex;
    align-content: center;
    .el-avatar {
      margin: 20px 10px;
      cursor: pointer;
    }
    .name {
      height: 30px;
      margin: 30px 0;
      cursor: pointer;
      &:hover {
        color: #f77870;
        text-decoration: underline;
      }
    }
  }
}
::v-deep .el-dialog__body {
  padding: 0 10px;
}
</style>
