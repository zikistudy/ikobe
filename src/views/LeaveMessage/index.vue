<template>
  <div class="leaveMessage">
    <div class="new-year animate__fadeIn animate__animated"></div>
    <div class="box">
      <div class="left">
        <el-input
          :rows="2"
          clearable
          placeholder="留下你想对科比说的话吧..."
          v-model="value"
          class="animate__lightSpeedInLeft animate__animated"
        >
          >
          <template #append>
            <span @click="releaseBtn">发布</span>
          </template>
        </el-input>
        <p class="title">
          <span class="message">留言</span>
          <span>({{ messageListLength }})</span>
        </p>
        <p class="line"></p>
        <ul class="left_con">
          <li v-for="(item, index) in messageList" :key="index">
            <el-avatar
              icon="el-icon-user-solid"
              :src="item.user_pic"
            ></el-avatar>
            <div class="con">
              <p class="name">{{ item.nickname }}</p>
              <p class="time">{{ item.create_time }}</p>
              <div>
                {{ item.content }}
              </div>
              <p class="logo">
                <!-- <i class="iconfont icon-liaotian"></i> -->
                <i
                  ref="icon"
                  class="iconfont icon-xin"
                  @click="changeIcon(item, index)"
                ></i>
                <span>{{ item.like_number }}</span>
              </p>
            </div>
          </li>
        </ul>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          v-model:currentPage="page"
          @click="handelPage"
        >
        </el-pagination>
      </div>
      <div class="right">
        <div class="logins" v-show="!isLogin">
          <p><span @click="goLogin">登录</span>之后可留言</p>
          <div
            class="btn animate__lightSpeedInRight animate__animated"
            @click="goLogin"
          >
            登录
          </div>
        </div>
        <div v-show="isLogin" class="userInfo_box">
          <div class="userInfo">
            <p style="color: #af75fe">
              Hi,<span style="color: #f1be0d">{{ userName }}</span>
              欢迎您登录...
            </p>
            <el-popover placement="bottom-start" :width="200" trigger="hover">
              <template #reference>
                <el-avatar :size="50" :src="circleUrl" />
              </template>
              <div
                class="con"
                style="
                  display: flex;
                  justify-content: space-around;
                  cursor: pointer;
                "
              >
                <span @click="showSet">个人设置</span>
                <span @click="logOut">退出登录</span>
                <span v-show="isAdminister" @click="dialogVisible = true"
                  >上传视频</span
                >
              </div>
            </el-popover>
          </div>
          <div v-show="isSet" class="userSet">
            <el-form-item label="昵称">
              <el-input
                v-model="nickName"
                clearable
                maxlength="12"
                show-word-limit
              />
            </el-form-item>
            <div class="avatar">
              <span>头像</span>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <!-- <img v-if="imageUrl" :src="imageUrl"/> -->
                <el-avatar v-if="imageUrl" :size="80" :src="imageUrl" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </div>
            <div class="userBtn">
              <el-button plain @click="cancelBtn">取消</el-button>
              <el-button plain @click="submitBtn">确定</el-button>
            </div>
          </div>
        </div>
        <img src="@/assets/image/message2.webp" alt="" />
      </div>
      <el-dialog v-model="dialogVisible" width="30%" title="上传视频">
        <el-upload
          class="upload-demo"
          drag
          :show-file-list="false"
          action="#"
          :before-upload="handleVideoSuccess"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        </el-upload>
        <el-input
          v-model="descInput"
          placeholder="请输入视频描述"
          class="descInput"
        />
        <el-input
          v-model="descInput2"
          placeholder="请输入视频标题"
          class="descInput"
        />
        <el-button
          type="primary"
          plain
          class="uploadBtn"
          @click="handelUploadVideo"
          >上传至服务器</el-button
        >
      </el-dialog>
    </div>
    <footer>
      <p>Copyright © 2022 ikobe. All rights reserved.</p>
    </footer>
  </div>
