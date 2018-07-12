import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login/login'
import VisitView from '@/views/visitview/index'
import Admin from '@/views/adminview/admin'
import Data from '@/views/adminview/Data'
import Main from '@/views/visitview/Main'
import Table from '@/views/visitview/Table'
// import User from '@/views/visitview/User'


Vue.use(Router)


export const constantRouterMap = [
  {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      hidden: true
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      hidden: true
    },
    {
      path: '/index',
      name: 'Dashboard',
      component: VisitView,
      iconCls: 'el-icon-document',
      children: [
        { path: '/Dashboard/search', component: Main, name: 'Search' },
        { path: '/Dashboard/table', component: Table, name: 'Table' },
      ],
    }
]

export const adminViewRouter = [
  {
    path: '/admin',
    name: 'Admin',
    component: VisitView,
    iconCls: 'el-icon-message',
    children: [
      { path: '/admin/data', component: Data, name: 'Maintenance' },
    ]
  },
]

export default new Router({
  // mode: 'history',
  routes: constantRouterMap
})