<template>
    <div>
          <el-container>
              <el-header><Myheader/></el-header>
              <el-container>
                  <el-aside ><Menu/></el-aside>
                  <el-main><Doctor/></el-main>
              </el-container>
          </el-container>
    </div>
  </template>
  
  <script>
  import Menu from '@/components/menu.vue'
  import Myheader from '@/components/myheader.vue'

import Doctor from '@/components/doctor.vue';
  export default {
    components: { Menu, Myheader,   Doctor },
  
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
      text-align: center;
      line-height: 0px;
      height: calc(100vh - 60px);
      margin: 0px;
      padding: 0px;
      /* box-sizing:none; */
    }
    
    body > .el-container {
      margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }
  </style>