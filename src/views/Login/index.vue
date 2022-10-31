<template>
  <div class="login">
    <div class="con">
      <div class="con_bg">
        <vue-particles
          class="login_bg"
          color="#dedede"
          :particleOpacity="0.7"
          :particlesNumber="180"
          shapeType="circle"
          :particleSize="4"
          linesColor="#dedede"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.4"
          :linesDistance="150"
          :moveSpeed="3"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        >
        </vue-particles>
        <img
          class="logomanba animate__backInDown animate__animated"
          src="@/assets/image/blackmanba.png"
          alt=""
        />
        <p class="title animate__shakeX animate__animated">
          你知道洛杉矶每天早上四点钟是什么样子吗？满天星星，寥落的灯光，行人很少。
        </p>
        <div
          class="login_type animate__backInUp animate__animated"
          v-if="isRegister"
        >
          <i class="iconfont icon-cuo" @click="backBtn"></i>
          <el-tabs v-model="activeName" @tab-click="changeTabLogin">
            <el-tab-pane label="账密登录" name="账密登录">
              <el-form>
                <el-form-item prop="user">
                  <el-input
                    type="text"
                    v-model="ruleForm.user"
                    autocomplete="off"
                    placeholder="请输入手机号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                  <el-input
                    type="password"
                    v-model="ruleForm.pass"
                    autocomplete="off"
                    placeholder="请输入密码"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-form>
              <div class="register">
                <span @click="goRegister">注册账户</span>
                <span @click="goRegister">忘记密码</span>
              </div>
              <button class="btn" @click="login('1')">登 录</button>
              <button class="btn" @click="faceLogin">人脸登录</button>
              <p style="color:#f1be0d">友情提醒：首次登录请先使用普通登录进行人脸识别</p>
            </el-tab-pane>
            <el-tab-pane label="手机登录" name="手机登录">
              <el-form>
                <el-form-item prop="phone">
                  <el-input
                    type="text"
                    v-model="ruleForm.phone"
                    autocomplete="off"
                    placeholder="请输入手机号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="imgCode" class="code">
                  <el-input
                    type="text"
                    v-model="ruleForm.imgCode"
                    autocomplete="off"
                    placeholder="图片验证码"
                  ></el-input>
                  <i @click="refreshCode" style="cursor: pointer">
                    <Verification :identifyCode="identifyCode"></Verification>
                  </i>
                </el-form-item>
                <el-form-item prop="code" class="code">
                  <el-input
                    type="text"
                    v-model="ruleForm.code"
                    autocomplete="off"
                    placeholder="短信验证码"
                  ></el-input>
                  <span v-show="getCodeLogin" @click="getCode('l')"
                    >获取验证码</span
                  >
                  <span v-show="!getCodeLogin"
                    >倒计时{{ timeLogin}}s</span
                  >
                </el-form-item>
              </el-form>
              <div class="register">
                <span @click="goRegister">注册账户</span>
                <span @click="goRegister">忘记密码</span>
              </div>
              <button class="btn" @click="login('2')">登 录</button>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="login_type animate__backInUp animate__animated" v-else>
          <i class="iconfont icon-fanhui" @click="backLoginBtn"></i>
          <el-tabs v-model="activeName2" @tab-click="changeTabRegister">
            <el-tab-pane label="账号注册" name="账号注册">
              <el-form>
                <el-form-item prop="phone2">
                  <el-input
                    type="text"
                    v-model="ruleForm.phone2"
                    autocomplete="off"
                    placeholder="请输入手机号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pass2">
                  <el-input
                    type="password"
                    v-model="ruleForm.pass2"
                    autocomplete="off"
                    placeholder="请输入密码"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="imgCode2" class="code">
                  <el-input
                    type="text"
                    v-model="ruleForm.imgCode2"
                    autocomplete="off"
                    placeholder="图片验证码"
                  ></el-input>
                  <i @click="refreshCodeRegister" style="cursor: pointer">
                    <Verification
                      :identifyCode="identifyCodeRegister"
                    ></Verification>
                  </i>
                </el-form-item>
                <el-form-item prop="code2" class="code">
                  <el-input
                    type="text"
                    v-model="ruleForm.code2"
                    autocomplete="off"
                    placeholder="请输入验证码"
                  ></el-input>
                  <span v-show="getCodeRegister" @click="getCode('r')"
                    >获取验证码</span
                  >
                  <span v-show="!getCodeRegister"
                    >倒计时{{ timeRegister }}s</span
                  >
                </el-form-item>
              </el-form>
              <button class="btn" @click="goLogin('register')">注 册</button>
            </el-tab-pane>
            <el-tab-pane label="重置密码" name="重置密码">
              <el-form>
                <el-form-item prop="phone3">
                  <el-input
                    type="text"
                    v-model="ruleForm.phone3"
                    autocomplete="off"
                    placeholder="请输入手机号"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="pass3">
                  <el-input
                    type="password"
                    v-model="ruleForm.pass3"
                    autocomplete="off"
                    placeholder="请输入新密码"
                    clearable
                  ></el-input>
                </el-form-item>
                <el-form-item prop="imgCode3" class="code">
                  <el-input
                    type="text"
                    v-model="ruleForm.imgCode3"
                    autocomplete="off"
                    placeholder="图片验证码"
                  ></el-input>
                  <i @click="refreshCodePass" style="cursor: pointer">
                    <VerificationCode
                      :identifyCode="identifyCodePass"
                    ></VerificationCode>
                  </i>
                </el-form-item>
                <el-form-item prop="code3" class="code">
                  <el-input
                    type="text"
                    v-model="ruleForm.code3"
                    autocomplete="off"
                    placeholder="请输入验证码"
                  ></el-input>
                  <span v-show="getCodeUpdate" @click="getCode('u')"
                    >获取验证码</span
                  >
                  <span v-show="!getCodeUpdate"
                    >倒计时{{ timeUpdate }}s</span
                  >
                </el-form-item>
              </el-form>
              <button class="btn" @click="goLogin('submit')">确 认</button>
            </el-tab-pane>
          </el-tabs>
        </div>
        <el-dialog
          v-model="dialogVisible"
          width="30%"
          :show-close="false"
          center
        >
          <span><i class="iconfont icon-renlianshibie"></i> 是否下次登录开启人脸登录</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="directBtn">直接登录</el-button>
              <el-button type="primary" @click="goFace"
                >立即开启</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import "animate.css";
