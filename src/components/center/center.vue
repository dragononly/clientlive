<template>
  <div id="box" :style="{ overflowY: isactive ? 'scroll' : 'hidden' }">
    <!-- <div v-if="nowvideoid && !mobile" @dblclick="fullshow()" class="mask"></div> -->

    <div v-if="!nowvideoid" class="a1" style="margin-left: 45px">
      <router-link to="/center" style="color: #63696a">正在直播</router-link>
    </div>
    <div v-if="!nowvideoid" class="a1" style="margin-left: 135px">
      <router-link to="/backlist" style="color: #63696a">直播回看</router-link>
    </div>

    <div v-if="admin && nowvideoid" class="a1 a11" style="color: #fff">
      <QuestionCircleOutlined class="touch2" @click="askshowclick()" :style="{ fontSize: '15px' }" />
    </div>

    <div v-show="nowvideoid" class="a1" :style="{
      marginLeft: watermark + 'px',
      color: '#fff',
      border: '1px solid #4596F2',
      opacity: '0.6',
    }">
      <div v-if="Eid">{{ Eid }}&nbsp;{{ User }}</div>
      <div v-else>{{ eid }}&nbsp;{{ user }}</div>
    </div>

    <div class="a1" v-if="nowvideoid && admin" style="margin-left: 213px">
      <a-popconfirm title="是否开启直播" ok-text="确认" cancel-text="取消" @confirm="confirm2" @cancel="cancel2">
        <a href="#">
          <play-circle-filled class="touch2" :style="{ fontSize: '15px', color: liveStatusColor }" />
        </a>
      </a-popconfirm>
    </div>

    <div class="a1" v-if="nowvideoid && admin" style="margin-left: 246px">
      <a-popconfirm title="是否关闭直播" ok-text="确认" cancel-text="取消" @confirm="confirm" @cancel="cancel">
        <a href="#">
          <poweroff-outlined class="touch2" :style="{ fontSize: '15px', color: videoOffColor }" />
        </a>
      </a-popconfirm>
    </div>

    <!-- <div
      class="a1"
      @click="fullshow()"
      v-if="nowvideoid && mobile"
      style="margin-left: 147px"
    >
      <FullscreenExitOutlined class="touch2" :style="{ fontSize: '15px' }" />
    </div> -->

    <div>
      <ask v-show="askshow" />
    </div>

    <a-modal :footer="null" v-model:visible="visibleCenter" title="设置" :width="width" @ok="handleOk">
      <myset />
    </a-modal>

    <div :style="{
      position: 'relative',
      height: 'calc(100vh)',
    
      background: videobg,
    }">
      <div class="c5" v-if="videoplay" style="width: 100%; position: relative;">
        <iframe sandbox="allow-same-origin allow-scripts" name="iframe_a" :src="url" :width="ifrawidth" height="100%"
          frameborder="0" id="childFrame" scrolling="no" allowfullscreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen"></iframe>
        <div @click="shrink()" class="touch" :style="{
          position: 'fixed',
          top: '120px',
          right: '-10px',
          width: '30px',
          height: '30px',
          zIndex: '999',
          marginLeft: '-10px',
        }"></div>
        <div v-if="!mobile" @click="shrinkLeftEvent()" class="touch" :style="{
          position: 'fixed',
          top: '120px',
          right: '-10px',
          width: '30px',
          height: '30px',
          zIndex: '999',
          marginLeft: '-10px',
        }">
          <img v-if="!fulloff" style="width: 20px" src="../../assets/left.png" />
        </div>

        <div style="position: absolute; right: 0; top: 0; z-index: 12">
          <a-card v-show="signtime" title="请签到" style="width: 100%; font-size: 12px">
            <template #extra>
              <!-- <span
                @click="signtimeclick2()"
                class="touch"
                style="color: #2c3e50"
                >✕</span
              > -->
            </template>
            <div>{{ textsignTitle }}</div>
            <div style="margin-top: 10px">
              <a-row>
                <a-col :span="12">剩余时间{{ signshowtime }}秒</a-col>
                <a-col :span="8" :offset="4" style="padding: 0 10px">
                  <a-button @click="signtimeclick()" v-show="!userOffSignTable" type="primary" style="width: 100%">
                    签 到
                  </a-button>
                  <a-button @click="userCloseSign()" v-show="userOffSignTable" type="primary" style="width: 100%">
                    关 闭
                  </a-button>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </div>

        <div v-if="shrinkOff && !mobile" style="
            position: relative;
            position: fixed;
            right: 3px;
            top: 5px;
            height: 99%;
            width: 13.5%;
            border-radius: 8px;
            background: #4D5256;
            padding-right: 10px;
          ">
          <div style="height: 38px; margin-top: 7px; position: relative">
            <div class="a1">
              <SettingFilled @click="showModal" class="touch2" :style="{ fontSize: '11px' }" />
            </div>
            <div v-show="nowvideoid" class="a1" style="
                margin-left: 27px;
                color:#BBBEA7;
                font-weight: 400;
                font-size: 12px;
                border: 0.01rem solid #BBBEA7;
                padding: 0px 3px 0px 3px;
                line-height: 21.5px;
              ">
              <team-outlined />
              <span style="font-size: 13px">
                在线{{ parseInt(people) }}人</span>

            </div>
            <div @click="fullshow()" v-if="nowvideoid" class="imghover touch" :style="{
              position: 'absolute',
              top: '7px',
              borderRadius: '3px',
              padding: '0px 3px',
              zIndex: '12',
              right: '3px',
            }">
              <FullscreenOutlined class="touch2" :style="{ fontSize: '14px' }" />
            </div>
          </div>


          <div style="
              background: red;
              position: absolute;
              top: 0px;
              z-index: 100;
              width: 100%;
            "></div>
          <div
            style="color:#fff;border: 1px solid #949CA2;width: 95%;margin: auto;border-radius: 4px;height: 60px;font-size: 13px;text-indent: 2px;overflow-y: scroll;">
            {{adminSay}}
          </div>
          <div v-if="nowvideoid" id="sc" :class="chatmclass ? 'c1m' : 'c1'" :style="{
            height: 80 + '%',
            overflowY: isactive ? 'scroll' : 'hidden',
            marginLeft: '10px',
            marginTop: '-10px',
            position: 'relative',
          }" ref="containerRef">
            <div class="touch">
              <div v-for="(i, key) in arr1" :key="key" style="margin-bottom: 0px">
                <div class="line2 css2" style="line-height: 18px;font-size:12px;">
                  <span style="color: #fff"></span>
                  {{ i.user }}说:
                  <span style="color:#F1F3E9"> {{ i.message }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="position:relative;position:fixed;bottom: 60px;width: 200px;font-family: 宋体;">
            <div v-if="looktime/60<300"
              style="color:#f3f3f4;font-size: 12px;padding-left:10px;position:relative;position:absolute">
              累计有效观看时长{{Math.floor(looktime/60)}}分钟
              <a-popover placement="leftTop">
                <template #content>
                  <div style="font-size:12px;color: #848382;">
                    <p>(1)第一次进入，时间增加需要1-2分钟缓冲同步，不影响实际计时</p>
                    <p>(2)如需技术支援，请联系运营维护部，或者开发作者熊忠波</p>
                    <p>(3)联系方式，企业微信</p>
                  </div>
                </template>
                <template #title>
                  <span style="font-size:12px;color: #848382;">提示</span>
                </template>
                <span style="position:relative;">
                  <question-circle-outlined class="touch"
                    style="font-weight: bold;font-size:15px;margin-left:2px;color:#FF9800;position:absolute;top:-1px;" />
                </span>
              </a-popover>
              <div>
              </div>
            </div>
            <div v-else style="color:#109754;font-size: 12px;padding-left:10px;position:relative;font-weight: bold;">
              恭喜，该课程您已获得足够时长
            </div>
          </div>
          <div style="
              bottom: 1%;
              position: fixed;
              right: 0;
              width: 14%;
              padding: 5px;
            " class="touch">
            <a-input v-model:value="value" placeholder="说点什么吧..." size="small" style="
                border-radius: 5px 0 0 5px;
                opacity: 0.9;
                font-size: 0.9rem;
                z-index: 8888;
                width: 70%;
                left: 10px;
                padding-left: 2px;
                outline: none;
                float: left;
                display: block;
                padding: 2px;
                text-indent: 5px;
                font-size: 11px;
                background: #5F6469;
                border: 1px solid #5F6469;
                color: #fff;
              " />
            <div @click="onSearch(value)" style="
                display: block;
                background-color:#5F6469;
                border-radius: 0 5px 5px 0;
                height: 25px;
                width: 40px;
                font-weight: bold;
                text-align: center;
                color: #fff;
                font-size: 12px;
                line-height: 25px;
                float: left;
                margin-left: 11px;
                font-family: 宋体;
              ">
              发送
            </div>
          </div>
        </div>
      </div>

      <a-row style="position: relative; z-index: 3; margin-top: 10px">
        <!-- 进入直播间页面 -->
        <a-col :md="24">
          <div v-if="zhibolistshow">
            <Zhibolist :arr="showzhibolist" @sendF="sendSonData" />
          </div>
        </a-col>
      </a-row>
    </div>
    <!-- <div
      v-if="nowvideoid"
      style="
        background: #349793;
        border-radius: 5px;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
        opacity: 0.9;
      "
      :style="{ width: xiaoxiwidth }"
    >
      <div v-show="fulloff" :class="chatmclass ? 'c3m' : 'a'">
        <a-row>
          <a-col :xs="5" :md="10">
            <div style="padding: 5px 0px 2px 10px">
              <a-input-search
                v-model:value="value"
                placeholder="说点什么吧..."
                enter-button="发送"
                @search="onSearch"
                style="
                  border-radius: 5px;
                  opacity: 0.7;
                  position: relative;
                  z-index: 8888;
                "
              />
            </div>
          </a-col>
          <a-col :xs="12" :md="10">
            <div style="padding: 10px 20px">
              <a-radio-group name="radioGroup" v-model:value="radiovalue">
                <a-radio value="1" style="font-size: 12px; color: #efca48"
                  >给所有人</a-radio
                >
                <a-radio value="2" style="font-size: 12px; color: #efca48"
                  >给老师和导播</a-radio
                >
              </a-radio-group>
            </div>
          </a-col>
          <a-col :xs="6" :md="4">
            <heart />
          </a-col>
        </a-row>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
import { defineComponent, toRefs, watch } from "vue";
import {
  SettingFilled,
  CloseOutlined,
  FullscreenOutlined,
  MinusSquareOutlined,
  QuestionCircleOutlined,
  FullscreenExitOutlined,
  PlayCircleFilled,
  PoweroffOutlined,
  TeamOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  SendOutlined,
  ArrowsAltOutlined,
  ShrinkOutlined,
} from "@ant-design/icons-vue";
import myset from "./myset.vue";
import Zhibolist from "@/components/center/user/zhibolist.vue";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { data } from "./store/live";
import heart from "@components/center/com/heart_anima.vue";
import ask from "@components/center/com/ask.vue";
import { sendWsMessage } from "@config/http/ws";
import { wsdata } from "@config/http/wsdata";
import { useRouter, useRoute } from "vue-router";

import axios from "axios";
import {
  getmessage,
  getsigndata,
  onSearch,
  useAccesstokenGetEid,
  adminUser,
  GetLiveGroup,
  pulicLive,
  uniqueLive,
  sendSonData,
  timethis,
  signtimeclick,
  addtime,
  fullshow,
  videoStatusObj,
  videoStatusObjJust,
  isOffVideoEvent,
  boxScroll,
  shrink,
  shrinkLeftEvent,
  initialize,
  gettimeBack

} from "./event/center/before";
import { message } from "ant-design-vue";
import screenfull from "screenfull";
import { myGlobal } from "@/store/app";
import { log } from "console";
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
      ...toRefs(wsdata),
      ...toRefs(myGlobal),
    };
  },

  async setup(myself) {
    //初始化事件**************************************************************************//

    //观察屏幕放大缩小同步
    window.onresize = () => {
      if (screenfull.isFullscreen) {
        data.ifrawidth = "100%";

        //发给老师和导播的聊天框隐藏
        data.fulloff = true;
        //聊天框高度拉低
        data.cssheight = 55;

        data.shrinkOff = false;
        //120超出屏幕消失
        data.shrinkRight = "120%";
        data.shrinkLeft = "-99%";

        //那个关闭按钮的位置控制
        data.closeOff = "0%";
      } else {
        //如同上面
        //观察聊天框是否关闭
        if (data.shrinkOff == false) {
          data.ifrawidth = "100%";
        } else {
          data.ifrawidth = "86%";
        }

        shrinkLeftEvent();

        //发给老师和导播的聊天框隐藏
        data.fulloff = true;
        //聊天框高度拉低
        data.cssheight = 70;
        //data.toggleFull = true;
      }
    };
    //优先级函数
    //URL跳转过来赋予sessionid优先级1
    const router = useRouter();
    const route = useRoute();
    if (!sessionStorage.eid && !route.query.accesstoken) {
      router.push("/");
    }

    //判断accesstoken,进行操作
    if (route.query.accesstoken) {
      //设置全局accesstoken
      axios.defaults.headers.common["authorization"] = route.query.accesstoken;
      await useAccesstokenGetEid();
    }
    //优先级2获取分组
    await initialize();




    // //收缩一次聊天框
    //手机端视频100%
    gettimeBack()
    //
    //展开一次
    shrinkLeftEvent();
    if (data.mobile) {
      shrink();
    }

    document.onkeydown = async function (e) {
      let ev: any = document.all ? window.event : e;
      if (ev.keyCode === 13) {
        await onSearch(data.value);
      }
    };


    //拉取聊天记录
    await getmessage();

    //4拉取聊天消息
    watch(
      () => wsdata.messagestatus,
      async () => {
        await getmessage();
      }
    );

    //5.签到逻辑
    let timec: NodeJS.Timeout | any = null;
    clearInterval(timec);



    //1是否管理员用户
    await adminUser();

    // 2.去拉取直播列表的group name arry
    await GetLiveGroup();

    //1.4允许组外属于公开直播
    await pulicLive();

    //1.5去重复
    await uniqueLive();

    //3.2退出直播间逻辑
    const tohome = () => {
      data.zhibolistshow = true;
      data.videoplay = false;
      data.close1 = false;
      data.nowvideoid = "";
      data.videobg = "#fff";
      wsdata.askshow = false;
      //滚动条控制
      data.isactive = true;
    };

    //2授权系统游客权限
    if (sessionStorage.eid == "999999") {
      data.signtime = false;
      data.admin = false;
    }

    //获取打卡时间
    watch(
      () => wsdata.signdata,
      async () => {
        await getsigndata();
      },
      {
        immediate: true, // 这个属性是重点啦
        deep: true, // 深度监听的参数
      }
    );

    //timeRecord是一个记录时间点， 改了说明进入了下一个打卡时间，当打卡进入下一个时间的时候，可以重新打卡
    //因为第一次赋值会变，所以，第一赋值不改变

    watch(
      () => data.timeRecord,
      () => {
        let time1: any = localStorage.getItem("relativetime");
        let time2 = localStorage.getItem("pretime");
        let end_date2 = moment(time1, "YYYY-MM-DD HH:mm:ss");
        let dftime = end_date2.diff(time2, "seconds");
        // console.log('监督授权localStorage pretime');

        //上一个打卡时间范围内,见到用户过了很久才签到的那个时间
        if (
          dftime <
          Number(data.signContinueTime) -
          Number(localStorage.getItem("passedtime"))
        ) {
          //说明打卡过上个锁
          localStorage.setItem("lock", "on");
        } else {
          //允许再一次签到，打开锁
          localStorage.setItem("lock", "off");
        }
      },
      {
        immediate: true, // 这个属性是重点啦
        deep: true, // 深度监听的参数
      }
    );

    //timethis 定时器观看自己有没有需要打卡的
    setTimeout(() => {
      timec = setInterval(timethis, 1000);
    }, 100);

    watch(
      () => data.liveoff,
      () => {
        if (data.need && data.videoplay) {
          data.signtime = true;
        } else if (data.need == false) {
          data.signtime = false;
        }
      },
      {
        immediate: true, // 这个属性是重点啦
        deep: true, // 深度监听的参数
      }
    );

    //点击签到事件
    await signtimeclick();

    //签到关闭按钮点击后
    const userCloseSign = () => {
      data.need = false;
      data.userOffSignTable = false;
    };

    //6通过观察 data.nowvideoid ，来判断和增加累计时长
    //6.1先去查询看数据库有没有已经添加的信息

    let time60: NodeJS.Timeout;
    watch(
      () => data.nowvideoid,
      async (a: string) => {
        if (a) {
          console.log("进入直播间-nowvideoid change");
          // //优先级3 插入一次计时
          await addtime();

          clearInterval(time60);
          //Execution time increaser
          if (data.nowvideoid) {
            // initialization video status colors
            await videoStatusObjJust();
            data.isactive = false;

            //Create a random number between 10-99
            await gettimeBack()
            //创造一个0-40的随机数
            let random = Math.floor(Math.random() * 40) + 20;
            console.log("时间频率", random);
            // let randomNum = Math.floor(Math.random() * 90 + 10)+20;
            time60 = setInterval(addtime, random * 1000);
          }

          //点击进入到直播页面后，把滚动条初始化到0，不然会继承列表的滚动条
          boxScroll();
        }
      },
      {
        immediate: true, // 这个属性是重点啦
        deep: true, // 深度监听的参数
      }
    );

    //7.显示隐藏askshow
    const askshowclick = () => {
      let pdata = {
        command: "showquestion",
      };
      wsdata.question = { a: 0, b: 0, c: 0, d: 0 };
      sendWsMessage(pdata);
      wsdata.askshow = true;
    };

    setTimeout(() => {
      data.visibleCenter = false;
    }, 1);

    const showModal = () => {
      data.visibleCenter = true;
    };
    const handleOk = (e: MouseEvent) => {
      data.visibleCenter = false;
    };
    //设置宽高样式事件
    const cssheightclick = () => {
      if (data.cssheight == 70) {
        data.cssheight = 10;
      } else {
        data.cssheight = 70;
      }
    };
    const cssheightclick2 = () => {
      if (data.cssheight2 == 70) {
        data.cssheight2 = 10;
      } else {
        data.cssheight2 = 70;
      }
    };

    const confirm = async (e: MouseEvent) => {
      message.info(data.nowvideoid);
      await isOffVideoEvent();
    };

    const cancel = (e: MouseEvent) => {
      message.info("取消操作");
    };

    const confirm2 = async (e: MouseEvent) => {
      await videoStatusObj();
    };

    const cancel2 = (e: MouseEvent) => {
      message.info("取消操作");
    };

    //如果在线人数是0，那么发送一个出发一下更新
    setTimeout(() => {
      sendWsMessage("online");
    }, 2000);

    setInterval(() => {
      if (data.watermark < 800) {
        data.watermark++;
      } else {
        data.watermark = 158;
      }
    }, 100);

    return {
      confirm2,
      cancel2,
      confirm,
      cancel,
      userCloseSign,
      showModal,
      handleOk,
      onSearch,
      sendSonData,
      tohome,
      signtimeclick,
      cssheightclick,
      cssheightclick2,
      askshowclick,
      fullshow,
      shrink,

      shrinkLeftEvent,
      ...toRefs(data),
    };
  },

  components: {
    SettingFilled,
    ArrowsAltOutlined,
    PlayCircleFilled,
    myset,
    SendOutlined,
    Zhibolist,
    CloseOutlined,
    FullscreenOutlined,
    MinusSquareOutlined,
    QuestionCircleOutlined,
    FullscreenExitOutlined,
    TeamOutlined,
    PoweroffOutlined,
    ShrinkOutlined,
    heart,
    ask,
    CaretRightOutlined,
    CaretLeftOutlined,
  },
});
</script>

<style scoped>
@import "./css/center.css";
/*引入公共样式*/
</style>

