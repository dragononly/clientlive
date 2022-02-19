<template>
  <div id="box" :style="{ overflowY: isactive ? 'scroll' : 'hidden' }">
    <div
      v-if="nowvideoid"
      @dblclick="fullshow()"
      class="mask"
      style="
        position: fixed;
        left: 0;
        right: 0;
        margin: auto;
        top: 20%;
        width: 50%;
        height: 50%;
        z-index: 5;
      "
    ></div>
    <div class="a1">
      <SettingFilled
        @click="showModal"
        class="touch2"
        :style="{ fontSize: '15px' }"
      />
    </div>
    <div v-if="!nowvideoid" class="a1" style="margin-left: 45px">
      <router-link to="/center" style="color: #63696a">正在直播</router-link>
    </div>
    <div v-if="!nowvideoid" class="a1" style="margin-left: 135px">
      <router-link to="/backlist" style="color: #63696a">直播回看</router-link>
    </div>

    <div v-if="admin && nowvideoid" class="a1 a11" style="color: #fff">
      <QuestionCircleOutlined
        class="touch2"
        @click="askshowclick()"
        :style="{ fontSize: '15px' }"
      />
    </div>
    <div
      class="a1"
      @click="fullshow()"
      v-if="nowvideoid"
      style="margin-left: 97px"
    >
      <FullscreenOutlined class="touch2" :style="{ fontSize: '15px' }" />
    </div>
    <div>
      <div
        v-show="nowvideoid"
        class="a1"
        :style="{ marginLeft: '135px', color: '#fff' }"
      >
        <div v-if="Eid">{{ Eid }}&nbsp;{{ User }}</div>
        <div v-else>{{ eid }}&nbsp;{{ user }}</div>
      </div>
    </div>

    <div class="a1" v-if="nowvideoid && admin" style="margin-left: 245px">
      <a-popconfirm
        title="是否开启直播"
        ok-text="确认"
        cancel-text="取消"
        @confirm="confirm2"
        @cancel="cancel2"
      >
        <a href="#">
          <play-circle-filled
            class="touch2"
            :style="{ fontSize: '15px', color: liveStatusColor }"
          />
        </a>
      </a-popconfirm>
    </div>

    <div class="a1" v-if="nowvideoid && admin" style="margin-left: 277px">
      <a-popconfirm
        title="是否关闭直播"
        ok-text="确认"
        cancel-text="取消"
        @confirm="confirm"
        @cancel="cancel"
      >
        <a href="#">
          <poweroff-outlined
            class="touch2"
            :style="{ fontSize: '15px', color: videoOffColor }"
          />
        </a>
      </a-popconfirm>
    </div>

    <!-- <div
      v-show="nowvideoid"
      class="a1"
      style="margin-left: 130px; color: #fff; font-weight: bold"
    >
      <team-outlined />
      在线{{ parseInt(people * 1.5) }}
    </div> -->
    <!-- <div
      class="a1"
      @click="fullshow()"
      v-if="nowvideoid"
      style="margin-left: 130px"
    >
      <FullscreenExitOutlined class="touch2" :style="{ fontSize: '15px' }" />
    </div> -->

    <div><ask v-show="askshow" /></div>

    <a-modal
      :footer="null"
      v-model:visible="visibleCenter"
      title="设置"
      :width="width"
      @ok="handleOk"
    >
      <myset />
    </a-modal>

    <div
      :style="{
        position: 'relative',
        height: 'calc(100vh)',

        background: videobg,
      }"
    >
      <div class="c5" v-if="videoplay" style="width: 100%; position: relative">
        <div
          v-if="close1"
          :style="{
            position: 'absolute',
            right: '10px',
            top: '20px',
            border: '1px solid #616161',
            borderRadius: '5px',
            padding: '2px 5px',
            zIndex: '5',
            marginRight: closeOff,
          }"
        >
          <span @click="tohome()">
            <CloseOutlined
              class="touch2"
              style="font-size: 15px; font-weight: bold"
            />
          </span>
        </div>
        <iframe
          sandbox="allow-same-origin allow-scripts"
          name="iframe_a"
          :src="url"
          :width="ifrawidth"
          height="100%"
          frameborder="0"
          id="childFrame"
          scrolling="no"
          allowfullscreen
        ></iframe>
        <div
          @click="shrink()"
          class="touch"
          :style="{
            position: 'fixed',
            top: '248px',
            left: shrinkRight,
            width: '30px',
            height: '30px',
            zIndex: '999',
            marginLeft: '-10px',
          }"
        >
          <caret-right-outlined style="font-size: 30px; color: #fff" />
        </div>
        <div
          @click="shrinkLeftEvent()"
          class="touch"
          :style="{
            position: 'fixed',
            top: '248px',
            left: shrinkLeft,
            width: '30px',
            height: '30px',
            zIndex: '999',
            marginLeft: '-10px',
          }"
        >
          <caret-left-outlined style="font-size: 30px; color: #fff" />
        </div>

        <caret-right-outlined />
        <div style="position: absolute; right: 0; top: 0; z-index: 12">
          <a-card
            v-show="signtime"
            title="请签到"
            style="width: 100%; font-size: 12px"
          >
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
                  <a-button
                    @click="signtimeclick()"
                    v-show="!userOffSignTable"
                    type="primary"
                    style="width: 100%"
                  >
                    签 到
                  </a-button>
                  <a-button
                    @click="userCloseSign()"
                    v-show="userOffSignTable"
                    type="primary"
                    style="width: 100%"
                  >
                    关 闭
                  </a-button>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </div>

        <div class="scAll" v-if="shrinkOff">
          <div
            v-if="nowvideoid && fulloff"
            id="sc2"
            :class="chatmclass ? 'c3m' : 'c3'"
            :style="{
              height: cssheight2 + 'px',
              scrollTop: cssheight2,
              overflowY: isactive ? 'scroll' : 'hidden',
            }"
            ref="containerRef2"
          >
            <div class="touch">
              <div
                id="components-affix-demo-target"
                class="scrollable-container"
              >
                <div class="background">
                  <a-affix
                    :target="() => containerRef2"
                    :style="{ position: 'absolute', top: 0, right: 0 }"
                  >
                    <MinusSquareOutlined
                      @click="cssheightclick2()"
                      class="c4"
                    />
                  </a-affix>
                </div>
              </div>

              <div
                v-for="(i, key) in arr2"
                :key="key"
                style="margin-bottom: 5px"
              >
                <div
                  :style="{
                    color: sayColor[String(key).charAt(String(key).length - 1)],
                    backgroundColor:
                      saybgcolor[String(key).charAt(String(key).length - 1)],
                  }"
                  class="line2 css2"
                >
                  {{ i.user }}说:
                  <span style="color: #fff"> {{ i.message }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="nowvideoid"
            id="sc"
            :class="chatmclass ? 'c1m' : 'c1'"
            :style="{
              height: cssheight + 'px',
              overflowY: isactive ? 'scroll' : 'hidden',
            }"
            ref="containerRef"
          >
            <div class="touch">
              <div
                id="components-affix-demo-target"
                class="scrollable-container"
              >
                <div class="background">
                  <a-affix
                    :target="() => containerRef"
                    :style="{ position: 'absolute', top: 0, right: 0 }"
                  >
                    <MinusSquareOutlined @click="cssheightclick()" class="c2" />
                  </a-affix>
                </div>
              </div>

              <div
                v-for="(i, key) in arr1"
                :key="key"
                style="margin-bottom: 5px"
              >
                <div
                  :style="{
                    color: sayColor[String(key).charAt(String(key).length - 1)],
                    backgroundColor:
                      saybgcolor[String(key).charAt(String(key).length - 1)],
                  }"
                  class="line2 css2"
                >
                  {{ i.user }}说:
                  <span style="color: #fff"> {{ i.message }}</span>
                </div>
              </div>
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
    <div
      v-if="nowvideoid"
      style="
        background: #349793;
        border-radius: 5px;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
      "
      :style="{ width: xiaoxiwidth }"
    >
      <div v-show="fulloff" :class="chatmclass ? 'c3m' : 'a'">
        <a-row>
          <a-col :xs="5" :md="14">
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
          <a-col :xs="8" :md="6">
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
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, watch } from 'vue';
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
} from '@ant-design/icons-vue';
import myset from './myset.vue';
import Zhibolist from '@/components/center/user/zhibolist.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { data } from './store/live';
import heart from '@components/center/com/heart_anima.vue';
import ask from '@components/center/com/ask.vue';
import { sendWsMessage } from '@config/http/ws';
import { wsdata } from '@config/http/wsdata';
import { useRouter, useRoute } from 'vue-router';

