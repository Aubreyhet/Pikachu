
import Router from 'vue-router'
import Index from '../components/rootcmps/index.vue'
import Register from '../components/rootcmps/register.vue'
import NotFound from '../components/rootcmps/404.vue'

export default new Router({
    routes :[
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component : Index
        },
        {
            path: '/register',
            component : Register
        },
        {
            path: '*',
            component : NotFound
        },
    ]
 })