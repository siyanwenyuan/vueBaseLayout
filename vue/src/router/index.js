import { createRouter, createWebHistory } from 'vue-router'
import Layout from "@/layout/Layout.vue";

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: "home",  //路由重定向，当访问/时，自动跳转到home
    //子菜单的路由
    children: [
      {
        path: 'home',
        name: 'Home',
        //引入对应的界面
        component: ()=>import("@/views/Home.vue")
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    //此处导入Login登录界面
    component: ()=>import("@/views/Login.vue")
  },

  {
    path: '/register',
    name: 'Register',
    //此处导入Login登录界面
    component: ()=>import("@/views/Register.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
