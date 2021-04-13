import Vue from 'vue'
import VueRouter from 'vue-router'


//导入登录注册组件
//父组件
import Index from '../src/components/index.vue'
//登录注册子组件
import Login from '../src/components/index/login.vue'
import Signup from '../src/components/index/signup.vue'

//导入home组件
import Home from '../src/components/home.vue'
//导入home下的其他子组件
import Hello from '../src/components/home/HelloWorld.vue'
import Setting from '../src/components/home/setting.vue'

//配置路由
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path: '/',
            component: Index,
            redirect: '/login',
            children: [
                {
                    path: '/login',
                    component: Login
                },
                {
                    path: '/signup',
                    component: Signup
                }
            ]
        },
        {
            path: '/home',
            component: Home,
            redirect: '/hello',
            children:[
                {
                    path: '/hello',
                    component: Hello
                },
                {
                    path: '/setting',
                    component: Setting
                }
            ]
        }
    ]
})

export default router