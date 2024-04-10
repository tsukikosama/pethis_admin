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
        prop="diseaseName"
        label="病名"
        width="180">
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
  
          <el-dialog title="病名" class="myform" :visible.sync="dialogFormVisible">
              <!-- wangedit -->
                <el-span>病名:</el-span><el-input placeholder="病名" v-model="disease.diseaseName" ></el-input>&emsp;&emsp;
               
              <el-button @click="submit()">提交</el-button>
          </el-dialog>
              
    </div>
    
  </template>
  
  <script>
  import request from '@/utils/request'
  
  // import Vue from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  export default {
     components: { Editor, Toolbar },
      data() {
      return {
        list: {},
        all:{},
        dialogFormVisible: false,
        curr:1,  
        disease:{
          diseaseName:'' 
        },
        flag:false
         }          
    },
    created() {
        this.init();
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
        all(n,o){
          console.log(n)
          console.log(o)
            this.list = this.all.slice((this.curr-1)*10,(this.curr-1)*10+10);
        }
    },
    methods: {     
      submit(){
        // var that = this;
        request.post('/disease/add',this.disease).then((res) =>{
          // this.$message.success("33")
            //判断当前页面是否大于10个 如果小于就添加进当前list  
            let s = this.disease
            s = JSON.parse(JSON.stringify(s));         
              // this.$message.success("999")
              //如果是修改就走else
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
          request.get('/disease/'+val).then((res) =>{
          this.list = res.data
        }).catch((e) =>{
            this.$message.error("服务器异常，请稍后再试")
        })
      },
      init(){
          request.get('/disease/list').then((res) =>{
              this.all = res.data
              // this.list = this.all.slice(this.curr,10);
          }).catch((e) =>{
  
          })
      },
      handleEdit(index,row){
       //更新   
        this.dialogFormVisible = true
        //给对象复制
        // console.log(index)
        this.disease = row;
        this.flag = true;
        // this.all[index] = this.savenews;
      },
      add(){
        this.clearValue(this.disease)
        this.dialogFormVisible = true
        
      },
      del(index,row){
      //   console.log((this.curr-1)*10+index)
        
        request.post('/disease/remove?id='+row.id).then((res) =>{
            this.$message.success("删除成功");
            
            this.all  = this.removeItem(this.all,row)
        }).catch((e) =>{
            // this.$message.error("删除失败,请稍后再试");
        })
      },
  
       
          
       
  
         
    },
    
  }
  </script>

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
     margin: auto;
     line-height: 40px;
   }
   .myform div{
     /* text-align: center; */
   }
   .myform .el-input{
      width: 300px;
      /* display: block; */
      /* margin: 10px; */
      
      margin: 20px auto;
      /* margin: 10px; */
   }
   .mybtn2{
      display: block;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px ;
     }
  </style>