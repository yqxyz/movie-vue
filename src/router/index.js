import Vue from 'vue'
import Router from 'vue-router'
import MList from '@/components/m-list'
import MRec from '@/components/m-rec'
import MAdd from '@/components/m-add'
import MInfo from '@/components/m-info'
import Login from '@/components/login'
import Sign from '@/components/sign'
import Logout from '@/components/logout'
import Api from '@/components/api'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'MList', component: MList },
    { path: '/movie/add', name: 'MAdd', component: MAdd },
    { path: '/movie/rec', name: 'MRec', component: MRec },
    { path: '/movie/:id', name: 'MInfo', component: MInfo },
    { path: '/login', name: 'Login', component: Login },
    { path: '/sign', name: 'Sign', component: Sign },
    { path: '/logout', name: 'Logout', component: Logout },
    { path: '/api', name: 'Api', component: Api }
  ]
})
