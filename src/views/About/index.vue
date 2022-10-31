<template>
  <div class="about">
    <header>
      <!-- <vue-particles
        color="#ffe500"
        :particleOpacity="0.7"
        :particlesNumber="180"
        shapeType="circle"
        :particleSize="4"
        linesColor="#aa6bff"
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
      </vue-particles> -->
      <div class="header_bg animate__fadeIn animate__animated"></div>
      <div class="site-title-table">
        <div class="site-title-tablecell">
          <div class="slide-text animate__fadeIn animate__animated">
            <h2 class="animate__backInDown animate__animated"><span>B</span>e<span>L</span>egend</h2>
            <p class="animate__backInUp animate__animated">
              The moment you give up, is the moment you let someone else win.
            </p>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="container">
        <!-- <div class="row"> -->
        <div class="col-md-12">
          <div class="maincotnent shadow-z-1">
            <div class="row">
              <div class="col-md-10 col-md-offset-1">
                <div class="article-list">
                  <div class="entry-title">
                    <p>who we are?</p>
                    <h2>About the LEGEND</h2>
                  </div>

                  <div class="entry-featured-content shadow-z-2">
                    <img
                      class="img-responsive"
                      src="@/assets/image/ikobe2.jpg"
                      alt=""
                    />
                  </div>

                  <div class="entry-content">
                    <p>
                    北京时间2020年1月27日凌晨，当我的手机消息声音不断的响了又响，我从梦中睁开双眼，看着手机的消息，一条条科比遇难的消息向我袭来，我还没做好准备，我还没来得及反应，
我告诉我自己，这肯定是假的，但是当我打开社交软件确认时，看到的都是铺天盖地科比遇难的消息，我才知道这不是梦，却对于我来说就是个噩梦，那一刻，十多年的崇拜和喜爱化作泪水
，潸然泪下，我没法控制，我记得枕头都被打湿了，第一次体会到，眼泪止不住的流是什么感觉，我那时多么希望这一切都是假的啊，为什么这么优秀的一个人会以这样的方式退出这个世界，
我抱怨上天是多么的不公啊。以至于 接下来 的很长时间，我都无法 接受。
                    </p>

                    <p>
                      一生很短，短得来不及拥抱清晨，就已经手握黄昏。那一天对于现在的我来说也是永生难忘的一天，它终将在我的记忆深处长眠。
要问科比 对我 来说意味着什么，我想在很多90后心里大概都会有这样的一个感觉就是：科比可能是世界上最爱篮球的人了，是那种最纯粹的热爱。这热爱不掺杂商业利益，
不在乎虚无缥缈的历史排位，而只在于磨练技术，并在乎每场比赛的输赢。为了篮球他愿意倾尽一切，只要是跟篮球有关的事情，他都尽全力做到最好。
他想投进每一个球，赢每一场比赛，比任何人都强。
                    </p>

                    <blockquote>
                      <p>
                        他的狂放不羁，他的偏执，他的坚强还有他的曼巴精神，他身上一切优秀的品质，早已扎根在每个人的内心。
可以肯定的是，无论你是否认可和推崇他的方式，你都被他激励过。科比以他的偏执极致之心，把他强盛的精神意志化作了图腾象征，超越篮球甚至竞技体育之上。
我们一生会遇到很多人，每个人都只能陪我们走一段路，然而在分别之前，我们都会以为，有的人会一直在。
非常喜欢杨毅说的这段话“世人皆苦，你不能逼人再吃苦药，还告诉他这是迈向成功的必由之路。但如果有人想成为科比，或想拥抱科比式的生活，我愿意对此脱帽致敬，
庸碌的人群中必须有一些野兽，他们就要像《月亮与六便士》里的思特里克兰德一样活得没有规矩，活得那么不符合逻辑。思特里克兰德只是毛姆内心虚拟的那头野兽，而科比却真实存在。”
在时光的列车里，科比提前走下站台，却留下了他的传奇故事。
                      </p>
                    </blockquote>

                    <p>
                      人生真的很短暂，有一道光不断指引你前行时，让你不会迷失方向。有这样一个人，他告诉你，努力是唯一能改变你糟糕一生的东西，告诉你，孤独不可怕，可怕的是畏惧孤独
告诉你，珍惜自己理念，无所畏惧的追求想要的事物，爱情，这是多么美好的一件事。我很幸运在我的时代，拥有科比。
而我，创建这个网站，也是想把科比 的故事说给 更多人 听 ，哪怕只有一个观众，我也愿意奉献我所有 的精力去 告诉那些喜欢 他的人。
想你了，老大 ...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </section>
    <footer>
      <p>Copyright © 2022 ikobe. All rights reserved.</p>
    </footer>
  </div>
</template>
<script>
import "animate.css";
export default {
  setup() {},
};
</script>
<style lang="less" scoped>
.about {
  header {
    position: relative;
    height: 700px;
    .header_bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      // z-index: -10;
      background: url("../../assets/image/homebg.png") no-repeat 0;
      background-size: 100% 180%;
      border-bottom: 6px solid #9909f3;
    }
    .site-title-table {
      color: #fff;
      display: table;
      font-size: 18px;
      left: 0;
      position: absolute;
      text-align: center;
      top: 200px;
      width: 100%;
      z-index: 2;
      .site-title-tablecell {
        display: table-cell;
        vertical-align: middle;
        .slide-text {
          margin: 0 auto;
          max-width: 700px;
        }
        .slide-text h2 {
          font-size: 83px;
          font-weight: 300;
        }
        .slide-text h2 span {
          color: #fff;
          font-weight: 700;
        }
      }
    }
  }
  section {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    width: 1200px;
    .col-md-12 {
      position: relative;
      min-height: 1px;
      padding-right: 15px;
      padding-left: 15px;
      width: 100%;
      img {
        display: block;
        max-width: 70%;
        margin: auto;
        height: auto;
      }
      .maincotnent {
        background: #fafafa none repeat scroll 0 0;
        margin-top: -65px;
        position: relative;
        z-index: 9;
        box-shadow: 0px 0px 20px -10px #000000;
        .entry-title {
          margin-bottom: 30px;
          text-transform: uppercase;
          text-align: center;
        p {
          padding-top: 30px;
          font-size: 16px;
          font-weight: 100;
          color: #424242;
        }
        }
        h2 {
          font-size: 34px;
          margin-bottom: 10px;
          color: #424242;
        }
        .entry-content blockquote {
          border-left:8px solid #aa6bff;
          font-size: 20px;
          margin-bottom: 20px;
          margin-top: 20px;
          padding: 0 0 0 20px;
        }
        .entry-content{
          padding: 20px 50px;
          line-height: 28px;
          font-weight: 300;
          font-size: 20px;
        }
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