<template>
    <div class="app-container" >
      <div class="myheader">
         <el-span>{{this.$route.name}}</el-span>
         <el-button class="mybtn" type="primary" @click="add()">添加</el-button>
      </div>
      
       <el-table
      :data="list"
      stripe
    
      style="width:100%"
     >
      
    
      
      <el-table-column
        prop="username"
        label="用户名"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        width="180"
      >
    </el-table-column>
      <el-table-column
        prop="password"
        label="用户密码"
        type="password"
        width="180"
      >
      </el-table-column>
     
     
     
     
      <el-table-column
        prop="phone"
        label="联系电话"
        
       
      >
  
      </el-table-column>
      <el-table-column
       
        label="操作"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button 
            size="mini"
            type="warning"
            
            @click="del(scope.$index,scope.row)">删除</el-button>
          
        </template>
      </el-table-column>
    </el-table>
      
        <div class="pages">
            <el-pagination
            background
            layout="prev, pager, next"
            :page-size="10"

            @current-change="topage"
            :total="all.length">
          </el-pagination>
         
        </div>
  
          <el-dialog title="帖子" class="myform" :visible.sync="dialogFormVisible" center>
              
              <div>
                <el-span>账号:</el-span><el-input v-model="saveitem.username"></el-input>
              </div>
              
              <div>
                <el-span>用户昵称:</el-span><el-input v-model="saveitem.nickname"></el-input>
              </div>
              <div>
                <el-span>用户密码:</el-span><el-input v-model="saveitem.password"></el-input>
              </div>
              
              <div>
                <el-span>手机号:</el-span><el-input v-model="saveitem.phone"></el-input>
              </div>
              
              <div class="dialogfoot">
                 <el-button @click="submit()">提交</el-button>
              </div>
          </el-dialog>
              
    </div>
    
  </template>
  
  <script>
  import request from '@/utils/request'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  export default {
      name:'M_post',
      components: { Editor, Toolbar },
      data() {
      return {
         
        list: {},
        all:{},
        dialogFormVisible: false,
        curr:1,
        flag:false,   
          saveitem:{
              
          },  
          
          
        }
          
    },
    created() {
        this.init();
        this.inittag()
      // this.topage(1)
    },
  //   computed:{
  //       list: function(){
  //           return this.all.slice(this.curr,this.curr+10);
  //       }
  //   },
    watch:{
        curr(n,o){
          this.list = this.all.slice((this.curr-1)*10,(this.curr-1)*10+10);
        },
        all(){
            this.list = this.all.slice((this.curr-1)*10,(this.curr-1)*10+10);
        }, 
    },
    methods: {
      handleCheckedCitiesChange(event) {
        // console.log(event)
      },
      
      
      submit(){
        // var that = this;    
        
        request.post('/user/save',this.saveitem).then((res) =>{
            //判断当前页面是否大于10个 如果小于就添加进当前list
            let s = this.saveitem
            s = JSON.parse(JSON.stringify(s));
            if(!this.flag){
                this.all.push(s);
                this.$message.success("添加成功")
              }else{
                this.$message.success("修改成功")
                this.flag = !this.flag
              }
              this.dialogFormVisible = false
        }).catch((e) =>{
            this.$message.error("添加失败稍后再试");
            this.dialogFormVisible = false
        })
      },
      topage(val){
          this.curr = val;
         request.get('/user/list/'+val).then((res) =>{
          this.list = res.data
        }).catch((e) =>{
            this.$message.error("服务器异常，请稍后再试")
        })
      },
      init(){
          request.get('/user/list').then((res) =>{
              this.all = res.data
              // this.list = this.all.slice(this.curr,10);
          }).catch((e) =>{
  
          })
      },
      handleEdit(index,row){
       //更新
       this.flag = true;
        this.dialogFormVisible = true
        //给对象复制
        this.saveitem = row;
      },
      add(){
        this.clearValue(this.saveitem)
        this.dialogFormVisible = true
        
      },
      del(index,row){
        request.post('/user/remove?id='+row.id).then((res) =>{
            this.$message.success("删除成功");
            this.all = this.removeItem(this.all,row)
        }).catch((e) =>{
            this.$message.error("删除失败,请稍后再试");
        })
      },
       
    },
   
   
  }
  </script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
  <style scoped>
  .pages{
     /* display: flex;
     justify-content: center; */
     padding: 20px;
     /* display: inline-flex; */
     text-align: center;
     
   }
   .myheader{
     display: flex;
     /* width: 83vw !important; */
     /* height: 30px !important; */
     text-align: center;
     justify-content: space-between;
     align-items: center;
     margin: 10px;
   }
   .myheader el-span{
     font-size: 24px;
   }
   
   .myform el-span{
     padding-right: 10px;
     font-size: 24px;
     height: 40px;
     line-height: 40px;
     display: inline-block;
     /* margin: auto; */
     line-height: 40px;
   }
   .myform div{
     /* text-align: center; */
   }
   .myform .el-input{
      width: 300px;
      /* display: block; */
      /* margin: 10px; */
      
      
      /* margin: 10px; */
   }
   .mybtn2{
    display: block;
    text-align: center;
    margin: 0 auto;
    margin-top: 20px ;
   }
   .alltags {
     margin: 5px;
     /* display: flex; */
   }
   .dialogfoot{
    margin: 10px;
    text-align: center;
   }
  </style>