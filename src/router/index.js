//导入vuerouter
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({ 
    scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    if (savePosition) {
        return savePosition;
    } else {
        var top;
        if (window.innerWidth >= 700) {
             top = 676
        } else {
             top = 267
        }
        return {
            x: 0,
            y: top
        }
    }
},
  
    // 配置路由规则
    routes: [
        {
            path : '/',
            name:'登录页面',
            component:()=>import('../components/login.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/index',
            name:'首页',
            component:()=>import('../page/index.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/news',
            name:'新闻管理',
            component:()=>import('../page/news.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/user',
            name:'用户管理',
            component:()=>import('../page/user.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/disease',
            name:'病例管理',
            component:()=>import('../page/disease.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/doctor',
            name:'医生管理',
            component:()=>import('../page/doctor.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/animal',
            name:'动物托管',
            component:()=>import('../page/animal.vue'),
            meta:{
                requireAuth: true
            }
        },
        {
            path : '/illpet',
            name:'患病宠物',
            component:()=>import('../page/illpet.vue'),
            meta:{
                requireAuth: true
            }
        }
        
        
    ]
    
    
})
