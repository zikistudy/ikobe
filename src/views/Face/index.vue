<template>
  <div class="face">
    <vue-particles
      class="login_bg"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="180"
      shapeType="circle"
      :particleSize="4"
      linesColor="#409eff"
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
    <div class="con">
      <p>{{ title }}</p>
      <video
        ref="videoObj"
        style="
          transform: rotateY(180deg);
          width: 250px;
          height: 250px;
          border-radius: 100%;
        "
        autoplay
      ></video>
    </div>
    <div>
      <canvas
        ref="canvas"
        width="250"
        height="250"
        style="transform: rotateY(180deg); display: none"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { userMedia } from "../../utils/utils";
require("tracking/build/tracking-min.js");
require("tracking/build/data/face-min.js");
import { useRouter } from "vue-router";
import { onMounted, nextTick, ref, onBeforeUnmount } from "vue";
import {
  facehandel
} from "../../request/request";
// import preventBack from 'vue-prevent-browser-back';//组件内单独引入
export default {
  // mixins: [preventBack],//注入
  setup() {
    const videoObj = ref(null);
    const canvas = ref(null);
    const $router = useRouter();
    let trackerTask = null;
    let getFace = false; // 判断是否检测人脸标志
    let getPhoto = false; // 判断是否拍照标志
    let base64Str = ''
    let userInfo = ''
    const title = ref("请正视摄像头...");
    onMounted(() => {
      if (sessionStorage.getItem("userInfo")) {
        userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      }
      nextTick(() => {
        openCamera();
      });
    });
    let openCamera = () => {
      // 有可能触发一些其他的按钮会重新获取
      const context = canvas.value.getContext("2d");
      // eslint-disable-next-line no-undef
      const tracker = new tracking.ObjectTracker("face"); // 检测人脸
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      // eslint-disable-next-line no-undef
      trackerTask = tracking.track(videoObj.value, tracker, { camera: true });

      const constraints = {
        video: { width: 250, height: 250 },
        audio: false,
      };
      userMedia(constraints, success, error);
      tracker.on("track", (event) => {
        if (event.data.length === 0) {
          title.value = "未检测到人脸...";
        } else {
          if (!getFace) {
            title.value = "识别成功，正在拍照，请勿乱动...";
          }
          if (!getPhoto) {
            title.value = "拍照中...";
            getPhoto = true;
            setTimeout(() => {
              getFace = true;
              // 绘制到 canvas
              context.drawImage(
                videoObj.value,
                0,
                0,
                canvas.value.width,
                canvas.value.height
              );
              let img = canvas.value.toDataURL("image/png");
              title.value = "登陆中，请稍后...";
              base64Str = img.substring(img.indexOf(',') + 1)
              console.log(base64Str, "---------");
              handelFace(base64Str)
            }, 2000);
          }
          event.data.forEach((rect) => {
            context.font = "16px Helvetica";
            context.strokeStyle = "#1890ff";
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          });
        }
      });
    };
    // 销毁
    let handleCancel = () => {
      if (trackerTask) {
        trackerTask.stop();
        videoObj.value.srcObject.getTracks()[0].stop();
      }
    };

    // 成功显示
    let success = (stream) => {
      videoObj.value.srcObject = stream;
      videoObj.value.play();
    };
    // 失败抛出错误，可能用户电脑没有摄像头，或者摄像头权限没有打开
    let error = (error) => {
      // 可以在这里面提示用户
      ElMessage.warning(`访问用户媒体设备失败${error.name}, ${error.message}`);
      // console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
    };
    // 人脸识别注册/登录
    let handelFace=(base64Str)=>{
      let type
      if(userInfo){
        type = 'register'
      }else{
        type = 'login'
      }
      let params = {
        image:base64Str,
        image_type:'BASE64',
        group_id:'ikobe_face',
        user_id:userInfo.Id,
        scene_type:'SEC',
        type,
      }
      facehandel(params).then(res=>{
        console.log(res)
        if(res.status == '000000'){
          if(res.data){
            sessionStorage.setItem('userInfo',JSON.stringify(res.data))
            sessionStorage.setItem('authorization',res.Token)
            ElMessage({
              showClose: true,
              message: res.message,
              type: "success",
            });
            setTimeout(()=>{
              $router.push('/LeaveMessage')
            })
          }else{
            ElMessage({
              showClose: true,
              message: res.message,
              type: "success",
            });
            $router.push('/LeaveMessage')
          }
          // addFace()
        }else{
          // getFace = false;
          // getPhoto = false;
          // handleCancel();
          // openCamera()
          // title.value = '请重新识别...';
          ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          setTimeout(()=>{
            $router.push('/Login')
          },500)
        }
      })
    }
    onBeforeUnmount(() => {
      handleCancel();
    });
    return {
      videoObj,
      canvas,
      handleCancel,
      title,
    };
  },
};
</script>
<style lang="less" scope>
.face {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/image/ikobe4.jpg") no-repeat center;
  background-size: 100%;
  .con {
    text-align: center;
    color: #fff;
    font-size: 24px;
    margin-top: 200px;
  }
}
</style>
