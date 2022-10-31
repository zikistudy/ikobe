import { createStore } from "vuex";

export default createStore({
  state: {
    Authorization:'',//登录token信息
    isLogin:false,//登录状态
    tel:'',//登陆人号码
  },
  mutations: {
    // 更改登录状态
    changeLoginStatus(state,arg){
      state.isLogin = arg
    }
  },
  actions: {},
  modules: {},
});
