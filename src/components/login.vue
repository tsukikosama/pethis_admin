<template>
  <div class="mycontent">
    <div id="login_box">
    <h2>登录</h2>
    <div id="input_box">
      <input type="text" v-model="user.username" placeholder="请输入用户名">
    </div>
    <div class="input_box">
      <input type="password" v-model="user.password" placeholder="请输入密码">
    </div>
    <el-button @click="login">登录</el-button>
  </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
    name:'login',
    data(){
      return{
        user:{
          username:'',
          password:''
        }
      }
    },
    methods:{
      login(){
        request.post('/doctor/login',this.user).then((res) =>{
          this.$store.commit('login',res.data)
                this.$message.success("登录成功")
                //存入localstorage
                localStorage.setItem('user',JSON.stringify(res.data));
                this.$router.push({path:'/index'})
        }).catch((e) =>{
          this.$message.error("登录失败");
        })
      }
    }

}
</script>

<style scoped>
    .mycontent{
      
      width: 100%;
      height: 100vh;
      display: flex;
    }
    #login_box {
      width: 20%;
      height: 400px;
      background-color: #70636360;
      margin: auto;
      
      text-align: center;
      border-radius: 10px;
      padding: 50px 50px;
    }

    h2 {
      color: #00000090;
      margin-top: 5%;
    }

    #input-box {
      margin-top: 5%;
    }

    span {
      color: #fff;
    }

    input {
      border: 0;
      width: 60%;
      font-size: 15px;
      color: #fff;
      background: transparent;
      border-bottom: 2px solid #fff;
      padding: 5px 10px;
      outline: none;
      margin-top: 10px;
    }

    .el-button{
      margin: 5%;
    }

    #sign_up {
      margin-top: 45%;
      margin-left: 60%;
    }

    a {
      color: #b94648;
    }
</style>