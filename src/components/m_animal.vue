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
      prop="name"
      label="宠物名"
      show-overflow-tooltip
      width="150">
    </el-table-column>
 
    <el-table-column
      prop="age"
      label="年龄"
      type="password"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"   
      width="150"
    >
    </el-table-column>
    <el-table-column
      prop="starttime"
      label="开始时间"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="endtime"
      label="结束时间"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系电话"
      width="150"
    >
    </el-table-column>
    <el-table-column
      prop="address"
      label="住址"
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
        <el-dialog title="托管信息" class="myform" :visible.sync="dialogFormVisible" center>
            
            <div>
              <el-span>宠物:</el-span><el-input v-model="saveitem.name"></el-input>
            </div>
            
            <div>
              <el-span>年龄:</el-span><el-input v-model="saveitem.age"></el-input>
            </div>
            <div>
              <el-span>类型:</el-span>
              <el-select
                v-model="saveitem.checkType"
                
                filterable
                allow-create
                default-first-option
                placeholder="选择动物类型">
                <el-option
                  v-for="item in pettype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
            <div>
              <el-span>电话:</el-span><el-input v-model="saveitem.phone"></el-input>
            </div>
            <div>
              <el-span>住址:</el-span><el-input v-model="saveitem.address"></el-input>
            </div>
            <div class="block">
              <el-span class="demonstration">默认:</el-span>
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
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
            id:'',
            name: '',
            type:'',
            age:0,
            address:'',
            phone: '',
            starttime:'',
            endtime:'',
            
        },  
        pettype:[],
        checkType:"请选择",
        value1:[]
        
        
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
  
    
   
    submit(){
      this.saveitem.starttime = this.value1[0]
      this.saveitem.endtime = this.value1[1]
      this.saveitem.type = this.checkType;
      request.post('/animal/add',this.saveitem).then((res) =>{
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
       request.get('/doctor/list/'+val).then((res) =>{
        this.list = res.data
      }).catch((e) =>{
          this.$message.error("服务器异常，请稍后再试")
      })
    },
    init(){
        request.get('/animal/list').then((res) =>{
            this.all = res.data
            // this.list = this.all.slice(this.curr,10);
        }).catch((e) =>{

        }),
        request.get('/pettype/list').then((res) =>{
          this.pettype = res.data
        }).catch((e) =>{

        })
    },
    handleEdit(index,row){
     //更新
     this.flag = true;
      this.dialogFormVisible = true
      //给对象复制
      this.saveitem = row;
      this.$set(this.value1,0,row.starttime)
      this.$set(this.value1,1,row.endtime)
      // this.value1[0] = row.starttime
      // this.value1[1] = row.endtime
      // for(const i =)
      const e = this.pettype.find(e => e.name === row.type);
      this.saveitem.checkType = e
      
      // this.saveitem.type = 
      
    },
    add(){
      this.clearValue(this.saveitem)
      this.dialogFormVisible = true
      
    },
    del(index,row){
    
      
      request.post('/animal/remove?id='+row.id).then((res) =>{
          this.$message.success("删除成功");
          console.log(this.list)
          this.all = this.removeItem(this.all,row)
          console.log("666")
          console.log(this.all)
      }).catch((e) =>{
          // this.$message.error("删除失败,请稍后再试");
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
    width: 200px;
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