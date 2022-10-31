<template>
  <div class="home">
    <header class="animate__fadeIn animate__animated" ref="bg">
      <div class="title">ikobeclub</div>
      <div class="line"></div>
    </header>
    <!-- <div class="music">
      <div class="music_circle">
        <span>♬</span>
      </div>
      <div class="music_control">
        <div class="icon">
          <span class="iconfont icon-shangyishoushangyige animate__bounce animate__animated"></span>
          <span class="iconfont icon-24gl-play animate__bounce animate__animated animate__delay-1s" v-show="isPlay"></span>
          <span class="iconfont icon-24gl-pause animate__bounce animate__animated" v-show="!isPlay"></span>
          <span class="iconfont icon-xiayigexiayishou animate__bounce animate__animated animate__delay-2s"></span>
        </div>
        <div class="empty"></div>
      </div>
      <div class="music_platter">
        <div class="waves-block">
          <div class="waves wave-1"></div>
          <div class="waves wave-2"></div>
          <div class="waves wave-3"></div>
        </div>
        <img src="@/assets/image/cp.png" alt="" />
      </div>
    </div> -->
    <div class="honor">
      <h2 class="animate__slideInDown animate__animated">HONOR</h2>
      <div class="honor_cn">
        <span class="line"></span>
        <span class="title">荣誉简介</span>
        <span class="line"></span>
      </div>
      <p>5次NBA总冠军、2次奥运会金牌、2次总决赛MVP、2008年常规赛MVP</p>
      <p>4次全明星赛MVP、18次全明星、15次最佳阵容、12次最佳防守阵容</p>
      <p>2次得分王、得分、出场数、胜场数湖人队史第一（包括常规赛和季后赛）</p>
      <p>历史唯一的一位在一支队伍退役两个号码的球员、名人堂成员、一位父亲</p>
      <div class="honor_bg">
        <span class="strip strip_1"></span>
        <span class="strip strip_2"></span>
        <span class="strip strip_3"></span>
        <span class="strip strip_4"></span>
        <span class="strip strip_5"></span>
        <span class="strip strip_6"></span>
      </div>
    </div>
    <div class="career">
      <h2>CAREER</h2>
      <div class="career_cn">
        <span class="line"></span>
        <span class="title">生涯回顾</span>
        <span class="line"></span>
      </div>
      <p>鸿鹄远志，燕雀焉知，扶摇而上九霄后，引千鸟群游。</p>
      <p>帆船巨桅，舟筏不及，乘风而去千万里，领百舸争流。</p>
      <p>他在鞭策自己，也在勉励世人，他虽已遁入苍茫，但世人不会将他遗忘。</p>
      <div class="carrer_list">
        <div class="carrer_item_active" @click="goDetail">
          <span class="carrer_text">B</span>
          <span class="carrer_active">2015-16赛季</span>
        </div>
        <span
          v-for="(item, index) in carrerData"
          :key="index"
          @click="goDetail(item)"
          class="carrer_item"
          :class="'carrer_item' + item.title"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <div class="moment">
      <h2>MOMONT</h2>
      <div class="moment_cn">
        <span class="line"></span>
        <span class="title">夺冠瞬间</span>
        <span class="line"></span>
      </div>
      <p>
        洛城穹顶恣意飘扬的缤纷彩带似乎永不坠下，斯台普斯响遏行云的纵声欢呼也仿佛仍绕耳际
      </p>
      <el-carousel :interval="4000" type="card" height="300px" class="carousal">
        <el-carousel-item v-for="item in momentList" :key="item">
          <img :src="item.url" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="message">
      <div class="message_left">
        <div class="message_title">
          <span class="meaasge_name">Messa<span class="active">g</span>e</span>
          <span class="meaasge_line"></span>
          <p>
            留下你想对科比说的话吧...
          </p>
          <el-button color="#626aef" plain size="large" class="btn" @click="goMessage">message</el-button>
        </div>
      </div>
      <div class="message_right">
        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in messageList"
            :timestamp="item.messageTime"
            placement="top"
          >
            <el-card>
              <div class="card">
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
                    <i ref="icon" class="iconfont icon-xin"></i>
                <span>{{ item.like_number }}</span>
                  </p>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <div class="about">
      <div class="bg">
          <div class="con">
            <span class="title">About what I want to say to </span>
            <p class="title_active">Kobe</p>
            <div class="con_desc">
              <p>
                要问科比 对我 来说意味着什么。
              </p>
              <p>我想在很多90后心里大概都会有这样的一个感觉就是：</p>
              <p>科比可能是世界上最爱篮球的人了，是那种最纯粹的热爱。</p>
              <p>这热爱不掺杂商业利益，不在乎虚无缥缈的历史排位，而只在于磨练技术，并在乎每场比赛的输赢。</p>
              <p>为了篮球他愿意倾尽一切，只要是跟篮球有关的事情，他都尽全力做到最好...<span @click="goAbout">更多</span></p>
            </div>
          </div>
      </div>
      <img src="@/assets/image/about.png" alt="">
    </div>
    <footer>
      <p>Copyright © 2022 ikobe. All rights reserved.</p>
    </footer>
  </div>
