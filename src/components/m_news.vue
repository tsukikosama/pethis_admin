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
        prop="title"
        label="标题"
        class ="mycon"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      
      <el-table-column
        prop="subtitle"
        label="小标题"
        show-overflow-tooltip
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="180"
        
      >
    </el-table-column>
      <el-table-column
        prop="newtype"
        label="类型"
        
        width="180"
      >
      
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="发布时间"
        
        width="180"
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
          <el-dialog title="帖子" class="myform" :visible.sync="dialogFormVisible" center="">
              <div>
                <el-span>标题:</el-span><el-input type="text" v-model="saveitem.title" ></el-input>
              </div>
              <div>
                <el-span>小标题:</el-span><el-input type="text" v-model="saveitem.subtitle" ></el-input>
              </div>
              <div>
                <el-span>新闻图片:</el-span><el-input type="text" v-model="saveitem.image" ></el-input>
              </div>
              <div class="alltags">      
                <el-span>新闻类型</el-span> 
                <el-select v-model="saveitem.value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.typeName"
                    :typeid="item.id">
                  </el-option>
                </el-select>
              </div>
              <!-- wangedit -->
              <div style="border: 1px solid #ccc;">
                  <Toolbar
                      style="border-bottom: 1px solid #ccc"
                      :editor="editor"
                      :defaultConfig="toolbarConfig"
                      :mode="mode"
                  />
                  <Editor
                      style="height: 500px; overflow-y: hidden;"
                      v-model="saveitem.content"
                      :defaultConfig="editorConfig"
                      :mode="mode"
                      @onCreated="onCreated"
                  />

              </div>
              <div class="dialogfoot">
                 <el-button @click="submit">提交</el-button>
              </div>
          </el-dialog>
              
    </div>
    
  </template>
  
  <script>
  import request from '@/utils/request'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  export default {
      name:'news',
      components: { Editor, Toolbar },
      data() {
      return {
          editor: null,
            html: '<p>hello</p>',
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        list: {},
        all:{},
        dialogFormVisible: false,
        curr:1,
        flag:false,
          
          
          saveitem:{
              title:'',
              content:'',
              // tag:'',
              typeid: ''
          },  
          options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        
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
     
      onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },     
      submit(){
       
       
        request.post('/news/add',this.saveitem).then((res) =>{
            //判断当前页面是否大于10个 如果小于就添加进当前list
            let s = this.saveitem
            s = JSON.parse(JSON.stringify(s));
        
           
            this.dialogFormVisible = false
            

            if(!this.flag){
                this.all.push(s);
                
                this.$message.success("添加成功")
              }else{
                this.$message.success("修改成功")
                this.flag = !this.flag
              }
        }).catch((e) =>{
            this.$message.error("添加失败稍后再试");
            this.dialogFormVisible = false
        })
      },
      topage(val){
          this.curr = val;
         request.get('/news/'+val).then((res) =>{
          this.list = res.data
        }).catch((e) =>{
            this.$message.error("服务器异常，请稍后再试")
        })
      },
      init(){
          request.get('/news/list').then((res) =>{
              this.all = res.data
              
              // this.list = this.all.slice(this.curr,10);
          }).catch((e) =>{
  
          })
          request.get('/newtype/list').then((res) =>{
              this.options = res.data
          }).catch((e) =>{

          })
          console.log(66)
      },
      handleEdit(index,row){
       //更新
        
        this.dialogFormVisible = true
        //给对象复制
        this.flag = true;
        this.saveitem = row;
      },
      add(){
        this.clearValue(this.saveitem)
        this.dialogFormVisible = true
        
      },
      del(index,row){
      //   console.log((this.curr-1)*10+index)
        
        request.post('/news/remove?id='+row.id).then((res) =>{
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
      
      margin: 20px auto;
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