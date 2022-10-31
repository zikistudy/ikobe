<template>
  <div class="review">
    <div class="header"></div>
    <div class="review_con">
     
      <div class="review_tab">
        <el-tabs
          tab-position="left"
          v-model="activeName"
        >
          <el-tab-pane
            :label="item.time"
            :name="item.time"
            v-for="(item, index) in reviewList"
            :key="index"
          >
            <div class="animate__slideInDown animate__animated con" v-html="item.con">
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="review_title">
        <div 
        >生</div
      >
      <div 
        >涯</div
      >
      <div 
        >回</div
      >
      <div
        >顾</div
      >
      <img src="@/assets/image/ss.jpg" alt="">
      </div>
    </div>
     <footer>
      <p>Copyright © 2022 ikobe. All rights reserved.</p>
    </footer>
  </div>
</template>
<script>
import "animate.css";
import { getReviewList} from "../../request/request";
import { onMounted,onBeforeUnmount, getCurrentInstance, computed, watchEffect, ref,reactive, } from "vue";
import{useRouter} from "vue-router"
export default {
  setup() {
    const value = ref(0)
    const activeName = ref('1996-97赛季')
    const reviewList = ref([])
    const $router = useRouter()
    onMounted(()=>{
      getReviewList().then((res)=>{
        if (res.status == "000000") {
          res.data.forEach(item => {
            item.con = item.con.replace(/\n/g, '<br/>')
          });
          reviewList.value = res.data
          activeName.value = $router.currentRoute.value.params.id?$router.currentRoute.value.params.id:'1996-97赛季'
          }else{
            ElMessage({
              showClose: true,
              message: res.message,
              type: "warning",
            });
          }
      })
    })
    return{
      value,
      activeName,
      reviewList
    }
  }
};
</script>
<style lang="less">
.review {
  .header{
    background: url("../../assets/image/bb.webp") center no-repeat;
    background-size: 100% 100%;
    height: 700px;
  position:relative;
    
  }
  .review_con {
    width: 85%;
    margin: 50px 0;
    position: relative;
    // padding: 20px;
    // box-shadow: 0px 0px 20px -10px #000000;
    .con {
      font-size: 20px;
      line-height: 34px;
      // margin-top: 15px;
    }
    span {
      // margin-top: 200px;
    }
  }
  .review_title {
    position: absolute;
    right: -188px;
    top: 40px;
    z-index: 5;
    background: #f1be0d;
    padding: 20px;
    // margin-left: 500px;
    // width: 700px;
    // height: 80px;
    font-family: YouSheBiaoTiHei;
    font-size: 144px;
    font-weight: normal;
    // line-height: 34px;
    letter-spacing: 0em;
    box-sizing: border-box;
    color: #fff;
    text-shadow: 1px 1px #a731dc, -1px -1px #a731dc, 1px -1px #a731dc, -1px 1px #a731dc;
    box-shadow: 5px 0px 10px #807a7a;
    img{
    width: 170px;
    position: absolute;
    right: 0;
    top: 25px;
    }
  }
  .review_tab {
    .bg {
      width: 260px;
    }
    .el-tabs__header {
      background: linear-gradient(to right, #452d5e , #2a1746);;
      height: 640px;
      /* padding: 20px 10px; */
      position: relative;
      top: -20px;
      z-index: 1;
      left: 70px;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.3);
    }
    .el-tabs__nav-prev,
    .el-tabs__nav-next {
      left: 0 !important;
      .el-icon {
        font-size: 20px;
        color: #5a03c7;
      }
    }
    .el-tabs__content {
      background: #f5f5f5;
      height: 750px;
      padding: 40px 20px;
      z-index: 4;
      // color: #FFFAFA;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.8);
    }
    .el-tabs__nav {
      width: 260px;
    }
    p {
      text-indent: 28px;
      font-size: 20px;
    }
    .el-tabs--left {
      overflow: inherit;
    }
    .el-tab-pane {
      font-size: 16px;
      // color: #fff;
      line-height: 28px;
      // text-indent: 28px;
      padding: 10px;
      box-sizing: border-box;
      border: 8px solid #3D3D3D;
      height: 740px;
      overflow: auto;
    }
    // 滚动条样式
    .el-tab-pane::-webkit-scrollbar {
      width: 1px;
      /*height: 4px;*/
    }
    .el-tab-pane::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.2);
    }
    .el-tab-pane::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .el-tabs__nav-wrap {
      padding: 36px 36px 50px 36px !important;
    }
    .el-tabs__nav-scroll {
      border: 8px solid #f1be0d;
    }
    .el-tabs__item {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
      font-family: 'Courier New', Courier, monospace;
    }
    .el-tabs__item.is-active {
      color: #7705da;
      font-size: 24px;
      font-weight: bold;
    }
    .el-tabs__active-bar {
      background: #7705da;
    }
    .el-tabs__item:hover {
      color: #7705da;
    }
    .el-tabs__nav-next{
      bottom: -5px !important;
      .el-icon{
        font-size: 24px;
      }
    }
    .el-tabs__nav-prev{
       .el-icon{
        font-size: 24px;
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
}
</style>
