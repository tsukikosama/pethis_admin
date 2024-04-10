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
        prop="petname"
        label="宠物名"
      
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机"
        width="180"
      >
    </el-table-column>
      <el-table-column
        
        label="状态"
        width="150"
      >
      <template slot-scope="scope">
        <el-span v-if="scope.row.state == 0">待治疗</el-span>
        <el-span v-else-if="scope.row.state == 1">治疗中</el-span>
        <el-span v-else>完成治疗</el-span>
      </template>
      </el-table-column>
      <el-table-column
        prop="illname"
        label="病名"   
        width="150"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
          <el-button 
            size="mini"
            type="warning"
            @click="del(scope.$index,scope.row)">删除订单</el-button>
            <el-button
            size="mini"
            @click="heal(scope.$index, scope.row)">送去治疗</el-button>
          
            <el-button
            size="mini"
            @click="complete(scope.$index, scope.row)">治疗完成</el-button>
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
  
          <el-dialog title="病患" class="myform" :visible.sync="dialogFormVisible" center>
              
              <div>
                <el-span>宠物名:</el-span><el-input v-model="saveitem.petname"></el-input>
              </div>
              <div>
                <el-span>邮箱:</el-span><el-input v-model="saveitem.email"></el-input>
              </div>
              <div>
                <el-span>手机号:</el-span><el-input type="number" v-model="saveitem.phone"></el-input>
              </div>
              <div>
                <el-span>病名:</el-span><el-input v-model="saveitem.illname"></el-input>
              </div>
              <div>
                <el-span>状态:</el-span> <el-select v-model="saveitem.state" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
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
        options: [{
          value: '待治疗',
          label: '待治疗'
        }, {
          value: '治疗中',
          label: '治疗中'
        }, {
          value: '治疗结束',
          label: '治疗结束'
        },],
        value: '',
          saveitem:{
              petname: '',
              email: '',
              phone: '',
              state : '',
              illname : 0,
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
        
        request.post('/illpet/save',this.saveitem).then((res) =>{
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
         request.get('/illpet/list/'+val).then((res) =>{
          this.list = res.data
        }).catch((e) =>{
            this.$message.error("服务器异常，请稍后再试")
        })
      },
      init(){
          request.get('/illpet/list').then((res) =>{
              this.all = res.data
              // this.list = this.all.slice(this.curr,10);
          }).catch((e) =>{
  
          })
      },
      heal(index,row){
        console.log("治疗")
      },
      complete(index,row){
        console.log("治疗完成")
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
        console.log(row)
        request.post('/illpet/remove?id='+row.id).then((res) =>{
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