<template>
  <div id="app" ref="box" v-if="isPhone">
    <div class="overlay" v-show="isShow"></div>
    <nav
      class="navbar navbar-inverse navbar-fixed-top"
      id="sidebar-wrapper"
      role="navigation"
      v-if="!this.$route.meta.hideNavbar"
    >
      <ul class="nav sidebar-nav" v-if="!this.$route.meta.hideNavbar">
        <li class="sidebar-header">Menu</li>
        <li
          class="sidebar-brand"
          v-for="(item, index) in navbarlist"
          :key="index"
        >
          <router-link :to="item.path" class="nav__item-text" @click="closeBtn">
            {{ item.meta.navbarTitle }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div id="page-content-wrapper" v-if="!this.$route.meta.hideNavbar">
      <button
        type="button"
        ref="btn"
        class="hamburger is-closed animated fadeInLeft"
        @click="handelMenuBtn"
      >
        <span class="hamb-top"></span>
        <span class="hamb-middle"></span>
        <span class="hamb-bottom"></span>
      </button>
    </div>
    <router-view></router-view>
    <el-backtop :right="100" :bottom="100" />
    <!-- <el-backtop></el-backtop> -->
  </div>
  <div id="phone" v-else>
    <h1>移动端待开发,请从电脑端打开</h1>
  </div>
</template>
<script>
import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  watchEffect,
  ref,
  reactive,
} from "vue";
export default {
  setup() {
    onMounted(()=>{
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      console.log(flag)
      flag == null?isPhone.value =true:isPhone.value = false
      // 禁用右键和f12
      // if (process.env.VUE_APP_ENV) {
      //   document.onkeydown = function (e) {
      //     if (e && e.keyCode === 123) {
      //       e.returnValue = false
      //       return ElMessage({
      //           showClose: true,
      //           message: '作者已关闭调试工具！',
      //           type: 'warning',
      //       })
      //     }
      //   }
      //   document.oncontextmenu = function(){
      //     ElMessage({
      //           showClose: true,
      //           message: '作者已关闭右键功能！',
      //           type: 'warning',
      //       })
      //       return false
      //   }
      //   }
    })
    const isShow = ref(false);
    const btn = ref();
    const box = ref();
    const isPhone = ref(true)
    let handelMenuBtn = () => {
      if (isShow.value == true) {
        isShow.value = false;
        btn.value.className = "hamburger is-closed animated fadeInLeft";
        box.value.className = "";
        move();
      } else {
        isShow.value = true;
        console.log(btn.value.className);
        btn.value.className = "hamburger is-open animated fadeInLeft";
        box.value.className = "toggled";
        stop();
      }
    };
    let closeBtn =()=>{
      if(isShow.value == true){
         isShow.value = false;
        btn.value.className = "hamburger is-closed animated fadeInLeft";
        box.value.className = "";
        move();
      }
    }
    let stop = () => {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    };
    let move = () => {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    };
    return {
      isShow,
      btn,
      box,
      isPhone,
      handelMenuBtn,
      stop,
      closeBtn,
    };
  },
  computed: {
    navbarlist() {
      const navbar = this.$router.options.routes.filter((val) => {
        return val?.meta?.isNavbar;
      });
      return navbar;
    },
  },
};
</script>
<style lang="less">
#app{
  height: 100%;
}
body {
  position: relative;
  overflow-x: hidden;
}
body,
html {
  height: 100%;
  margin: 0;
  // background-color: #583e7e;
}
html::-webkit-scrollbar {
  width: 1px;
  /*height: 4px;*/
}
html::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
html::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
.nav .open > a {
  background-color: transparent;
}
.nav .open > a:hover {
  background-color: transparent;
}
.nav .open > a:focus {
  background-color: transparent;
}
/*-------------------------------*/
/*           Wrappers            */
/*-------------------------------*/
#app {
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  padding-left: 0;
  transition: all 0.5s ease;
  .toggled {
    padding-left: 220px;
    #sidebar-wrapper {
      width: 220px;
      #page-content-wrapper {
        margin-right: -220px;
        position: absolute;
      }
    }
  }
}
.router-link-active {
  background-color: #8a6cb6;
}
#sidebar-wrapper {
  position: fixed;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  background: #1a1a1a;
  height: 100%;
  left: 220px;
  margin-left: -220px;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 0.5s ease;
  width: 0;
  z-index: 1000;
}
#sidebar-wrapper::-webkit-scrollbar {
  display: none;
}
#page-content-wrapper {
  // padding-top: 70px;
  width: 100%;
}
/*-------------------------------*/
/*     Sidebar nav styles        */
/*-------------------------------*/
.sidebar-nav {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  width: 220px;
}
// .sidebar-header:hover{
//   background-color: #1c1c1c;
// }
.sidebar-nav li {
  display: inline-block;
  line-height: 20px;
  position: relative;
  width: 100%;
}
.sidebar-nav .sidebar-header {
  color: #fff;
  /* text-align: center; */
  padding: 10px 15px 10px 30px;
  font-size: 28px;
  height: 65px;
  line-height: 65px;
}
.sidebar-nav li:before {
  background-color: #1c1c1c;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  -webkit-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
  width: 3px;
  z-index: -1;
}
.sidebar-nav li:first-child a {
  background-color: #1a1a1a;
  color: #fff;
}
.sidebar-nav .sidebar-brand:before {
  background-color: #8a6cb6;
}
.sidebar-nav li:hover:before {
  -webkit-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
  width: 100%;
}
.sidebar-nav li a {
  color: #fff;
  display: block;
  padding: 10px 15px 10px 30px;
  text-decoration: none;
}
.sidebar-nav li.open:hover:before {
  -webkit-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
  width: 100%;
}
.sidebar-nav .dropdown-menu {
  background-color: #222222;
  border-radius: 0;
  border: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
}
.sidebar-nav li a:hover,
.sidebar-nav li a:active,
.sidebar-nav li a:focus,
.sidebar-nav li.open a:hover,
.sidebar-nav li.open a:active,
.sidebar-nav li.open a:focus {
  background-color: transparent;
  color: #fff;
  text-decoration: none;
}
.sidebar-nav > .sidebar-brand {
  font-size: 20px;
  height: 65px;
  line-height: 44px;
}
/*-------------------------------*/
/*       Hamburger-Cross         */
/*-------------------------------*/
.hamburger {
  background: transparent;
  border: none;
  display: block;
  height: 50px;
  margin-left: 15px;
  position: fixed;
  top: 20px;
  width: 50px;
  z-index: 999;
}
.hamburger:hover {
  outline: none;
}
.hamburger:focus {
  outline: none;
}
.hamburger:active {
  outline: none;
}
.hamburger.is-closed:before {
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
  color: #000;
  content: "";
  display: block;
  font-size: 14px;
  line-height: 32px;
  opacity: 0;
  text-align: center;
  width: 100px;
}
.hamburger.is-closed:hover before {
  -webkit-transform: translate3d(-100px, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
  display: block;
  opacity: 1;
}
.hamburger.is-closed:hover .hamb-top {
  -webkit-transition: all 0.35s ease-in-out;
  top: 0;
}
.hamburger.is-closed:hover .hamb-bottom {
  -webkit-transition: all 0.35s ease-in-out;
  bottom: 0;
}
.hamburger.is-closed .hamb-top {
  -webkit-transition: all 0.35s ease-in-out;
  background-color: #000;
  top: 5px;
}
.hamburger.is-closed .hamb-middle {
  background-color: #000;
  margin-top: -2px;
  top: 48%;
}
.hamburger.is-closed .hamb-bottom {
  -webkit-transition: all 0.35s ease-in-out;
  background-color: #000;
  bottom: 5px;
}
.hamburger.is-closed .hamb-top,
.hamburger.is-closed .hamb-middle,
.hamburger.is-closed .hamb-bottom,
.hamburger.is-open .hamb-top,
.hamburger.is-open .hamb-middle,
.hamburger.is-open .hamb-bottom {
  height: 6px;
  left: 0;
  position: absolute;
  width: 100%;
}
.hamburger.is-open .hamb-top {
  -webkit-transform: rotate(45deg);
  -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.73, 1, 0.28, 0.08);
  background-color: #000;
  margin-top: -2px;
  top: 50%;
}
.hamburger.is-open .hamb-middle {
  background-color: #000;
  display: none;
}
.hamburger.is-open .hamb-bottom {
  -webkit-transform: rotate(-45deg);
  -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.73, 1, 0.28, 0.08);
  background-color: #000;
  margin-top: -2px;
  top: 50%;
}
.hamburger.is-open:before {
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
  color: #000;
  content: "";
  display: block;
  font-size: 14px;
  line-height: 32px;
  opacity: 0;
  text-align: center;
  width: 100px;
}
.hamburger.is-open:hover before {
  -webkit-transform: translate3d(-100px, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
  display: block;
  opacity: 1;
}
/*-------------------------------*/
/*          Dark Overlay         */
/*-------------------------------*/
.overlay {
  position: fixed;
  // display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
canvas {
  position: fixed;
}
.el-tabs__active-bar{
  // transform: translateX(135px) !important;
}
#phone{
  // margin: auto;
  text-align: center;
  background: url('../src/assets/image/ikobe6.jpg') no-repeat center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-size: 150%;
  h1{
    margin: 500px auto;
    color: #fff;
  }
}
#nprogress .bar {
      background: #f1be0d !important; //自定义颜色
 }
</style>