</template>
<script>
import { Plus, UploadFilled } from "@element-plus/icons-vue";
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
  nextTick,
} from "vue";
// import preventBack from 'vue-prevent-browser-back';//组件内单独引入
import { useRouter } from "vue-router";
// import store from "../../store/index";
import OSS from "ali-oss";
import {
  GetUserInfo,
  UpdateUserInfo,
  sendMessage,
  getMessageInfo,
  addFavorite,
  reduceFavorite,
  getLikes,
  getStsInfo,
  uploadVideo,
} from "../../request/request";
export default {
  // mixins: [preventBack],//注入
  components: {
    Plus,
    UploadFilled,
  },
  setup() {
    const messageList = ref([]); //条数8
    const likeList = ref([]); // 已点赞列表
    const messageListLength = ref("");
    const value = ref();
    const $router = useRouter();
    const isLogin = ref(false);
    const nickName = ref("");
    const userName = ref("");
    const isSet = ref(false);
    const imageUrl = ref(""); // 上传头像即时显示地址
    const circleUrl = ref(""); // 头像地址
    const avatarUrl = ref(""); //头像暂存地址
    const icon = ref("");
    const page = ref(1);
    const total = ref(10);
    const userInfo = ref({});
    const isAdminister = ref(false); // 是否是管理员
    const dialogVisible = ref(false);
    const client = ref(null);
    const descInput = ref("");
    const descInput2 = ref("");
    const videoUrl = ref(""); //视频url
    onMounted(() => {
      if (sessionStorage.getItem("userInfo")) {
        let user = JSON.parse(sessionStorage.getItem("userInfo"));
        userInfo.value = user;
        userName.value = user.nickname;
        circleUrl.value = user.user_pic;
        isLogin.value = true;
        if (user.Id == 2) {
          isAdminister.value = true;
          handelStsInfo();
        } else {
          isAdminister.value = false;
        }
        handelGetLikes(user.Id);
      }
      setTimeout(() => {
        getMessage(1, 8);
      });
    });
    // 获取留言列表
    let getMessage = (page, pagenum) => {
      userInfo.value.Id ? handelGetLikes(userInfo.value.Id) : "";
      let params = {
        page,
        pagenum,
      };
      getMessageInfo(params).then((res) => {
        if (res.status == "000000") {
          let arr = [];
          messageList.value = res.data;
          messageList.value.forEach((item, index) => {
            nextTick(() => {
              icon.value[index].className = "iconfont icon-xin";
            });
            likeList.value.forEach((v, i) => {
              if (item.Id == v.messageId) {
                arr.push(index);
              }
            });
          });
          value.value = "";
          messageListLength.value = res.total;
          let totals = Math.ceil(res.total / 8) * 10;
          total.value = totals;
          console.log(arr, "-------");
          arr.forEach((item) => {
            nextTick(() => {
              icon.value[item].className = "iconfont icon-xin icon-success";
            });
          });
        } else {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "warning",
          });
        }
      });
    };
    // 获取当前登陆人点赞列表
    let handelGetLikes = (id) => {
      let params = {
        userId: id,
      };
      getLikes(params).then((res) => {
        if (res.status == "000000") {
          likeList.value = res.data;
        } else {
          ElMessage({
            showClose: true,
            message: res.message ? res.message : "网络错误，请稍后再试！",
            type: "warning",
          });
        }
      });
    };
    // 打开个人设置
    let showSet = () => {
      nickName.value = userName.value;
      imageUrl.value = circleUrl.value;
      isSet.value = true;
    };
    // 退出登录
    let logOut = () => {
      sessionStorage.clear();
      // isLogin.value = false;
      location.reload();
      // $router.push("/LeaveMessage");
    };
    let goLogin = () => {
      $router.push("/Login");
    };
    // 上传头像成功回调
    let handleAvatarSuccess = (res, file) => {
      // console.log(file)
      // imageUrl.value = URL.createObjectURL(file.raw);
      getBase64(file.raw).then((res) => {
        avatarUrl.value = res;
        imageUrl.value = res;
      });
    };
    //上传头像前调
    let beforeAvatarUpload = (rawFile) => {
      if (
        rawFile.type == "image/png" ||
        rawFile.type == "image/jpg" ||
        rawFile.type == "image/jpeg"
      ) {
        if (rawFile.size / 1024 / 1024 > 2) {
          ElMessage.error("头像大小不超过2MB!");
          return false;
        }
      } else {
        ElMessage.error("头像支持png、jpg和jpeg格式!");
        return false;
      }
      getBase64(rawFile).then((res) => {
        avatarUrl.value = res;
        imageUrl.value = res;
      });
      return true;
    };
    // file转base64
    let getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file);
        reader.onload = () => {
          fileResult = reader.result;
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.onloadend = () => {
          resolve(fileResult);
        };
      });
    };
    // 个人设置提交按钮
    let submitBtn = () => {
      if (nickName.value == "") {
        ElMessage.error("昵称不能为空");
      } else {
        let params = {
          nickname: nickName.value,
          avatar: avatarUrl.value,
        };
        UpdateUserInfo(params).then((res) => {
          if (res.status == "000000") {
            console.log(res, "0000000");
            ElMessage({
              showClose: true,
              message: res.message,
              type: "success",
            });
            userName.value = nickName.value;
            circleUrl.value = imageUrl.value;
            if (sessionStorage.getItem("userInfo")) {
              let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
              userInfo.nickname = nickName.value;
              userInfo.user_pic = imageUrl.value;
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
            }
            isSet.value = false;
          } else {
            ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          }
        });
      }
    };
    // 个人设置取消按钮
    let cancelBtn = () => {
      nickName.value = "";
      imageUrl.value = "";
      isSet.value = false;
    };
    // 发布留言
    let releaseBtn = () => {
      if (userInfo.value.Id) {
        if(!value.value){
           ElMessage.error("留言内容不能为空！");
        }else{
          var moment = require("moment");
          // let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
          let params = {
            userId: userInfo.value.Id,
            nickname: userInfo.value.nickname,
            user_pic: userInfo.value.user_pic,
            create_time: moment().format("yyyy-MM-DD HH:mm"),
            content: value.value,
          };
          sendMessage(params).then((res) => {
            if (res.status == "000000") {
              ElMessage({
                showClose: true,
                message: res.message,
                type: "success",
              });
              console.log(page.value, "-------------");
              let pages = page.value;
              getMessage(pages, 8);
            } else {
              ElMessage({
                showClose: true,
                message: '留言失败',
                type: "warning",
              });
            }
          });

        }
      }else if(userInfo.value.nickname ||userInfo.value.user_pic){
        ElMessage.error("请完善个人设置再留言！");
      }
      else {
        ElMessage.error("请先登录再留言！");
      }
    };
    // 点赞
    let changeIcon = (v, i) => {
      console.log(userInfo.value);
      if (userInfo.value.Id) {
        if (icon.value[i].className == "iconfont icon-xin") {
          icon.value[i].className = "iconfont icon-xin icon-success";
          // v.like_number++
          handelLikes(v);
        } else {
          icon.value[i].className = "iconfont icon-xin";
          cancelLikes(v);
        }
      } else {
        ElMessage({
          showClose: true,
          message: "请先登录!",
          type: "warning",
        });
      }
    };
    // 点赞功能函数
    let handelLikes = (v) => {
      let params = {
        messageId: v.Id,
        userId: userInfo.value.Id,
      };
      addFavorite(params).then((res) => {
        if (res.status == "000000") {
          v.like_number++;
        } else {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "warning",
          });
        }
      });
    };
    // 取消点赞功能函数
    let cancelLikes = (v) => {
      let params = {
        messageId: v.Id,
        userId: userInfo.value.Id,
      };
      reduceFavorite(params).then((res) => {
        if (res.status == "000000") {
          v.like_number--;
        } else {
          ElMessage({
            showClose: true,
            message: res.message,
            type: "warning",
          });
        }
      });
    };
    // 分页触发
    let handelPage = () => {
      console.log(page.value);
      getMessage(page.value, 8);
    };
    // 上传视频成功
    let handleVideoSuccess = (file) => {
      console.log(file);
      uploadPut(file.name, file);
    };
    // 获取临时凭证
    let handelStsInfo = () => {
      getStsInfo().then((res) => {
        console.log(res);
        client.value = new OSS({
          // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
          region: "oss-cn-hangzhou",
          // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
          accessKeyId: res.data.Credentials.AccessKeyId,
          accessKeySecret: res.data.Credentials.AccessKeySecret,
          // 填写Bucket名称。
          bucket: "ikobe",
          stsToken: res.data.Credentials.SecurityToken,
        });
      });
    };
    // 上传oss文件
    let uploadPut = async (name, file) => {
      const headers = {
        "Access-Control-Allow-Origin": "*",
      };
      try {
        var fileNames = new Date().getTime() + name;
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.value.put("ikobe_video/" + fileNames, file, {
          headers,
        });
        // this.video_url=result.url;//返回的上传视频地址
        console.log(result, "-----------");
        if (result.res.status == 200) {
          videoUrl.value = result.url;
          ElMessage({
            showClose: true,
            message: "上传OSS成功！",
            type: "success",
          });
        } else {
          ElMessage({
            showClose: true,
            message: "上传OSS失败！",
            type: "warning",
          });
        }
      } catch (e) {
        console.log(e);
        ElMessage({
          showClose: true,
          message: "上传OSS失败！",
          type: "warning",
        });
      }
    };
    // 上传到数据库
    let handelUploadVideo = () => {
      if (videoUrl.value == "") {
        ElMessage.error("请先上传视频文件！");
      } else if (descInput.value == "") {
        ElMessage.error("描述信息不能为空！");
      } else if (descInput2.value == "") {
        ElMessage.error("视频标题不能为空！");
      } else {
        //一下为生成图片处理的签名 URL t_1000表示第一秒视频图片，常用来作为视频封面图
        const imgRes =
          videoUrl.value +
          "?x-oss-process=video/snapshot,t_1000,f_jpg,w_0,h_0,m_fast";
        var moment = require("moment");
        let params = {
          desc: descInput.value,
          videoUrl: videoUrl.value,
          videoImgUrl: imgRes,
          time: moment().format("yyyy-MM-DD HH:mm"),
          name: descInput2.value,
        };
        uploadVideo(params).then((res) => {
          console.log(res);
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
        });
      }
    };
    return {
      messageList,
      value,
      goLogin,
      isLogin,
      nickName,
      isSet,
      showSet,
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload,
      circleUrl,
      userName,
      avatarUrl,
      submitBtn,
      cancelBtn,
      logOut,
      releaseBtn,
      changeIcon,
      icon,
      messageListLength,
      page,
      handelPage,
      total,
      likeList,
      userInfo,
      isAdminister,
      dialogVisible,
      handleVideoSuccess,
      client,
      descInput,
      videoUrl,
      handelUploadVideo,
      descInput2,
    };
  },
};
</script>
<style lang="less" scope>
@keyframes dd {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.leaveMessage {
  // background: #17083f;
  .new-year {
    font-family: "Major Mono Display", monospace;
    color: #333333;
    font-size: 20px;
    // position: relative;
    // left: 50%;
    // top: 50%;
    width: 100%;
    position: relative;
    left: 0;
    top: 0;
    // z-index: -10;
    background: url("../../assets/image/message3.jpg") no-repeat center;
    background-size: 100% 100%;
    height: 700px;
    .year {
      position: relative;
      left: 50%;
      display: table;
      font-size: 6em;
      transform: translateX(-50%);
      font-style: italic;
    }
    .year2 {
      transform: translateX(-50%) rotateX(130deg);
      opacity: 0.2;
    }
    .dight {
      display: inline-block;
      margin: 0px;
      padding: 0 20px;
      position: relative;
      // opacity: 0;
      background: -webkit-linear-gradient(
        left,
        #a96ff3,
        #a96ff3 25%,
        #f1be0d 50%,
        #a96ff3 75%,
        #f1be0d
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: rgba(0, 0, 0, 0);
      -webkit-animation: dd 4s infinite linear;
      -webkit-background-size: 200% 100%;
    }
    .active {
      margin-right: 40px;
    }
  }
  img {
    width: 100%;
  }
  .box {
    // width: 90%;
    margin: auto;
    display: flex;
    background: #fafafa none repeat scroll 0 0;
    box-shadow: 0px 0px 20px -10px #000000;
    justify-content: space-evenly;
    // padding: 20px;
    .left {
      width: 55%;
      z-index: 5;
      margin: 50px 0;
      padding: 20px;
      box-shadow: 0px 0px 20px -10px #000000;
      .el-input__wrapper {
        padding: 0 8px 0 0;
      }
      input {
        border: none;
        height: 56px;
        // background: #af75fe;
        opacity: 1;
        border-radius: 4px;
        // color: #fff;
        padding: 0 14px;
      }
      input::-webkit-input-placeholder {
        color: #f1be0d;
      }
      .el-input-group__append {
        // background: #550ab2;
        border: none;
        // border-left: 2px solid #f1be0d;
        color: #f1be0d;
        cursor: pointer;
      }
      .title {
        color: #000;
        margin: 25px 0 10px 0;
        .message {
          font-size: 20px;
        }
      }
      .line {
        height: 1px;
        background: #000;
        opacity: 0.35;
        margin: 0;
      }
      .left_con {
        list-style: none;
        padding: 0;
        height: 1300px;
        li {
          display: flex;
          justify-content: space-around;
          color: #000;
          font-family: PingFang SC;
          opacity: 0.85;
          margin-bottom: 10px;
          margin-top: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid #414141;
          .con {
            width: 100%;
            padding: 0 10px;
            .logo {
              margin: 12px 0 0 0;
              display: flex;
              align-items: center;
              .iconfont {
                font-size: 28px;
                cursor: pointer;
                // color: #aaa5a5;
              }
              .icon-success {
                color: #ef0b0b;
              }
              .icon-xin:hover {
                color: #ef0b0b;
              }
              span {
                margin-left: 4px;
                font-size: 20px;
              }
            }
            div {
              font-size: 20px;
              font-weight: 400;
              line-height: 20px;
              opacity: 0.85;
            }
            .name {
              font-size: 22px;
              font-weight: 800;
              opacity: 0.8;
            }
            p {
              margin: 0;
            }
            .time {
              margin: 4px 0 12px 0;
              font-size: 12px;
            }
          }
        }
      }
      .item {
        margin-right: 20px;
      }
      .el-badge__content {
        background: #f1be0d;
      }
      .el-pagination {
        text-align: center;
        display: flex;
        justify-content: center;
        margin: auto;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #f1be0d;
        color: #000;
      }
    }
    .right {
      width: 25%;
      // height: 400px;
      // background: #a96ff3;
      margin: 50px 0;
      padding: 20px;
      box-shadow: 0px 0px 20px -10px #000000;
      // background: url('../../assets/image/about2.png') no-repeat center;
      .logins {
        background: black;
        padding: 150px;
        p {
          font-size: 20px;
          font-weight: 400;
          margin: 50px 0;
          color: #fff;
          opacity: 1;
          text-indent: 28px;
          position: relative;
          cursor: pointer;
          span {
            color: #f1be0d;
          }
        }
      }
      .userInfo_box {
        .userInfo {
          position: relative;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 24px;
          }
          img {
            margin: 0;
            background: #fff;
          }
        }
        .userSet {
          border: 2px solid #e8e4e4;
          padding: 50px 20px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          .el-form-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .el-form-item__content {
              width: 90%;
            }
          }
          .userBtn {
            display: flex;
            justify-content: center;
            .el-button {
              width: 50%;
              align-self: center;
              position: relative;
            }
          }
          .avatar {
            display: flex;
            justify-content: space-between;
            margin: 24px 0;
            .avatar-uploader {
              width: 65%;
              .el-upload {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                border: 1px dashed #dcdfe6;
                position: relative;
                i {
                  font-size: 28px;
                  color: #8c939d;
                  width: 120px;
                  height: 120px;
                  text-align: center;
                }
                img {
                  width: 112px;
                  height: 112px;
                  margin: 0;
                }
              }
              .el-upload:hover {
                border-color: var(--el-color-primary);
              }
            }
          }
        }
      }
      img {
        margin-top: 50px;
      }
      .btn {
        background: #f1be0d;
        opacity: 1;
        border-radius: 4px;
        text-align: center;
        line-height: 50px;
        margin: auto;
        font-size: 22px;
        cursor: pointer;
      }
    }
  }
  footer {
    p {
      padding: 50px;
      text-align: center;
      background: #1c1d21;
      color: #ffffff;
      letter-spacing: 1px;
      font-size: 18px;
      font-family: "Montserrat", sans-serif;
    }
  }
  .upload-demo {
    .el-upload,
    .el-upload-dragger {
      width: 100%;
    }
  }
  .descInput {
    padding: 20px 0;
  }
  .uploadBtn {
    width: 100%;
  }
}
</style>