import axios from 'axios';
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
} from './event/center/before';
import { message } from 'ant-design-vue';
import screenfull from 'screenfull';
import { myGlobal } from '@/store/app';
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
    window.onresize = () => {
      if (screenfull.isFullscreen) {
        data.ifrawidth = '100%';

        //发给老师和导播的聊天框隐藏
        data.fulloff = false;
        //聊天框高度拉低
        data.cssheight = 55;

        data.shrinkOff = false;
        //120超出屏幕消失
        data.shrinkRight = '120%';
        data.shrinkLeft = '-99%';

        //那个关闭按钮的位置控制
        data.closeOff = '0%';
      } else {
        //如同上面
        //观察聊天框是否关闭
        if (data.shrinkOff == false) {
          data.ifrawidth = '100%';
        } else {
          data.ifrawidth = '80%';
        }

        data.shrinkRight = '120%';
        data.shrinkLeft = '99%';

        //发给老师和导播的聊天框隐藏
        data.fulloff = true;
        //聊天框高度拉低
        data.cssheight = 250;
        //data.toggleFull = true;
      }
    };

    //收缩一次聊天框
    shrink();

    const router = useRouter();
    const route = useRoute();
    if (!sessionStorage.eid && !route.query.accesstoken) {
      router.push('/');
    }

    //拉取聊天记录
    await getmessage();

    //4拉取聊天消息
    watch(
      () => wsdata.messagestatus,
      async () => {
        await getmessage();
      },
    );

    //5.签到逻辑
    let timec: NodeJS.Timeout | any = null;
    clearInterval(timec);

    //判断accesstoken,进行操作
    if (route.query.accesstoken) {
      //设置全局accesstoken
      axios.defaults.headers.common['authorization'] = route.query.accesstoken;
      await useAccesstokenGetEid();
    }

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
      data.nowvideoid = '';
      data.videobg = '#fff';
      wsdata.askshow = false;
      //滚动条控制
      data.isactive = true;
    };

    //2授权系统游客权限
    if (sessionStorage.eid == '999999') {
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
      },
    );

    //timeRecord是一个记录时间点， 改了说明进入了下一个打卡时间，当打卡进入下一个时间的时候，可以重新打卡
    //因为第一次赋值会变，所以，第一赋值不改变

    watch(
      () => data.timeRecord,
      () => {
        let time1: any = localStorage.getItem('relativetime');
        let time2 = localStorage.getItem('pretime');
        let end_date2 = moment(time1, 'YYYY-MM-DD HH:mm:ss');
        let dftime = end_date2.diff(time2, 'seconds');
        // console.log('监督授权localStorage pretime');

        //上一个打卡时间范围内,见到用户过了很久才签到的那个时间
        if (
          dftime <
          Number(data.signContinueTime) -
            Number(localStorage.getItem('passedtime'))
        ) {
          //说明打卡过上个锁
          localStorage.setItem('lock', 'on');
        } else {
          //允许再一次签到，打开锁
          localStorage.setItem('lock', 'off');
        }
      },
      {
        immediate: true, // 这个属性是重点啦
        deep: true, // 深度监听的参数
      },
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
      },
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
          clearInterval(time60);
          //Execution time increaser
          if (data.nowvideoid) {
            // initialization video status colors
            await videoStatusObjJust();
            data.isactive = false;
            time60 = setInterval(addtime, 3 * 1000);
          }

          //点击进入到直播页面后，把滚动条初始化到0，不然会继承列表的滚动条
          boxScroll();
        }
      },
      {
        immediate: true, // 这个属性是重点啦
        deep: true, // 深度监听的参数
      },
    );

    //7.显示隐藏askshow
    const askshowclick = () => {
      let pdata = {
        command: 'showquestion',
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
      if (data.cssheight == 250) {
        data.cssheight = 50;
      } else {
        data.cssheight = 250;
      }
    };
    const cssheightclick2 = () => {
      if (data.cssheight2 == 250) {
        data.cssheight2 = 50;
      } else {
        data.cssheight2 = 250;
      }
    };

    const confirm = async (e: MouseEvent) => {
      await isOffVideoEvent();
    };

    const cancel = (e: MouseEvent) => {
      message.info('取消操作');
    };

    const confirm2 = async (e: MouseEvent) => {
      await videoStatusObj();
    };

    const cancel2 = (e: MouseEvent) => {
      message.info('取消操作');
    };

    //如果在线人数是0，那么发送一个出发一下更新
    setTimeout(() => {
      sendWsMessage('online');
    }, 2000);

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
    PlayCircleFilled,
    myset,
    Zhibolist,
    CloseOutlined,
    FullscreenOutlined,
    MinusSquareOutlined,
    QuestionCircleOutlined,
    FullscreenExitOutlined,
    TeamOutlined,
    PoweroffOutlined,
    heart,
    ask,
    CaretRightOutlined,
    CaretLeftOutlined,
  },
});
</script>

<style scoped>
@import './css/center.css'; /*引入公共样式*/
</style>

