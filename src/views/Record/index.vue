<template>
  <div class="bg"></div>
  <section id="container">
    <div class="wrap-container zerogrid">
      <div class="box">
        <div id="main-content" class="col-2-3">
          <div class="header">
            <h2 class="animate__fadeInDown animate__animated">First Video</h2>
          </div>
          <div class="wid-content" v-if="isTrue">
            <div class="row big">
              <div
                class="wid-news"
                v-for="(item, index) in firstVideo"
                :key="index"
              >
                <div class="zoom-container" @click="playVideo(item)">
                  <span class="zoom-caption">
                    <i class="icon-bofang iconfont fa fa-play"></i>
                  </span>
                  <img :src="item.videoImgUrl" />
                </div>
              </div>
            </div>
          </div>
           <div class="empty" v-else>
                暂无视频，请稍后再试
              </div>
          <div class="header all-header">
            <h2 class="animate__fadeInDown animate__animated">All Video</h2>
          </div>
          <section class="all" v-if="isTrue">
            <div class="row">
              <div
                class="col-1-4"
                v-for="(item, index) in allVideo"
                :key="index"
              >
                <div class="wrap-col">
                  <div class="wrap-vid">
                    <div class="zoom-container" @click="playVideo(item)">
                      <span class="zoom-caption">
                        <i class="icon-bofang iconfont fa fa-play"></i>
                      </span>
                      <img :src="item.videoImgUrl" />
                    </div>
                    <h3 class="vid-name">{{ item.name }}</h3>
                    <p class="desc">
                      {{ item.desc }}
                    </p>
                    <div class="info">
                      <span
                        ><i class="iconfont icon-rili"></i>{{ item.time }}</span
                      >
                      <span
                        ><i ref="icon" class="iconfont icon-xin" @click="addLikes(item,index,'1')"></i
                        >{{ item.videoLikes }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- 占位 -->
              <div class="perch" v-for="i in 4" :key="i"></div>
            </div>
          </section>
          <section class="empty" v-else>
              暂无视频，请稍后再试
            </section>
          <div class="navigation">
            <el-pagination background layout="prev, pager, next" :total="total" v-model:currentPage="page" @click="handelPage" v-show="isTrue">
            </el-pagination>
          </div>
        </div>
        <div id="sidebar" class="col-1-3">
          <form id="form-container" action="">
            <i class="iconfont icon-sousuo"></i>
            <div id="searchtext">
              <input
                type="text"
                id="s"
                name="s"
                placeholder="Search Something..."
              />
            </div>
          </form>
          <!---- Start Widget ---->
          <div class="widget wid-post" v-if="isTrue">
            <div class="wid-header">
              <h2 class="animate__fadeInDown animate__animated">Latest Video</h2>
            </div>
            <div class="wid-content">
              <div
                class="post wrap-vid"
                v-for="(item, index) in latestVideo"
                :key="index"
              >
                <div class="zoom-container zoom-box" @click="playVideo(item)">
                  <span class="zoom-caption">
                    <i class="icon-bofang iconfont fa fa-play"></i>
                  </span>
                  <img :src="item.videoImgUrl" />
                </div>
                <div class="wrapper">
                  <h5 class="vid-name">{{ item.name }}</h5>
                  <p class="desc">
                    {{ item.desc }}
                  </p>
                  <span class="rili"
                    ><i class="iconfont icon-rili"></i>{{ item.time }}</span
                  >
                  <span class="xin"
                    ><i ref="icon2" class="iconfont icon-xin" @click="addLikes(item,index,'2')"></i
                    >{{ item.videoLikes }}</span
                  >
                </div>
              </div>
            </div>
          </div>
           <div class="empty" v-else>
                暂无视频，请稍后再试
            </div>
          <!---- Start Widget ---->
          <div class="widget">
            <div class="wid-header">
              <h5 class="animate__fadeInDown animate__animated">Top Video</h5>
            </div>
            <div class="wid-content" v-if="isTrue">
              <div class="row" v-for="(item, index) in topVideo" :key="index">
                <div class="wid-news">
                  <div class="zoom-container" @click="playVideo(item)">
                    <span class="zoom-caption">
                      <i class="icon-bofang iconfont fa fa-play"></i>
                    </span>
                    <img :src="item.videoImgUrl" />
                  </div>
                  <h3 class="vid-name">{{ item.name }}</h3>
                  <p class="desc">
                    {{ item.desc }}
                  </p>
                  <div class="info">
                    <span
                      ><i class="iconfont icon-rili"></i>{{ item.time }}</span
                    >
                    <span
                      ><i ref="icon3" class="iconfont icon-xin" @click="addLikes(item,index,'3')"></i
                      >{{ item.videoLikes }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          <div class="empty" v-else>
                暂无视频，请稍后再试
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <p>Copyright © 2022 ikobe. All rights reserved.</p>
    </footer>
    <el-dialog v-model="openVideo" width="65%" top="20px" @close="closeVideo">
      <video controls :src="videoSrc" autoplay="autoplay"></video>
    </el-dialog>
  </section>
</template>
<script>
import "../../assets/iconfont/iconfont.css";
import "animate.css";
import {
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  computed,
  watchEffect,
  ref,
  reactive,
  nextTick
} from "vue";
import{useRouter} from "vue-router"
import { getVideoInfo,getVideoLikes,cancelVideoFavorite,addVideoFavorite } from "../../request/request";
export default {
  setup() {
    const openVideo = ref(false);
    const likeList = ref([]) // 已点赞列表
    const videoSrc = ref("");
    const allVideo = ref([]);
    const latestVideo = ref([]);
    const topVideo = ref([]);
    const firstVideo = ref([]);
    const isTrue = ref(false);
    const icon = ref('')
    const icon2 = ref('')
    const icon3 = ref('')
    const userInfo = ref({})
    const $router = useRouter()
    const total = ref(10);
    const page = ref(1);
    onMounted(() => {
      if(sessionStorage.getItem('userInfo')){
        let user = JSON.parse(sessionStorage.getItem('userInfo'))
        userInfo.value = user
        handelGetLikes(user.Id)
      }
      setTimeout(()=>{
        getVideoList(1, 8,'all');
        getVideoList(1, 3, "top");
        getVideoList(1, 1, "first");
        getVideoList(1, 3, "latest");
      })
    });
    // 播放视频
    let playVideo = (v) => {
      openVideo.value = true;
      videoSrc.value = v.videoUrl;
    };
    // 获取视频列表
    let getVideoList = (page, pageNum, type) => {
      userInfo.value.Id?handelGetLikes(userInfo.value.Id):''
      let params = {
        page,
        pageNum,
        type,
      };
      getVideoInfo(params).then((res) => {
        console.log(res);
        if ((res.status = "000000")) {
          if(res.data.length > 0) isTrue.value = true
          if (type == "top") {
            let arr = []
            topVideo.value = res.data;
            topVideo.value.forEach((item,index)=>{
              nextTick(()=>{
                icon3.value[index].className = 'iconfont icon-xin'
              })
              likeList.value.forEach((v,i)=>{
                if(item.Id == v.videoId){
                  arr.push(index)
                }
              })
            })
            arr.forEach(item=>{
              nextTick(()=>{
                icon3.value[item].className = 'iconfont icon-xin icon-success'
              })
            })
          } else if (type == "first") {
            firstVideo.value = res.data;
          }else if (type == "latest") {
            latestVideo.value = res.data;
            let arr = []
            latestVideo.value.forEach((item,index)=>{
              nextTick(()=>{
                icon2.value[index].className = 'iconfont icon-xin'
              })
              likeList.value.forEach((v,i)=>{
                if(item.Id == v.videoId){
                  arr.push(index)
                }
              })
            })
            arr.forEach(item=>{
              nextTick(()=>{
                icon2.value[item].className = 'iconfont icon-xin icon-success'
              })
            })
          }else{
            allVideo.value = res.data;
            let totals = Math.ceil(res.total/8) * 10
            total.value = totals
            let arr = []
            allVideo.value.forEach((item,index)=>{
              nextTick(()=>{
                icon.value[index].className = 'iconfont icon-xin'
              })
              likeList.value.forEach((v,i)=>{
                if(item.Id == v.videoId){
                  arr.push(index)
                }
              })
            })
            arr.forEach(item=>{
              nextTick(()=>{
                icon.value[item].className = 'iconfont icon-xin icon-success'
              })
            })
          }
        }
      });
    };
    // 关闭视频
    let closeVideo = () => {
      videoSrc.value = "";
    };
    // 点赞
    let addLikes = (v,i,t)=>{
      if(userInfo.value.Id){
        if(t == '1'){
          if(icon.value[i].className == 'iconfont icon-xin'){
            handelLikes(v)
          }else{
            icon.value[i].className = 'iconfont icon-xin'
            cancelLikes(v)
          }
        }else if(t == '2'){
          if(icon2.value[i].className == 'iconfont icon-xin'){
            handelLikes(v)
          }else{
            icon2.value[i].className = 'iconfont icon-xin'
            cancelLikes(v)
          }
        }else if(t == '3'){
          if(icon3.value[i].className == 'iconfont icon-xin'){
            handelLikes(v)
          }else{
            icon3.value[i].className = 'iconfont icon-xin'
            cancelLikes(v)
          }
        }
      }else{
        ElMessage({
              showClose: true,
              message: '请先登录，3后自动跳转至登录页面。',
              type: "warning",
            });
        setTimeout(()=>{
          $router.push('/Login')
        },3000)
      }
    }
    // 点赞功能函数
    let handelLikes = (v)=>{
      let params ={
        videoId:v.Id,
        userId:userInfo.value.Id
      }
      addVideoFavorite(params).then(res=>{
        if (res.status == "000000") {
            topVideo.value.forEach((item,index)=>{
              if(item.Id == v.Id){
                icon3.value[index].className = 'iconfont icon-xin icon-success'
                item.videoLikes = item.videoLikes+1
                return
              }
            })
            allVideo.value.forEach((item,index)=>{
              if(item.Id == v.Id){
                icon.value[index].className = 'iconfont icon-xin icon-success'
                item.videoLikes= item.videoLikes+1
                return
              }
            })
            latestVideo.value.forEach((item,index)=>{
              if(item.Id == v.Id){
                icon2.value[index].className = 'iconfont icon-xin icon-success'
                return
              }
            })
          }else{
            ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          }
      })
    }
    // 取消点赞功能函数
    let cancelLikes = (v)=>{
      let params ={
        videoId:v.Id,
        userId:userInfo.value.Id
      }
      cancelVideoFavorite(params).then(res=>{
        if (res.status == "000000") {
           topVideo.value.forEach((item,index)=>{
              if(item.Id == v.Id){
                icon3.value[index].className = 'iconfont icon-xin'
                item.videoLikes = item.videoLikes-1
                return
              }
            })
            allVideo.value.forEach((item,index)=>{
              if(item.Id == v.Id){
                icon.value[index].className = 'iconfont icon-xin'
                item.videoLikes= item.videoLikes-1
                return
              }
            })
            latestVideo.value.forEach((item,index)=>{
              if(item.Id == v.Id){
                icon2.value[index].className = 'iconfont icon-xin'
                return
              }
            })
          }else{
            ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          }
      })
    }
    // 获取当前登陆人视频点赞列表
    let handelGetLikes = (id)=>{
      let params = {
          userId:id
        }
        getVideoLikes(params).then(res=>{
        if (res.status == "000000") {
          likeList.value = res.data
        }else{
          ElMessage({
            showClose: true,
            message: res.message?res.message:'网络错误，请稍后再试！',
            type: "warning",
          });
        }
      })
    }
    // 分页触发
    let handelPage = ()=>{
      getVideoList(page.value,8,'all')
    }
    return {
      openVideo,
      playVideo,
      videoSrc,
      allVideo,
      latestVideo,
      topVideo,
      firstVideo,
      closeVideo,
      isTrue,
      addLikes,
      icon,
      icon2,
      icon3,
      userInfo,
      likeList,
      total,
      page,
      handelPage
    };
  },
};
</script>
<style lang="less" scoped>
.icon-success{
  color: #ef0b0b;
}
.icon-xin:hover{
  color: #ef0b0b;
}
img {
  width: 250px;
  height: 150px;
}
video {
  width: 100%;
}
.bg {
  background: url("../../assets/image/76.jpeg") no-repeat center;
  background-size: 100% 100%;
  height: 700px;
  position: relative;
}
#container {
  color: #fff;
  background: #141311;
  font-family: "Libre Baskerville", serif;
  // background: #f0f0f0;
  padding: 50px 0 0 0;
  .box {
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin: auto;
    .header {
      // box-shadow: 0px 0px 5px 0px #252222;
    }
    .big {
      .zoom-container {
        height: 700px;
        img {
          height: 700px;
          width: 100%;
        }
      }
    }
    .all-header {
      margin: 20px 0;
    }
    .zoom-container {
      position: relative;
      height: 180px;
      overflow: hidden;
      img {
        width: 300px;
        height: 180px;
        transition: all 0.5s ease;
      }
    }
    .zoom-container:hover img {
      transform: scale(1.25);
    }
    .zoom-caption {
      width: 60px;
      height: 45px;
      position: absolute;
      border-radius: 15px;
      background: #000;
      opacity: 0.8;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }
    .zoom-caption:hover {
      background: #d20000e6;
    }
    .icon-bofang {
      width: 60px;
      height: 45px;
      text-align: center;
      line-height: 45px;
      display: inline-block;
      z-index: 10;
      font-size: 24px;
      color: #fff;
    }
    .vid-name {
      margin: 10px 0;
      font-size: 24px;
    }
    .desc {
      color: #dca341;
      width: 300px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden; //溢出内容隐藏
      text-overflow: ellipsis; //文本溢出部分用省略号表示
      display: -webkit-box; //特别显示模式
      -webkit-line-clamp: 2; //行数
      line-clamp: 2;
      -webkit-box-orient: vertical; //盒子中内容竖直排列
      //   height: 50px;
      //   line-height: 20px;
      font-size: 18px;
      margin: 4px 0;
    }
    .info {
      display: flex;
      margin: 5px 0 20px 0;
      justify-content: space-between;
      font-size: 24px;
      width: 4rem;
      .icon-rili,
      .icon-xin {
        font-size: 24px;
      }
    }
    .col-2-3 {
      width: 70%;
      .all {
        background: #141311;
        padding: 10px;
        position: relative;
        border: 1px solid #ebe7e7;
        .row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          .col-1-4 {
            margin-bottom: 20px;
            width: 25%;
            .info {
              margin: 20px 0;
            }
          }
          .perch {
            overflow: hidden;
            width: 250px;
          }
        }
      }
    }
    .col-1-3 {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      form {
        width: 90%;
        position: relative;
        .icon-sousuo {
          position: absolute;
          right: 0;
          font-size: 24px;
          line-height: 60px;
          top: 4px;
          height: 60px;
          border-left: 1px solid #ebe7e7;
          padding-left: 16px;
        }
        input {
          width: 100%;
          height: 60px;
          outline: none;
          border: 4px solid #dca341;
          padding-left: 10px;
          margin-bottom: 20px;
        }
      }
      .widget {
        width: 90%;
        .wid-header {
          // background-color: rgba(255, 230, 0,.5);
          padding: 2px 6px 2px 8px;
          margin: 15px 0;
          border: 4px solid #dca341;
          width: 100%;
          //   box-shadow: 0px 0px 5px 0px #252222;
          h2 {
            font-size: 28px;
            margin: 15px 0;
          }
          h5 {
            font-size: 28px;
            margin: 15px 0;
          }
          // width: 88%;
        }
        .wid-content {
          display: flex;
          width: 100%;
          flex-direction: column;
          padding: 20px 0 20px 20px;
          background-color: #141311;
          color: #fff;
          border: 1px solid #ddd;
          .wrapper {
            margin-left: 10px;
            .desc {
              //   font-size: 16px;
              //   margin: 10px 0;
            }
            .rili,
            .xin,
            .icon-rili,
            .icon-xin {
              font-size: 20px;
            }
            .rili {
              margin-right: 20px;
            }
          }
          .wid-news {
            display: flex;
            flex-direction: column;
            .desc {
              width: 100%;
              font-size: 20px;
            }
            img {
              width: 100%;
              height: 200px;
            }
            .info {
              width: 96%;
            }
            .zoom-container {
              height: 200px;
              overflow: hidden;
              width: 96%;
            }
            .zoom-box {
              position: relative;
              height: 160px;
            }
          }
          .wrap-vid {
            display: flex;
            height: 160px;
            .zoom-box {
              position: relative;
              height: 120px;
            }
            img {
              width: 180px;
              height: 120px;
            }
          }
        }
      }
    }
    .header {
      // background-color: #af75fe;
      padding: 2px 20px;
      margin-bottom: 15px;
      border: 4px solid #dca341;
      h2 {
        font-size: 30px;
        line-height: 25px;
        font-family: "Libre Baskerville", serif;
      }
    }
  }
  .navigation {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 5;
    margin: 10px 0 0 0;
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
}
.empty{
  margin: 50px auto;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
}
</style>