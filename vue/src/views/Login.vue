
<template>

  <div style="width: 100%; height: 100vh;background-color: lightseagreen;overflow: hidden">

    <div style="width: 400px; margin: 100px auto">

      <div style="color: black;font-size: 30px; text-align: center;padding: 30px 0">欢迎使用厦门亮洁彩</div>

      <el-form ref="form" :model="form" size="normal">
        <el-form-item>
          <el-input  :prefix-icon="User" v-model="form.username" />
        </el-form-item>

        <el-form-item>
          <el-input   :prefix-icon="Hide" v-model="form.username" />
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%;" type="primary" >登录</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>


<script>
import {Search, User, Lock, Hide} from "@element-plus/icons-vue";

export default {
  name: "Login",
  computed: {
    Hide() {
      return Hide
    },
    User() {
      return User
    },
    Search() {
      return Search
    }
  },
  data(){
    return {
      //此处将from定义成一个对象
      form: {}
    }

  }
}
</script>



<style scoped>

</style>
