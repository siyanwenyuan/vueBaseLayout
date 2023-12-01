<template>

  <div>
    <el-menu
        style="width: 200px; min-height: 100vh"
        default-active="user"
        default-openeds="[1]"
        class="el-menu-vertical-demo"
    >
        <el-sub-menu index="1">
          <template #title>系统管理</template>
          <el-menu-item index="user" router="{path: '/'}">客户管理</el-menu-item>
        </el-sub-menu>
      <el-menu-item index="data" router="{path: '/'}">数据管理</el-menu-item>

    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Aside"
}
</script>
<style scoped>

</style>