</template>
<script>
import "../../assets/iconfont/iconfont.css";
import "animate.css";
import { onMounted, getCurrentInstance, computed, watch,onUnmounted, ref } from "vue";
import{useRouter} from "vue-router"
import { getMessageInfo } from "../../request/request";
export default {
  setup() {
    onMounted(()=>{
      let params = {
        page:'1',
        pagenum:'3',
        top:true
      }
      getMessageInfo(params).then(res=>{
        if(res.status=='000000'){
          messageList.value = res.data
        }else{
          ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
        }
      })
    })
    const isPlay = ref(true);
    const isShow = ref(false);
    const carrerData = ref([
      {title:"L",time:'2014-15赛季'},
      {title:"A",time:'2013-14赛季'},
      {title:"C",time:'2012-13赛季'},
      {title:"K",time:'2011-12赛季'},
      {title:"M",time:'2010-11赛季'},
      {title:"A",time:'2009-10赛季'},
      {title:"M",time:'2008-09赛季'},
      {title:"B",time:'2007-08赛季'},
      {title:"A",time:'2006-07赛季'},
      {title:"K",time:'2005-06赛季'},
      {title:"O",time:'2004-05赛季'},
      {title:"B",time:'2003-04赛季'},
      {title:"E",time:'2002-03赛季'},
      {title:"L",time:'2001-02赛季'},
      {title:"L",time:'2000-01赛季'},
      {title:"E",time:'1999-00赛季'},
      {title:"G",time:'1998-99赛季'},
      {title:"E",time:'1997-98赛季'},
      {title:"NT",time:'1996-97赛季'},
    ]);
    const momentList = ref([
      {
        url: require("@/assets/image/ikobe2000.jpg"),
        describe: "1999-00赛季总冠军",
        time: "",
      },
      {
        url: require("@/assets/image/ikobe2001.jpg"),
        describe: "2000-01赛季总冠军",
        time: "",
      },
      {
        url: require("@/assets/image/ikobe2002.jpg"),
        describe: "2001-02赛季总冠军",
        time: "",
      },
      {
        url: require("@/assets/image/ikobe2009.jpg"),
        describe: "2008-09赛季总冠军",
        time: "",
      },
      {
        url: require("@/assets/image/ikobe2010.jpg"),
        describe: "2009-10赛季总冠军",
        time: "",
      },
      {
        url: require("@/assets/image/ikobe2008.jpg"),
        describe: "2008年北京奥运会金牌",
        time: "",
      },
    ]);
    const messageList = ref([
    ]);
    const $router = useRouter()
    let goAbout = ()=>{
      $router.push('/About')
    }
    let goMessage =()=>{
      $router.push('/LeaveMessage')
    }
    let goDetail=(v)=>{
      console.log(v)
      if(v.time){
        $router.push({name:'Review',params:{
            id:v.time
        }})
      }else{
        $router.push({name:'Review',params:{
            id:'2015-16赛季'
        }})
      }
    }
    return {
      isPlay,
      carrerData,
      momentList,
      messageList,
      isShow,
      goAbout,
      goMessage,
      goDetail,
    };
  },
};
</script>
<style lang="less" scoped>
.home {
  header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 1000px;
    background: url("../../assets/image/about.webp") center no-repeat;
    background-size: 100%;
    .title {
      /* 网站名称 */
      font-family: "Times New Roman", Times, serif;
      font-size: 35px;
      font-style: oblique;
      font-weight: bold;
      letter-spacing: 5px;
      color: #fff;
    }
    .line {
      width: 60%;
      height: 2px;
      background: #fff;
    }
  }
  // .music {
  //   display: flex;
  //   justify-content: space-evenly;
  //   align-items: center;
  //   margin-top: 100px;
  //   .music_circle {
  //     position: relative;
  //     height: 300px;
  //     width: 307px;
  //     background: url("../../assets/image/cricle.png") center no-repeat;
  //     background-size: 100%;
  //     span {
  //       position: absolute;
  //       left: 50%;
  //       top: 50%;
  //       transform: translate(-50%, -50%);
  //       border-radius: 50%;
  //       width: 65px;
  //       height: 65px;
  //       text-align: center;
  //       line-height: 65px;
  //       background: #3e1b6b;
  //       font-size: 23px;
  //       color: #ffe500;
  //     }
  //   }
  //   .music_platter {
  //     img {
  //       width: 250px;
  //     }
  //     transform: translate(-250px, 0);
  //     position: relative;
  //     @keyframes waves {
  //       0% {
  //         -webkit-transform: scale(0.5, 0.5);
  //         transform: scale(0.5, 0.5);
  //         opacity: 0;
  //         -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  //       }
  //       50% {
  //         opacity: 0.9;
  //         -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)";
  //       }
  //       100% {
  //         -webkit-transform: scale(0.9, 0.9);
  //         transform: scale(0.9, 0.9);
  //         opacity: 0;
  //         -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  //       }
  //     }
  //     .waves-block {
  //       position: absolute;
  //       width: 600px;
  //       height: 600px;
  //       right: -240px;
  //       top: 50%;
  //       -webkit-transform: translateY(-50%);
  //       // transform: translateY(-50%);
  //       z-index: 2;
  //       transform: translate(-50%, -50%);
  //       left: 50%;
  //       .waves {
  //         position: absolute;
  //         width: 100%;
  //         height: 100%;
  //         background: rgba(54, 39, 133, 0.2);
  //         opacity: 0;
  //         -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  //         border-radius: 50%;
  //         background-clip: padding-box;
  //         -webkit-animation: waves 3s ease-in-out infinite;
  //         animation: waves 3s ease-in-out infinite;
  //       }
  //       .wave-1 {
  //         -webkit-animation-delay: 0s;
  //         animation-delay: 0s;
  //       }
  //       .wave-2 {
  //         -webkit-animation-delay: 1s;
  //         animation-delay: 1s;
  //       }
  //       .wave-3 {
  //         -webkit-animation-delay: 2s;
  //         animation-delay: 2s;
  //       }
  //     }
  //   }
  //   .music_control {
  //     transform: translate(-230px, 0px);
  //     height: 220px;
  //     opacity: 0.8;
  //     .icon {
  //       width: 750px;
  //       height: 220px;
  //       background: linear-gradient(
  //           180deg,
  //           #ffffff 0%,
  //           #ffffff 0%,
  //           rgba(216, 216, 216, 0) 100%,
  //           rgba(216, 216, 216, 0) 100%
  //         ),
  //         #af75fe;
  //       box-sizing: border-box;
  //       border: 1px solid #ffffff;
  //       display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       .iconfont {
  //         width: 73px;
  //         height: 73px;
  //         border-radius: 20px;
  //         background: #af75fe;
  //         box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
  //         color: #ffffff;
  //         font-size: 30px;
  //         text-align: center;
  //         line-height: 73px;
  //         margin: 0 13px;
  //       }
  //     }
  //     .empty {
  //       width: 750px;
  //       height: 220px;
  //       box-sizing: border-box;
  //       border: 5px solid #ffe500;
  //       transform: translate(60px, -250px);
  //     }
  //   }
  // }
  .honor {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 60px;
      letter-spacing: 0em;
      font-weight: 400;
      color: #3e1b6b;
      margin: 0;
    }
    .honor_cn {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 500px;
      margin-bottom: 20px;
      .line {
        width: 100px;
        height: 3px;
        background: #dddbdb;
      }
      .title {
        color: #fcd714;
        font-size: 30px;
        font-weight: 500;
      }
    }
    p {
      width: 1600px;
      font-family: "Times New Roman", Times, serif;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 0em;
      margin-bottom: 15px;
      text-align: center;
    }
    .honor_bg:after{
			position: absolute;
			left: -10px;                    /*改变left的值，让其相对box影藏*/
			top: 0;
			width: 5%;
			height: 100%;
			content: "";
			/* Safari 5.1 - 6.0 */
		  background: -webkit-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.5) 50%,rgba(255,255,255,0) 100%);
		  /* Opera 11.1 - 12.0 */
		  background: -o-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.5) 50%,rgba(255,255,255,0) 100%);
		  /* Firefox 3.6 - 15 */
		  background: -moz-linear-gradient(left,rgba(255,255,255,0) 0,rgba(255,255,255,.5) 50%,rgba(255,255,255,0) 100%);
		  /* 标准的语法 */
		  background: linear-gradient(to right,rgba(255,255,255,0) 0,rgba(255,255,255,.5) 50%,rgba(255,255,255,0) 100%);
	    transform: skewX(-30deg);
      animation:light 4s linear infinite;
		}
    @keyframes light
      {
        0%   {left:0%;}
        25%  {left:25%;}
        50%  {left:50%;}
        100% {left:85%;}
      }
    .honor_bg {
      position: relative;
      height: 400px;
      width: 100%;
      background-size: 50%;
      background:url("../../assets/image/ikobe.png") center no-repeat;
      display: flex;
      color: #fff;
      justify-content: space-around;
      .strip {
        width: 50px;
        height: 450px;
        background: #ffffff;
        transform: rotate(20deg);
        transform-origin: 173% 41%;
      }
    }
  }
  .career {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
     .carrer_list{
        z-index: 100;
      }
    .career_cn {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 500px;
      margin-bottom: 20px;
      .line {
        width: 100px;
        height: 3px;
        background: #dddbdb;
        z-index: 10;
        cursor: pointer;
      }
      .title {
        color: #fcd714;
        font-size: 30px;
        font-weight: 500;
      }
    }
    h2 {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 60px;
      letter-spacing: 0em;
      font-weight: 400;
      color: #3e1b6b;
      margin: 0;
    }
    p {
      width: 1600px;
      font-family: "Times New Roman", Times, serif;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 0em;
      margin-bottom: 15px;
      text-align: center;
    }
    .carrer_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      width: 1250px;
      .carrer_item_active {
        background: #3e1b6b;
        color: #fff;
        box-sizing: border-box;
        box-shadow: -4px -4px 15px 0px #000000;
        width: 250px;
        height: 150px;
        text-align: center;
        font-size: 70px;
        font-weight: 700;
        border: 1px solid #000000;
        position: relative;
        .carrer_active {
          font-size: 16px;
          display: block;
          position: absolute;
          bottom: 15px;
          width: 250px;
          left: 0;
        }
        .carrer_text {
          display: block;
          height: 150px;
          line-height: 150px;
          cursor: pointer;
        }
      }
      .carrer_item_active:hover .carrer_text{
        background: url('../../assets/image/96.jpg') no-repeat center;
        background-size: 100%;
        transition: .5s;
      }
      .carrer_itemL:hover{
        background: url('../../assets/image/97.png') no-repeat center;
        background-size: 100%;
      }
      .carrer_itemC:hover{
        background: url('../../assets/image/99.png') no-repeat center;
        background-size: 100%;
        transform: translate(50px);
        transition: 1s;
      }
      .carrer_item:nth-of-type(2):hover{
        background: url('../../assets/image/98.png') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(4):hover{
        background: url('../../assets/image/00.jpg') no-repeat center;
        transform: translate(-50px);
        background-size: 100%;
      }
      .carrer_item:nth-of-type(5):hover{
        background: url('../../assets/image/01.jpg') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(6):hover{
        background: url('../../assets/image/02.png') no-repeat center;
        background-size: 100% 100%;
        transform: scale(1.5);
      }
      .carrer_item:nth-of-type(7):hover{
        background: url('../../assets/image/03.jpg') no-repeat center;
        background-size: 100% 100%;
        transform: translate(50px);
      }
      .carrer_item:nth-of-type(8):hover{
        background: url('../../assets/image/04.jpeg') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(9):hover{
        background: url('../../assets/image/05.png') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(10):hover{
        background: url('../../assets/image/06.png') no-repeat center;
        background-size: 100% 100%;
        transform: scale(1.5);
      }
      .carrer_item:nth-of-type(11):hover{
        background: url('../../assets/image/07.png') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(12):hover{
        background: url('../../assets/image/08.jpeg') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(13):hover{
        background: url('../../assets/image/09.jpeg') no-repeat center;
        background-size: 100% 100%;
        transform: scale(1.5);
      }
      .carrer_item:nth-of-type(14):hover{
        background: url('../../assets/image/10.png') no-repeat center;
        background-size: 100% 100%;
      }
      .carrer_item:nth-of-type(15):hover{
        background: url('../../assets/image/11.jpg') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(16):hover{
        background: url('../../assets/image/12.jpg') no-repeat center;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(17):hover{
        background: url('../../assets/image/13.jpg') no-repeat center;
        background-size: 100% 100%;
        transform: scale(1.5);
      }
      .carrer_item:nth-of-type(18):hover{
        background: url('../../assets/image/14.jpeg') no-repeat center;
        background-size: 100%;
        // transform: scale(1.5);
      }
      .carrer_item:nth-of-type(19):hover{
        background: url('../../assets/image/15.jpeg') no-repeat center;
        background-size: 100% 100%;
        transform: scale(1.5);
      }
      .carrer_item {
        cursor: pointer;
        width: 250px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        font-size: 70px;
        font-weight: 700;
        border: 1px solid #000000;
        transition: .5s;
      }
      .carrer_item:nth-of-type(2) {
        background: #fcd714;
        color: #fff;
        box-shadow: -4px -4px 15px 0px #000000;
      }
      .carrer_item:nth-of-type(11) {
        background: url("../../assets/image/bal.png") no-repeat center;
        box-shadow: -4px -4px 15px 0px #000000;
        text-indent: -9999px;
        background-size: 50%;
      }
      .carrer_item:nth-of-type(14) {
        background: url("../../assets/image/logo.png") no-repeat center;
        box-shadow: -4px -4px 15px 0px #000000;
        text-indent: -9999px;
        background-size: 100%;
      }
      .carrer_item:nth-of-type(17) {
        background: #fcd714;
        color: #fff;
        box-shadow: -4px -4px 15px 0px #000000;
      }
      .carrer_item:last-of-type {
        background: #3e1b6b;
        color: #fff;
        box-shadow: -4px 4px 15px 0px #000000;
      }
    }
  }
  .moment {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #1c1d21;
    .moment_cn {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 500px;
      margin-bottom: 20px;
      .line {
        width: 100px;
        height: 3px;
        background: #dddbdb;
      }
      .title {
        color: #fcd714;
        font-size: 30px;
        font-weight: 500;
      }
    }
    h2 {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-size: 60px;
      letter-spacing: 0em;
      font-weight: 400;
      color: #3e1b6b;
      margin: 0;
    }
    p {
      width: 1600px;
      font-family: "Times New Roman", Times, serif;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 0em;
      color: #fff;
      margin-bottom: 15px;
      text-align: center;
    }
    .carousal {
      width: 1200px;
    }
    .el-carousel__indicator {
      .el-carousel__button {
        background-color: #fcd714 !important;
      }
    }
  }
  .message {
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .message_left {
      border: 4px solid #000000;
      border-radius: 10px;
      width: 700px;
      height: 320px;
      .message_title {
        border: 4px solid #3e1b6b;
        border-radius: 10px;
        width: 700px;
        height: 320px;
        transform: translate(20px, 20px);
        p{
          font-size: 24px;
          text-align: center;
        }
        .btn{
          margin: 50px 0 0 400px;
        }
        .meaasge_name {
          font-size: 60px;
          font-weight: bold;
          text-shadow: 2px 2px 4px #000000;
          margin: 50px 40px;
          .active {
            color: #fcd714;
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial,
              sans-serif;
            font-size: 70px;
          }
        }
        .meaasge_line {
          width: 372px;
          height: 0px;
          border-top: 10px solid #373434;
          display: block;
          margin-left: 100px;
        }
      }
    }
    .message_right {
      .el-timeline-item:nth-of-type(2) .el-card{
         background: linear-gradient(
            180deg,
            #ffffff 0%,
            #ffffff 0%,
            rgba(216, 216, 216, 0) 100%,
            rgba(216, 216, 216, 0) 100%
          ),
          #3e1b6b;
      }
      .el-timeline-item:nth-of-type(1) .el-card{
         background: linear-gradient(
            180deg,
            #ffffff 0%,
            #ffffff 0%,
            rgba(216, 216, 216, 0) 100%,
            rgba(216, 216, 216, 0) 100%
          ),
          #fcd714;
      }
      .el-timeline-item:nth-of-type(3) .el-card{
         background: linear-gradient(
            180deg,
            #ffffff 0%,
            #ffffff 0%,
            rgba(216, 216, 216, 0) 100%,
            rgba(216, 216, 216, 0) 100%
          ),
          #000000;
      }
      .card {
        display: flex;
        justify-content: space-around;
        color: #000000;
        font-family: PingFang SC;
        opacity: 0.85;
        .con {
          width: 730px;
          padding: 0 10px;
          .logo {
            margin: 8px 0 0 0;
            i {
              font-size: 26px;
              color: #ff0000;
            }
            .item {
              margin-right: 20px;
            }
          }
          div {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            opacity: 0.85;
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
  }
  .about{
    margin: 100px auto;
    width: 1250px;
    background: #3e1b6b;
    height: 600px;
    position: relative;
    .bg{
      width: 1000px;
      height: 550px;
      background: #ffffff;
      position: absolute;
      top: 50px;
      border-radius: 0 40% 0 0;
      .con{
        position:absolute;
        top: 50px;
        height: 450px;
        width: 900px;
        border-left: 10px solid #fcd714;
        border-bottom: 10px solid #fcd714;
        padding: 50px 0 0 10px;
        .title{
          font-weight: 600;
          font-size: 50px;
          text-shadow: 2px 2px 4px #000000;
        }
        .title_active{
          font-size: 60px;
          color: #3e1b6b;
          margin-left: 500px;
          background: #fcd714;
        }
        .con_desc{
          margin-top: -40px;
          p{
            font-size: 20px;
            span{
              color: #3e1b6b;
              cursor: pointer;
              font-weight: 600;
            }
          }
        }
      }
    }
    img{
      position: absolute;
    right: 0;
    width: 520px;
    }
  }
  footer{
    p{
      padding: 50px;
      text-align: center;
      background: #1c1d21;
      color: #ffffff;
      letter-spacing: 1px;
      font-size: 18px;
      font-family: 'Montserrat', sans-serif;
    }
  }
}
</style>