<template>
  <div style="height: 100%">
    <dv-loading class="total" style="position: absolute; z-index: 5" ref="load"
      >Loading...</dv-loading
    >
    <div class="total">
      <div class="header">
        <div class="aside aside_left">
          <dv-decoration-8
            style="width: 300px; height: 50px"
            :color="['#fcd714', '#fff']"
          />
          <dv-decoration-4
            :reverse="true"
            style="width: 250px; height: 5px"
            :color="['#fcd714', '#fff']"
            :dur="4"
          />
        </div>
        <div class="center">
          <dv-decoration-7
            style="width: 300px; height: 30px"
            :color="['#fcd714', '#fff']"
            >全国科密分布图</dv-decoration-7
          >
          <dv-decoration-5
            style="width: 300px; height: 30px"
            :color="['#fcd714', '#fff']"
            :dur="4"
          />
        </div>
        <div class="aside aside_right">
          <dv-decoration-4
            :reverse="true"
            style="width: 250px; height: 5px"
            :color="['#fcd714', '#fff']"
            :dur="4"
          />
          <dv-decoration-8
            :reverse="true"
            style="width: 300px; height: 50px"
            :color="['#fcd714', '#fff']"
          />
        </div>
      </div>
      <div class="content">
        <div class="content_left">
          <dv-border-box-8
            :color="['#fcd714', '#fff']"
            style="width: 100%; height: 14%"
            ref="key"
          >
            <div class="content_users">
              <div class="users users_left users_title">
                <span>注册用户人数</span>
                <span>在线用户人数</span>
              </div>
              <div class="users users_left">
                <span>100</span>
                <span>20</span>
              </div>
            </div>
          </dv-border-box-8>
          <dv-border-box-1
            :color="['#fcd714', '#fff']"
            style="width: 100%; height: 43%"
          >
            <div class="content_age">科密各年龄段占比(单位:%)</div>
            <dv-scroll-ranking-board :config="config" />
          </dv-border-box-1>
          <dv-border-box-12
            :color="['#fcd714', '#fff']"
            style="width: 100%; height: 43%"
            ref="key1"
          >
            <div class="content_place">科密各地区占比(单位:%)</div>
            <dv-scroll-board :config="config2" />
          </dv-border-box-12>
        </div>
        <div class="content_center" @contextmenu.prevent="show">
          <dv-border-box-11
            :title="title"
            :color="['#fcd714', '#000']"
            style="width: 100%; margin: auto; overflow: hidden;height:100%"
            ref="key2"
          >
            <div
              ref="echart"
              style="width: 100%; height: 90%; top: 60px"
            ></div>
          </dv-border-box-11>
        </div>
        <div class="content_right">
          <dv-border-box-8
            :reverse="true"
            :color="['#fcd714', '#fff']"
            style="width: 100%; height: 14%"
            ref="key3"
          >
            <div class="content_users">
              <div class="users users_right users_title">
                <span>注册用户人数</span>
                <span>在线用户人数</span>
              </div>
              <div class="users users_right">
                <span>100</span>
                <span>20</span>
              </div>
            </div>
          </dv-border-box-8>
          <dv-border-box-1
            :color="['#fcd714', '#fff']"
            style="width: 100%; height: 43%"
          >
            <div
              ref="ring"
              style="width: 100%; height: 100%; left: 20px; top: 20px"
            ></div>
          </dv-border-box-1>
          <dv-border-box-6
            :color="['#fcd714', '#fff']"
            style="width: 100%; height: 43%"
            ref="key4"
          >
            <div
              ref="heart"
              style="width: 100%; height: 100%; margin: auto"
            ></div>
          </dv-border-box-6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref, nextTick } from "vue";
