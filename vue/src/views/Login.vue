
<template>

  <div style="width: 100%; height: 100vh;background-color: lightseagreen;overflow: hidden">

    <div style="width: 400px; margin: 100px auto">

      <div style="color: black;font-size: 30px; text-align: center;padding: 30px 0">欢迎使用厦门亮洁彩</div>

      <el-form ref="form" :model="form" :rules="rules" size="normal">
        <el-form-item prop="username">
          <el-input  :prefix-icon="User" v-model="form.username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input   :prefix-icon="Hide" v-model="form.password" show-password />
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%; font-weight: bold" type="primary" @click="login" >登录</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>


<script>
import {Search, User, Hide} from "@element-plus/icons-vue";
import request from "@/utils/request";

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
      //此处将form定义成一个对象
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }

  },
  methods:{
    login(){

      //提前进行表单验证，
      this.$refs['form'].validate((valid) => {
        if (valid) {
          request.post("/user/login",this.form).then(res=> {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "登录成功"
              })
              this.$router.push("/");//登录成功之后进行页面跳转，跳转到主页
            } else {
              this.$message({
                type: "error",
                message: res.msg
              })
            }
          })
        }
      })

    }
  }
}

</script>



<style scoped>

</style>
