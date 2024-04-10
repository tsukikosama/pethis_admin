<template>
  <div class="mycontent">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :default-active="this.$route.path"
      :router="true"
      active-text-color="#ffd04b">
      <el-menu-item index="/disease">
        <i class="el-icon-menu"></i>
        <span slot="title">病证管理</span>
      </el-menu-item>
      
      <el-menu-item index="/news">
        <i class="el-icon-menu"></i>
        <span slot="title">新闻管理</span>
      </el-menu-item>
      <el-menu-item index="/user" >
        <i class="el-icon-document"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/doctor">
        <i class="el-icon-setting"></i>
        <span slot="title">医生管理</span>
      </el-menu-item>
      <el-menu-item index="/animal">
        <i class="el-icon-setting"></i>
        <span slot="title">动物托管</span>
      </el-menu-item>
      <el-menu-item index="/illpet">
        <i class="el-icon-setting"></i>
        <span slot="title">患病宠物</span>
      </el-menu-item>
      <el-menu-item index="/trust">
        <i class="el-icon-setting"></i>
        <span slot="title">患病宠物</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<style scoped>
    .el-menu{
        height: calc(100vh - 60px);
        width: 300px;
        border: 0px;
    }
</style>