import "../../assets/iconfont/iconfont.css";
import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  watchEffect,
  ref,
  reactive,
} from "vue";
import { useRouter } from "vue-router";
import { userHandle } from "../../utils/form_validation";
import { Register, Login, GetMobileCode,UpdatePassword,GetUserInfo } from "../../request/request";
import Verification from "../../components/Verification/Verification.vue";
import VerificationCode from "../../components/Verification/VerificationCode.vue";
export default {
  components: { Verification, VerificationCode },
  setup() {
    const isRegister = ref(true);
    const activeName = ref("账密登录");
    const activeName2 = ref("账号注册");
    const $router = useRouter();
    const identifyCode = ref(""); // 登录图片验证码
    const identifyCodeRegister = ref(""); //注册图片验证码
    const identifyCodePass = ref(""); //更改密码验证码
    const identifyCodes = ref(
      "123456789ABCDEFGHGKMNPQRSTUVWXYZabcdefghijklmnopkistuvwxyz"
    ); //规则
    const getCodeRegister = ref(true);
    const getCodeLogin = ref(true)
    const getCodeUpdate = ref(true)
    const timeRegister = ref(60);
    const timeLogin = ref(60)
    const timeUpdate = ref(60)
    const dialogVisible = ref(false)
    const ruleForm = reactive({
      user: "",
      pass: "",
      imgCode: "",
      imgCode2: "",
      code: "",
      phone: "",
      pass2: "",
      code2: "",
      phone2: "",
      pass3: "",
      code3: "",
      imgCode3: "",
      phone3: "",
    });
    onMounted(() => {
      refreshCode()
      refreshCodeRegister()
      refreshCodePass()
      
    });
    // 注册登录跳转
    let goRegister = () => {
      isRegister.value = false;
      // activeName2.value = '重置密码'
    };
    // 登录切换验证码
    let refreshCode = () => {
      (identifyCode.value = ""), makeCode(identifyCodes.value, 4, "1");
    };
    // 注册切换验证码
    let refreshCodeRegister = () => {
      (identifyCodeRegister.value = ""), makeCode(identifyCodes.value, 4, "2");
    };
    // 修改密码切换验证码
    let refreshCodePass = () => {
      (identifyCodePass.value = ""), makeCode(identifyCodes.value, 4, "3");
    };
    // 生成随机验证码
    let makeCode = (rule, l, type) => {
      if (type == "1") {
        for (let i = 0; i < l; i++) {
          identifyCode.value +=
            rule[Math.floor(Math.random() * (rule.length - 0) + 0)];
        }
      } else if (type == "2") {
        for (let i = 0; i < l; i++) {
          identifyCodeRegister.value +=
            rule[Math.floor(Math.random() * (rule.length - 0) + 0)];
        }
      } else {
        for (let i = 0; i < l; i++) {
          identifyCodePass.value +=
            rule[Math.floor(Math.random() * (rule.length - 0) + 0)];
        }
      }
    };
    // 切换tab刷新图片验证码
    let changeTabLogin = ()=>{
      if(activeName.value == '手机登录') refreshCode() 
    }
    let changeTabRegister =()=>{
      activeName2.value == '账号注册'?refreshCodeRegister():refreshCodePass()
    }
    // 获取验证码
    let getCode = (type) => {
      // 注册获取
      if (type == "r") {
        let res = codeRule(ruleForm.phone2)
        if(res){
          getCodeRegister.value = false;
          let time = setInterval(() => {
            timeRegister.value--;
            if (timeRegister.value <= 0) {
              clearInterval(time);
              timeRegister.value = 60;
              getCodeRegister.value = true;
            }
          }, 1000);
          handelGetCode(ruleForm.phone2);
        }
      }else if(type =='l'){
        let res2 = codeRule(ruleForm.phone)
        if(res2){
          getCodeLogin.value = false;
          let time = setInterval(() => {
            timeLogin.value--;
            if (timeLogin.value <= 0) {
              clearInterval(time);
              timeLogin.value = 60;
              getCodeLogin.value = true;
            }
          }, 1000);
          handelGetCode(ruleForm.phone);
        }
      }else{
         let res3 = codeRule(ruleForm.phone3)
         if(res3){
           getCodeUpdate.value = false;
           let time = setInterval(() => {
             timeUpdate.value--;
             if (timeUpdate.value <= 0) {
               clearInterval(time);
               timeUpdate.value = 60;
               getCodeUpdate.value = true;
             }
           }, 1000);
           handelGetCode(ruleForm.phone3);
         }
      }
    };
    // 获取验证码校验规则
    let codeRule = (v)=>{
      console.log(v,'000')
      var regPhone = /^1[3456789]\d{9}$/
      if (!v) {
          ElMessage({
              showClose: true,
              message: '手机号不能为空',
              type: 'error',
          })
          return false
      } else if (regPhone.test(v) == false) {
          ElMessage({
              showClose: true,
              message: '请输入有效的手机号',
              type: 'error',
          })
          return false
      }else{
          return true
      }
    }
    // 注册/确认
    let goLogin = (type) => {
      let result = verificationForm();
      if (type == "register") {
        if (result) {
          let params = {
            telephone: ruleForm.phone2,
            password: ruleForm.pass2,
            code: ruleForm.code2,
          };
          Register(params)
            .then((res) => {
              console.log(res, "请求成功");
              if (res.status == "000000") {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "success",
                });
                ruleForm.phone2 = "";
                ruleForm.pass2 = "";
                ruleForm.code2 = "";
                ruleForm.imgCode2 = "";
                isRegister.value = true;
              } else {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }else{
        if(result){
          let params = {
            telephone: ruleForm.phone3,
            password: ruleForm.pass3,
            code: ruleForm.code3,
          };
          UpdatePassword(params).then((res)=>{
            if (res.status == "000000") {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "success",
                });
                ruleForm.phone3 = "";
                ruleForm.pass3 = "";
                ruleForm.code3 = "";
                ruleForm.imgCode3 = "";
                isRegister.value = true;
              } else {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "warning",
                });
              }
          })
        }
      }
    };
    // 登录
    let login = (number) => {
      let result = verificationForm();
      if (number == "1") {
        if (result) {
          let params = {
            telephone: ruleForm.user,
            password: ruleForm.pass,
            type: "1",
            code:'1'
          };
          Login(params)
            .then((res) => {
              if (res.status == "000000") {
                sessionStorage.setItem('authorization',res.Token)
                // ElMessage({
                //   showClose: true,
                //   message: res.message,
                //   type: "success",
                // });
                getUserInfo(ruleForm.user)
              } else {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      } else {
        if (result) {
          let params = {
            telephone: ruleForm.phone,
            password:'xxxyyy',
            type: "2",
            code: ruleForm.code,
          };
          Login(params)
            .then((res) => {
              if (res.status == "000000") {
                sessionStorage.setItem('authorization',res.Token)
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "success",
                });
                getUserInfo(ruleForm.phone)
              } else {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: "warning",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    };
    // 获取验证码处理函数
    let handelGetCode = (tel) => {
      let params = {
        telephone: tel,
      };
      GetMobileCode(params)
        .then((res) => {
          if (res.status == "000000") {
            ElMessage({
              showClose: true,
              message: res.message,
              type: "success",
            });
          } else {
            ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    let backBtn = () => {
      $router.back();
    };
    let backLoginBtn = () => {
      isRegister.value = true;
    };
    // 表单校验
    let verificationForm = () => {
      if (isRegister.value) {
        if (activeName.value == "账密登录") {
          return userHandle("1", "", ruleForm.pass, ruleForm.user);
        } else {
          return userHandle(
            "2",
            "",
            "",
            ruleForm.phone,
            ruleForm.code,
            ruleForm.imgCode,
            identifyCode.value
          );
        }
      } else {
        if (activeName2.value == "账号注册") {
          return userHandle(
            "3",
            "",
            ruleForm.pass2,
            ruleForm.phone2,
            ruleForm.code2,
            ruleForm.imgCode2,
            identifyCodeRegister.value
          );
        } else {
          return userHandle(
            "4",
            "",
            ruleForm.pass3,
            ruleForm.phone3,
            ruleForm.code3,
            ruleForm.imgCode3,
            identifyCodePass.value
          );
        }
      }
    };
    // 获取用户信息
    let getUserInfo = (telephone)=>{
      let params={
          telephone,
        }
        GetUserInfo(params).then((res) => {
          if (res.status == "000000") {
            dialogVisible.value = true
            sessionStorage.setItem('userInfo',JSON.stringify(res.data))
          }else{
            ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          }
          // $router.push('/LeaveMessage')
        });
    }
    // 跳转到人脸识别
    let goFace = ()=>{
      $router.push('/Face')
    }
    let directBtn = ()=>{
      dialogVisible.value = false
      $router.push('/LeaveMessage')
    }
    // 人脸登录
    let faceLogin = ()=>{
      $router.push('/Face')
    }
    return {
      activeName,
      activeName2,
      isRegister,
      ruleForm,
      identifyCode,
      identifyCodes,
      identifyCodeRegister,
      identifyCodePass,
      getCodeRegister,
      timeRegister,
      getCodeLogin,
      timeLogin,
      getCodeUpdate,
      timeUpdate,
      dialogVisible,
      goRegister,
      goLogin,
      login,
      backBtn,
      backLoginBtn,
      refreshCode,
      refreshCodeRegister,
      refreshCodePass,
      getCode,
      changeTabLogin,
      changeTabRegister,
      goFace,
      directBtn,
      faceLogin
    };
  },
};
</script>
<style lang="less" scope>
.login {
  position: fixed;
  background: url("../../assets/image/ikobe7.jpg") center;
  width: 100%;
  height: 100%;
  font-size: 0;
  .login_bg {
    z-index: 10;
  }
  .bg {
    width: 100%;
    height: 75%;
  }
  .con {
    font-size: 14px;
    position: absolute;
    left: 0;
    top: 0;
    background: #17083f;
    opacity: 0.95;
    width: 100%;
    height: 100%;
    .iconfont {
      color: #fff;
      font-size: 24px;
      float: right;
    }
    .logomanba {
      width: 6%;
      // margin-top: 100px;
      display: block;
      margin: 100px auto 20px auto;
    }
    .title {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 24px;
      color: #ffffff;
      padding: 20px 0;
      text-align: center;
    }
    .login_type {
      padding: 30px;
      box-sizing: border-box;
      width: 30%;
      min-height: 500px;
      background: #5e01d1;
      box-shadow: 0px 3px 6px #00000029;
      opacity: 1;
      margin: auto;
    }
    .el-tabs__header {
      margin: 0 0 25px;
    }
    .el-form {
      width: 100%;
      margin: auto;
    }
    .el-form-item__content {
      line-height: 0;
    }
    .el-tabs__nav-wrap::after {
      background: none;
    }
    .el-tabs__item.is-active {
      color: #f1be0d;
    }
    .el-tabs__active-bar {
      background: #f1be0d;
    }
    .el-tabs__item {
      color: #ffffff;
      opacity: 0.85;
    }
    .el-input__inner {
      height: 50px;
    }
    input::-webkit-input-placeholder {
      color: #17083f;
      opacity: 0.65;
    }
    .register {
      display: flex;
      justify-content: space-between;
      color: #f1be0d;
      cursor: pointer;
    }
    .el-tabs--top {
      margin-top: 20px;
    }
    .btn {
      width: 100%;
      height: 50px;
      background: #f1be0d;
      opacity: 1;
      border-radius: 2px;
      border: none;
      font-size: 20px;
      margin-top: 20px;
      font-weight: 600;
    }
    .el-form-item__content {
      display: flex;
      justify-content: space-between;
    }

    .code {
      .el-input {
        width: 80%;
      }
      i {
        width: 102px;
        height: 50px;
        display: inline-block;
      }
      span {
        width: 102px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        background: #fff;
        // border: 1px solid #a142fc;
        opacity: 1;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        font-family: PingFangSC-Regular;
      }
    }
  }
}
</style>