import * as echarts from "echarts";
import axios from "axios";
export default {
  name: "data_page",
  setup() {
    const mapJson = ref();
    const echart = ref();
    const myChart = ref();
    const config = ref();
    const config2 = ref();
    const ring = ref();
    const heart = ref();
    const key = ref();
    const key1 = ref();
    const key2 = ref();
    const key3 = ref();
    const key4 = ref();
    const title = ref("中国");
    const load = ref();
    const locationData = ref([]);
    const locationProvince = ref();
    onMounted(() => {
      setTimeout(() => {
        load.value.$el.style = "display:none;";
      }, 500);
      config.value = {
        data: [
          {
            name: "90后",
            value: 55,
          },
          {
            name: "80后",
            value: 30,
          },
          {
            name: "00后",
            value: 5,
          },
          {
            name: "70后",
            value: 5,
          },
          {
            name: "10后",
            value: 3,
          },
          {
            name: "其他",
            value: 2,
          },
        ],
      };
      config2.value = {
        data: [
          ["1", "浙江", "20"],
          ["2", "江苏", "15"],
          ["3", "广东", "10"],
          ["4", "安徽", "8"],
          ["5", "湖北", "8"],
          ["6", "山西", "5"],
          ["7", "河南", "5"],
          ["8", "广西", "3"],
          ["9", "山东", "2"],
          ["10", "吉林", "2"],
        ],
        oddRowBGC: "",
        evenRowBGC: "",
      };
      ageInit();
      fiveHeartInit();
      getLocation();
      setTimeout(() => {
        pieOutlineFunc();
        getMapJsonData("100000", "中国");
      }, 450);
    });
    // 男女比例初始化
    let ageInit = () => {
      var myChart = echarts.init(ring.value);
      var option;
      option = {
        title: {
          text: "科密男女比例图",
          left: "center",
          textStyle: {
            color: "#fcd714",
          },
        },
        color: ["#fcd714", "#1370fb"],
        textStyle: {
          color: "#fcd714",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          textStyle: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 92, name: "男" },
              { value: 8, name: "女" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "#fcd714",
              },
            },
          },
        ],
      };
      option && myChart.setOption(option);
    };
    // 五星图初始化
    let fiveHeartInit = () => {
      var myChart = echarts.init(heart.value);
      var option;
      const dataBJ = [
        [55, 9, 56, 0.46, 18, 6],
        [25, 11, 21, 0.65, 34, 9],
        [56, 7, 63, 0.3, 14, 5],
        [33, 7, 29, 0.33, 16, 6],
        [42, 24, 44, 0.76, 40, 16],
        [82, 58, 90, 1.77, 68, 33],
        [74, 49, 77, 1.46, 48, 27],
        [78, 55, 80, 1.29, 59, 29],
        [207, 186, 100, 2.8, 108, 64],
        [185, 127, 130, 2.52, 61, 27],
        [39, 19, 38, 0.57, 31, 15],
        [41, 11, 40, 0.43, 21, 7],
        [64, 38, 74, 1.04, 46, 22],
        [108, 79, 120, 1.7, 75, 41],
        [108, 63, 116, 1.48, 44, 26],
        [33, 6, 29, 0.34, 13, 5],
        [94, 66, 110, 1.54, 62, 31],
        [186, 142, 192, 3.08, 93, 79],
        [57, 31, 54, 0.96, 32, 14],
        [22, 8, 17, 0.48, 23, 10],
        [39, 15, 36, 0.61, 29, 13],
        [94, 69, 114, 2.08, 73, 39],
        [99, 73, 110, 2.43, 76, 48],
        [31, 12, 30, 0.5, 32, 16],
        [42, 27, 43, 1, 53, 22],
        [154, 117, 157, 3.05, 92, 58],
        [234, 185, 100, 2.09, 123, 69],
        [160, 120, 186, 2.77, 91, 50],
        [134, 96, 165, 2.76, 83, 41],
        [52, 24, 60, 1.03, 50, 21],
        [46, 5, 49, 0.28, 10, 6],
      ];
      const dataSH = [
        [55, 9, 56, 0.46, 18, 6],
        [25, 11, 21, 0.65, 34, 9],
        [56, 7, 63, 0.3, 14, 5],
        [33, 7, 29, 0.33, 16, 6],
        [42, 24, 44, 0.76, 40, 16],
        [82, 58, 90, 1.77, 68, 33],
        [74, 49, 77, 1.46, 48, 27],
        [78, 55, 80, 1.29, 59, 29],
        [277, 216, 280, 4.0, 108, 64],
        [185, 127, 216, 2.52, 61, 27],
        [39, 19, 38, 0.57, 31, 15],
        [41, 11, 40, 0.43, 21, 7],
        [64, 38, 74, 1.04, 46, 22],
        [108, 79, 120, 1.7, 75, 41],
        [108, 63, 116, 1.48, 44, 26],
        [33, 6, 29, 0.34, 13, 5],
        [94, 66, 110, 1.54, 62, 31],
        [186, 142, 192, 3.88, 93, 79],
        [57, 31, 54, 0.96, 32, 14],
        [22, 8, 17, 0.48, 23, 10],
        [39, 15, 36, 0.61, 29, 13],
        [94, 69, 114, 2.08, 73, 39],
        [99, 73, 110, 2.43, 76, 48],
        [31, 12, 30, 0.5, 32, 16],
        [42, 27, 43, 1, 53, 22],
        [154, 117, 157, 3.05, 92, 58],
        [234, 185, 230, 3.09, 123, 69],
        [160, 120, 186, 2.77, 91, 50],
        [134, 96, 165, 2.76, 83, 41],
        [52, 24, 60, 1.03, 50, 21],
        [46, 5, 49, 0.28, 10, 6],
      ];
      const lineStyle = {
        width: 1,
        opacity: 0.5,
      };
      option = {
        backgroundColor: "",
        title: {
          // text: '科比综合能力五星图',
          // left: 'center',
          // textStyle: {
          //   color: '#eee'
          // }
        },
        legend: {
          bottom: 5,
          data: ["8号", "24号"],
          itemGap: 20,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          selectedMode: "single",
        },
        radar: {
          indicator: [
            { name: "进攻", max: 300 },
            { name: "防守", max: 250 },
            { name: "指挥", max: 300 },
            { name: "失误", max: 5 },
            { name: "篮板", max: 200 },
            { name: "助攻", max: 100 },
          ],
          shape: "circle",
          splitNumber: 5,
          axisName: {
            color: "rgb(238, 197, 102)",
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(238, 197, 102, 0.1)",
                "rgba(238, 197, 102, 0.2)",
                "rgba(238, 197, 102, 0.4)",
                "rgba(238, 197, 102, 0.6)",
                "rgba(238, 197, 102, 0.8)",
                "rgba(238, 197, 102, 1)",
              ].reverse(),
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "rgba(238, 197, 102, 0.5)",
            },
          },
        },
        series: [
          {
            name: "8号",
            type: "radar",
            lineStyle: lineStyle,
            data: dataBJ,
            symbol: "none",
            itemStyle: {
              color: "#1370fb",
            },
            areaStyle: {
              opacity: 0.1,
            },
          },
          {
            name: "24号",
            type: "radar",
            lineStyle: lineStyle,
            data: dataSH,
            symbol: "none",
            itemStyle: {
              color: "#fcd714",
            },
            areaStyle: {
              opacity: 0.05,
            },
          },
        ],
      };
      option && myChart.setOption(option);
    };
    let getMapJsonData = (number, name) => {
      axios
        .get(
          "https://geo.datav.aliyun.com/areas_v3/bound/" + number + "_full.json"
        )
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            getMap(res.data, name);
            return;
          } else {
            getMap(res, name);
          }
        });
    };
    let pieOutlineFunc = () => {
      key.value.initWH();
      key1.value.initWH();
      key2.value.initWH();
      key3.value.initWH();
      key4.value.initWH();
    };
    let getMap = (v, name) => {
      myChart.value = echarts.init(echart.value);
      mapJson.value = v;
      // 绘制图表
      echarts.registerMap("china", mapJson.value);
      var geoGpsMap = locationData.value[0].value
        ? locationData.value[0].value
        : [121.4648, 31.2891];
      var geoCoordMap = {
        江苏: [118.8062, 31.9208],
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11445308, 29.64411352],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
      };

      var value = {
        江苏: 10000,
        黑龙江: 12000,
        内蒙古: 12000,
        吉林: 12000,
        北京市: 15000,
        辽宁: 11000,
        河北: 11000,
        天津: 11000,
        山西: 11000,
        陕西: 10000,
        西藏: 11000,
        甘肃: 10000,
        宁夏: 10000,
        青海: 12000,
        新疆: 12000,
        四川: 11000,
        重庆: 10000,
        山东: 11000,
        河南: 11000,
        安徽: 12000,
        湖北: 11000,
        浙江: 15000,
        福建: 12000,
        江西: 11000,
        湖南: 11000,
        贵州: 11000,
        云南: 12000,
        广东: 15000,
        广西: 13000,
        海南: 11000,
        上海: 11000,
      };
      var colors = "#25CEF3";
      var mapData = [];

      /*柱子Y名称*/
      var categoryData = [];
      var barData = [];

      for (var key in geoCoordMap) {
        mapData.push({
          year: "青海",
          name: key,
          value: value[key] / 100,
          value1: value[key] / 100,
        });
      }

      mapData.sort(function sortNumber(a, b) {
        return a.value - b.value;
      });
      for (var j = 0; j < mapData.length; j++) {
        barData.push(mapData[j].value1);
        categoryData.push(mapData[j].name);
      }
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };

      var convertToLineData = function (data, gps) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var toCoord = geoCoordMap[dataItem.name];
          // debugger;
          var fromCoord = gps; //郑州
          //  var toCoord = geoGps[Math.random()*3];
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem.value,
              },
              {
                coord: toCoord,
              },
            ]);
          }
        }
        return res;
      };

      var option = {
        // backgroundColor: "#132E75",
        geo: {
          show: true,
          map: "china",
          roam: true,
          zoom: 1.05,
          tooltip: {
            trigger: "item",
          },
          // center: [101.4038, 36.8207],
          label: {
            show: true,
            color: "#fcd714",
          },
          layoutCenter: ["50%", "58%"],
          layoutSize: 600,
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
          },
          emphasis: {
            areaColor: "#1370fb",
            borderWidth: 0,
          },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          //地图点的动画效果
          {
            //  name: 'Top 5',
            type: "effectScatter",
            coordinateSystem: "geo",
            data:
              name == "中国"
                ? convertData(
                    mapData
                      .sort(function (a, b) {
                        return b.value - a.value;
                      })
                      .slice(0, 20)
                  )
                : [],
            symbolSize: function (val) {
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: colors,
                shadowBlur: 10,
                shadowColor: colors,
              },
            },
            zlevel: 1,
          },
          //地图线的动画效果
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 3, //图标大小
            },
            lineStyle: {
              normal: {
                color: colors,
                width: 0.1, //尾迹线条宽度
                opacity: 0.5, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
              },
            },
            data: name == "中国" ? convertToLineData(mapData, geoGpsMap) : "",
          },
        ],
      };
      myChart.value.setOption(option);
      myChart.value.on("click", (data) => {
        mapJson.value.features.forEach((item) => {
          if (item.properties.name == data.name) {
            title.value = data.name;
            myChart.value.dispose(); //销毁
            getMapJsonData(item.properties.adcode, item.properties.name);
          }
        });
      });
    };
    // 右键回退
    let show = () => {
      console.log(title.value);
      if (title.value != "中国") {
        myChart.value.dispose(); //销毁
        title.value = "中国";
        getMapJsonData("100000", "中国");
      }
    };
    let getLocation = () => {
      AMap.plugin("AMap.CitySearch", function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log(result);
            locationProvince.value = result.province;
            locationData.value.push({
              name: result.city,
              value: [result.bounds.mb.lng, result.bounds.mb.lat],
            });
          }
        });
      });
    };

    return {
      mapJson,
      echart,
      myChart,
      config,
      config2,
      ring,
      heart,
      key,
      key1,
      key2,
      key3,
      key4,
      title,
      show,
      load,
      locationData,
      locationProvince,
    };
  },
};
</script>
<style lang="less" scoped>
.total {
  height: 100%;
  width: 100%;
  background: #3e1b6b;
  .header {
    display: flex;
    justify-content: space-between;
    height: 10%;
    .aside {
      display: flex;
      align-items: center;
    }
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      font-size: 24px;
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: 90%;
    .content_left {
      width: 20%;
      .content_users {
        display: flex;
        flex-direction: column;
        align-items: inherit;
        height: 100%;
        justify-content: center;
        .users {
          display: flex;
          justify-content: space-around;
          color: #fff;
          font-size: 20px;
        }
        .users_title {
          color: #fcd714;
        }
      }
      .content_age {
        color: #fcd714;
        padding: 20px 0 0 20px;
        font-size: 20px;
      }
      .content_place {
        color: #fcd714;
        padding: 20px 0 0 20px;
        font-size: 20px;
      }
      .dv-scroll-ranking-board,
      .dv-scroll-board {
        width: 90%;
        height: 85%;
        margin: auto;
      }
    }
    .content_center {
      width: 60%;
      height: 100%;
    }
    .content_right {
      width: 20%;
      .content_users {
        display: flex;
        flex-direction: column;
        align-items: inherit;
        height: 100%;
        justify-content: center;
        .users {
          display: flex;
          justify-content: space-around;
          color: #fff;
          font-size: 20px;
        }
        .users_title {
          color: #fcd714;
        }
      }
      canvas {
        position: relative;
      }
    }
  }
}
</style>
