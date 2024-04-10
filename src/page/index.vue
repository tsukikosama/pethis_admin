<template>
  <div>
        <el-container>
            <el-header><Myheader/></el-header>
            <el-container>
                <el-aside width="300px"><Menu/></el-aside>
                <el-main><Main/></el-main>
            </el-container>
        </el-container>
  </div>
</template>

<script>
import Menu from '@/components/menu.vue'
import Myheader from '@/components/myheader.vue'
import Main from '@/components/main.vue'
export default {
  components: { Menu, Myheader, Main },

}
</script>

<style scoped>
     .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    /* line-height: 60px; */
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: calc(100vh - 60px);
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center; */
    line-height: 0px;
    margin: 0px !important;
  }
  
  
</style>