
<template>

  <div style="width: 100%; height: 100vh;background-color: lightseagreen;overflow: hidden">

    <div style="width: 400px; margin: 100px auto">

      <div style="color: black;font-size: 30px; text-align: center;padding: 30px 0">欢迎注册厦门亮洁彩</div>

      <el-form ref="form" :model="form"  :rules="rules" size="normal">
        <el-form-item prop="username">
          <el-input  :prefix-icon="User" v-model="form.username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input   :prefix-icon="Hide" v-model="form.password" show-password />
        </el-form-item>

        <el-form-item prop="confirm">
          <el-input   :prefix-icon="Hide" v-model="form.confirm" show-password />
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%; font-weight: bold" type="primary" @click="register" >注册</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>


<script>
import {Search, User, Lock, Hide} from "@element-plus/icons-vue";
import request from "@/utils/request";

export default {
  name: "Register",
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
      form: {},
      //此处进行表单校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        confirm: [
          { required: true, message: '请确认密码', trigger: 'blur' },
        ],
      }
    }

  },
  methods:{
    register() {



          if (this.form.password !== this.form.confirm) {
            this.$message({
              type: "error",
              message: "两次输入的密码不一致，请重新输入"
            })
            return
          }
          //在发送请求之前，先进性一个验证
      this.$refs['form'].validate((valid)=>{
        if(valid){

          request.post("/user/register", this.form).then(res => {
            if (res.code === '0') {
              this.$message({
                type: "success",
                message: "注册成功"
              })
              this.$router.push("/login");//登录成功之后进行页面跳转，跳转到主页
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
