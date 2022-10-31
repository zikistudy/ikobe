import { createRouter, createWebHashHistory } from "vue-router";
const Home = ()=> import('../views/Home/index.vue');
const Review = ()=> import('../views/Review/index.vue');
const LeaveMessage = ()=> import('../views/LeaveMessage/index.vue');
const About = ()=> import('../views/About/index.vue');
const Record = ()=> import('../views/Record/index.vue');
const Login = ()=> import('../views/Login/index.vue');
const Total = ()=> import('../views/Total/index.vue');
const Face = ()=> import('../views/Face/index.vue');
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      navbarTitle: '主页',
      isNavbar:true
    }
  },
  {
    path: '/LeaveMessage',
    name: 'LeaveMessage',
    component: LeaveMessage,
    meta: {
      navbarTitle: '留言',
      isNavbar:true,
    }
  },
  {
    path: '/Review',
    name: 'Review',
    component: Review,
    meta: {
      navbarTitle: '回顾',
      isNavbar:true
    }
  },
  {
    path: '/Record',
    name: 'Record',
    component: Record,
    meta: {
      navbarTitle: '视频',
      isNavbar:true
    }
  },
  {
    path: '/Total',
    name: 'Total',
    component: Total,
    meta: {
      navbarTitle: '统计',
      isNavbar:true
    }
  },
  {
    path: '/About',
    name: 'About',
    component: About,
    meta: {
      navbarTitle: '关于',
      isNavbar:true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta:{
      hideNavbar:true
    }
  },
  {
    path: '/Face',
    name: 'Face',
    component: Face,
    meta:{
      hideNavbar:true
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 页面跳转回到顶部
router.afterEach(()=>{
  window.scrollTo(0,0);
})
export default router;
