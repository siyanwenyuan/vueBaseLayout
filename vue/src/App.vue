<template>

<div >

<!--根路由 这个路由可以到达下面的所有路由-->
  <router-view />
</div>

</template>
<script>
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
export default {
  name:"App",
}
</script>

<style>

</style>
