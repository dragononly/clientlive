<template>
  <div>
    <div class="a1">
      <SettingFilled
        @click="showModal"
        class="touch2"
        :style="{ fontSize: '15px' }"
      />
    </div>
    <div v-if="admin && nowvideoid" class="a1 a11" style="color: #fff">
      <QuestionCircleOutlined
        class="touch2"
        @click="askshowclick()"
        :style="{ fontSize: '15px' }"
      />
    </div>

    <div><ask v-show="askshow" /></div>

    <div>
      <a-modal
        :footer="null"
        v-model:visible="visible"
        title="设置"
        :width="width"
        @ok="handleOk"
      >
        <myset />
      </a-modal>
    </div>

    <div
      :style="{
        position: 'relative',
        height: 'calc(100vh)',
        overflowY: 'scroll',
        background: videobg,
      }"
    >
      <div class="c5" v-if="videoplay" style="width: 100%; position: relative">
        <div
          v-if="close1"
          style="
            position: absolute;
            right: 10px;
            top: 20px;
            z-index: 5;
            border: 1px solid #616161;
            border-radius: 5px;
            padding: 2px 5px;
            margin-right: 20%;
          "
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
          style="position: absolute"
        ></iframe>

        <div style="position: absolute; right: 0; top: 0; z-index: 12">
          <a-card
            v-show="signtime"
            title="请签到"
            style="width: 100%; font-size: 12px"
          >
            <template #extra
              ><a @click="signtimeclick()" style="color: #2c3e50" href="#"
                >✕</a
              ></template
            >
            <div>点击下面的“签到”按钮，就等你30秒钟，别错过了哦。</div>
            <div style="margin-top: 10px">
              <a-row>
                <a-col :span="12">剩余时间30秒</a-col>
                <a-col :span="8" :offset="4">
                  <a-button @click="signtimeclick()" type="primary"
                    >签到</a-button
                  >
                </a-col>
              </a-row>
            </div>
          </a-card>
        </div>
        <div
          v-if="nowvideoid"
          id="sc2"
          :class="chatmclass ? 'c3m' : 'c3'"
          :style="{
            height: cssheight2 + 'px',
            scrollTop: cssheight2,
          }"
          ref="containerRef2"
        >
          <div class="touch">
            <div id="components-affix-demo-target" class="scrollable-container">
              <div class="background">
                <a-affix
                  :target="() => containerRef2"
                  :style="{ position: 'absolute', top: 0, right: 0 }"
                >
                  <MinusSquareOutlined @click="cssheightclick2()" class="c4" />
                </a-affix>
              </div>
            </div>

            <div v-for="(i, key) in arr2" :key="key">
              <div style="color: black">{{ i.user }}说：</div>
              <div style="color: #388e3c; font-weight: bold">
                {{ i.message }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="nowvideoid"
          id="sc"
          :class="chatmclass ? 'c1m' : 'c1'"
          :style="{ height: cssheight + 'px' }"
          ref="containerRef"
        >
          <div class="touch">
            <div id="components-affix-demo-target" class="scrollable-container">
              <div class="background">
                <a-affix
                  :target="() => containerRef"
                  :style="{ position: 'absolute', top: 0, right: 0 }"
                >
                  <MinusSquareOutlined @click="cssheightclick()" class="c2" />
                </a-affix>
              </div>
            </div>

            <div v-for="(i, key) in arr1" :key="key">
              <div style="color: black">{{ i.user }}说：</div>
              <div style="color: #388e3c; font-weight: bold; font-size: 11px">
                {{ i.message }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <a-row style="position: relative; z-index: 3">
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
        background: #ececec;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 10;
      "
      :style="{ width: xiaoxiwidth }"
    >
      <a-row>
        <a-col :xs="24" :md="14">
          <div style="padding: 2px">
            <a-input-search
              v-model:value="value"
              placeholder="发送消息"
              enter-button="发送"
              @search="onSearch"
            />
          </div>
        </a-col>
        <a-col :xs="18" :md="6">
          <div style="padding: 10px 20px">
            <a-radio-group name="radioGroup" v-model:value="radiovalue">
              <a-radio value="1">给所有人</a-radio>
              <a-radio value="2">给老师和导播</a-radio>
            </a-radio-group>
          </div>
        </a-col>
        <a-col :xs="6" :md="4">
          <heart />
        </a-col>
      </a-row>
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
} from '@ant-design/icons-vue';
import myset from './myset.vue';
import { message } from 'ant-design-vue';

import Zhibolist from '../center/user/zhibolist.vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { data } from './store/live';
import { htmlurl } from '../../../config/http/env';
import { Rput, Rget, Rpost, Mpost } from '../../../config/http/index';
import heart from './com/heart_anima.vue';
import ask from './com/ask.vue';
import { sendWsMessage } from '../../../config/http/ws';
import { wsdata } from '../../../config/http/wsdata';
import { useRouter, useRoute } from 'vue-router';
import { router } from '../../router';
import axios from 'axios';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
      ...toRefs(wsdata),
    };
  },
  async setup(myself) {
    //初始化事件**************************************************************************//
    const router = useRouter();
    const route = useRoute();
    if (!sessionStorage.eid && !route.query.accesstoken) {
      router.push('/');
    }

    //第一队执行函数
    const myscroll = () => {
      //为了让钉子生效所以我们做一个细微的scrool动作
      let div1: any = document.getElementById('sc');
      let div2: any = document.getElementById('sc2');
      try {
        div1.scrollTop = 0;
        div1.scrollTop = div1.scrollHeight;
        div2.scrollTop = 0;
        div2.scrollTop = div2.scrollHeight;
      } catch (error) {}
    };
    //4拉取聊天消息
    watch(
      () => wsdata.messagestatus,
      () => {
        getmessage();
      },
    );
    const getmessage = async () => {
      let url = '/live/getmessage';
      //管理员
      let type: any;
      if (data.admin) {
        type = 2;
      } else {
        type = 1;
      }
      let mydata = {
        zhiboid: data.nowvideoid,
        type: type,
      };
      const cab: any = await Mpost(url, mydata);
      data.arr1.length = 0;
      data.arr2.length = 0;

      for (const x in cab.data.data) {
        if (cab.data.data[x].type == 1) {
          data.arr1.push(cab.data.data[x]);
        } else {
          data.arr2.push(cab.data.data[x]);
        }
      }
      //渲染滚动条
      myscroll();
    };

    //5.签到逻辑
    let timec: any,
      need = false;
    clearInterval(timec);
    //Get sign time
    const getsigndata = async () => {
      const urlsigntime = '/live/searchidzhibo';
      if (data.nowvideoid) {
        let mydata2 = {
          _id: data.nowvideoid,
        };

        let a: any = await Mpost(urlsigntime, mydata2);

        data.signdata = a.data.data;
      }
    };

    //由外部公开链接跳转到直播逻辑
    let autosendSonData = async (da: any) => {
      //子页面点击进入后list隐藏
      data.zhibolistshow = false;
      data.videoplay = true;
      data.close1 = true;
      data.nowvideoid = da;
      data.videobg = '#191A21';
      //触发连锁反应事件，因为这个函数最先之行
      getmessage();
      //启动打卡程序
      getsigndata();
      //去根据id获取直播视频的url

      let mydata2 = { id: data.nowvideoid };
      let cab: any = await Mpost('/live/gainvideourl', mydata2);
      data.url = htmlurl + cab.data.data.url;
    };

    if (route.query.accesstoken) {
      //拿token去交换eid和name
      axios.defaults.headers.common['authorization'] = route.query.accesstoken;
      let cab: any = await Mpost('/zxylive/tokenlogin', {});

      if (!cab?.data?.data?.eid) {
        return;
      }
      sessionStorage.eid = cab?.data?.data?.eid;
      // //通过md5zhiboid去获取真实的直播id
      // const c1 = await Rget('/zhibolist', {
      //   md5id: route.query.zhiboid,
      //   back: '_id',
      // });

      // //这里做一个鉴权，看下视频的地址正不正确
      // if (c1?.data?.data?.length <= 0) {
      //   message.info('你好，暗号不对，送您一张飞机票～～');
      //   router.push('404');
      // }
      //全局赋值直播id
      // data.nowvideoid = c1.data.data[0]._id;

      let datax1 = {
        _id: cab?.data?.data?.zhiboid,
        limit: '1',
      };

      const a = await Rget('/zhibolist', datax1);

      //下面进行跳转
      if (a.data.data) {
        let data1 = {
          eid: sessionStorage.eid,
          limit: '1',
          back: 'name',
        };
        //通过eid去获取从而赋值sessionStorage.user
        const cab1 = await Rget('/skyuser', data1);
        try {
          sessionStorage.user = cab1.data.data[0].name;
        } catch (error) {
          console.log('通过eid去获取从而赋值sessionStorage.user');
        }
        autosendSonData(cab?.data?.data?.zhiboid);
      } else {
        message.info('你好，暗号不对，送您一张飞机票～～');
        router.push('404');
      }
    }

    const onSearch = async (searchValue: string) => {
      //不允许游客发送消息
      if (sessionStorage.eid == '999999') {
        message.info('你好游客，为了网络安全，您还不能发送消息～～');
      }
      // data.radiovalue==>1 代表所有人 2代表老师和导播

      let lval = sessionStorage.user + '说：' + searchValue;

      //提交到数据库
      let url = '/live/message';
      let mydata = {
        user: sessionStorage.user,
        eid: sessionStorage.eid,
        message: searchValue,
        type: data.radiovalue,
        zhiboid: data.nowvideoid,
      };
      await Mpost(url, mydata);
      let pdata = {
        command: 'message',
      };
      sendWsMessage(pdata);
    };

    //1授权系统天健用户
    //1.1通过eid去数据库查询自己组是否属于管理原来决定是否开启设置

    let url = '/live/eid';
    let mydata = {
      eid: sessionStorage.eid,
    };

    let cabg = await Mpost(url, mydata);

    const adminarr = ['硬件网络维护部', '行政管理总部领导', '教育培训部'];

    if (adminarr.includes(cabg.data.data.departmentchild)) {
      data.admin = true;
    }

    // 2.去拉取直播列表的group name arry
    {
      let url = '/live/findzhibo_groupname';
      let url2 = '/live/livegroup';
      let can_list_id: any = [];
      let cab = await Mpost(url, '');
      let grouplist = [];
      //遍历直播列表

      for (const i of cab.data.data) {
        //遍历组名
        if (!i.group) {
          continue;
        }
        for (const ii of i.group) {
          //通过组名group 名字去获取livegroup
          let data = {
            groupname: ii,
          };
          //这里注释的话，就去除了组判断
          // grouplist.push(ii)
          // let cab2 = await Mpost(url2, data);

          // if (!cab2.data.data) {
          //   continue;
          // }
          // if (cab2.data.data.branch.includes(cabg.data.data.branch)) {
          //   can_list_id.push(i._id);
          // } else if (cab2.data.department.includes(cabg.data.department)) {
          //   can_list_id.push(i._id);
          // } else if (
          //   cab2.data.departmentchild.includes(cabg.data.departmentchild)
          // ) {
          //   can_list_id.push(i._id);
          // } else if (cab2.data.name.includes(cabg.data.name)) {
          //   can_list_id.push(i._id);
          // }
        }
      }
      //去重复

      let set = new Set(can_list_id);
      let a = Array.from(set);
      can_list_id = a;

      //去根据直播id去查询直播array
      //console.log(can_list_id);
      //去获取直播并渲染

      for (const i of can_list_id) {
        let url3 = '/live/searchidzhibo';
        let data2: any = {
          _id: i,
        };
        let cab3 = await Mpost(url3, data2);

        let ob: any = {
          name: cab3.data.data.name,
          _id: cab3.data.data._id,
          starttime: cab3.data.data.starttime,
        };

        data.showzhibolist.push(ob);
      }
    }

    //1.4允许组外属于公开直播
    let urlfindzhibo = '/live/findzhibo';
    let caburlfindzhibo: any = await Mpost(urlfindzhibo, '');

    for (let i = 0; i < caburlfindzhibo.data.data.length; i++) {
      if (!caburlfindzhibo.data.data[i].power) {
        continue;
      }

      if (
        caburlfindzhibo.data.data[i].power[0] &&
        sessionStorage.eid != '999999'
      ) {
        //这个是用户添加逻辑
        data.showzhibolist.push(caburlfindzhibo.data.data[i]);
      } else if (
        //这个是游客添加逻辑
        caburlfindzhibo.data.data[i].power[1] &&
        sessionStorage.eid == '999999'
      ) {
        data.showzhibolist.push(caburlfindzhibo.data.data[i]);
      }
    }
    //1.4.1 如果这个直播的时间是超过当前的时间的，那么就应该过期删除
    for (const key in data.showzhibolist) {
      let startTime = data.showzhibolist[key].starttime[1];
      let nowtime = moment().format('YYYY-MM-DD HH:mm');
      const diff4 = moment(nowtime).diff(moment(startTime), 'minutes');
      //说明过期了
      if (diff4 > 0) {
        delete data.showzhibolist[key];
      }
    }
    data.showzhibolist = data.showzhibolist.filter((item: any) => item);

    //1.5去重复
    let newArr: any = [];
    let obj: any = {};
    for (let i = 0; i < data.showzhibolist.length; i++) {
      if (!obj[data.showzhibolist[i]._id]) {
        newArr.push(data.showzhibolist[i]);
        obj[data.showzhibolist[i]._id] = true;
      }
    }
    data.showzhibolist = newArr;

    //3.1进入直播间逻辑,说明被点击了，实时触发
    let sendSonData = async (da: any) => {
      //子页面点击进入后list隐藏
      data.zhibolistshow = false;
      data.videoplay = true;
      data.close1 = true;
      data.nowvideoid = da;
      data.videobg = '#191A21';

      //触发连锁反应事件，因为这个函数最先之行
      getmessage();
      //启动签到程序
      getsigndata();
      //去根据id获取直播视频的url
      let mydata2 = { id: data.nowvideoid };
      let cab: any = await Mpost('/live/gainvideourl', mydata2);
      data.url = htmlurl + cab.data.data.url;
    };

    //3.2退出直播间逻辑
    const tohome = () => {
      data.zhibolistshow = true;
      data.videoplay = false;
      data.close1 = false;
      data.nowvideoid = '';
      data.videobg = '#fff';
      wsdata.askshow = false;
    };

    //2授权系统游客权限
    if (sessionStorage.eid == '999999') {
      data.signtime = false;
      data.admin = false;
    }

    watch(
      () => wsdata.signdata,
      () => {
        getsigndata();
      },
    );

    const timethis = async () => {
      //所有的操作都是在进入直播以后干的事情
      if (!data.nowvideoid) {
        return;
      }
      myscroll();
      let time = moment().format('YYYY-MM-DD HH:mm');
      let letmesee = 0;
      for (const i of data.signdata.signtime) {
        if (i == time) {
          need = true;
          break;
        } else {
          letmesee++;
        }
      }
      //都没有匹配到说明数组中不存在
      if (letmesee == data.signdata.signtime.length) {
        //但防止这分钟的尾声巧合二立马关闭，所以我们给予一个30s的延迟
        setTimeout(() => {
          need = false;
        }, 30000);
      }
      data.liveoff++;
    };
    setTimeout(() => {
      timec = setInterval(timethis, 2000);
    }, 1000);

    watch(
      () => data.liveoff,
      () => {
        if (need && data.videoplay) {
          data.signtime = true;
        } else if (need == false) {
          data.signtime = false;
        }
      },
    );

    //签到点击事件
    const signtimeclick = async () => {
      //阻止多次点击事件
      if (!data.signtime) {
        return;
      }
      //1css部分
      //签到窗口显示控制
      data.signtime = false;
      //需要签到控制
      need = false;
      //防止时间函数再一次开启签到页面
      clearInterval(timec);
      //一分钟后就无法匹配到这次时间
      setTimeout(() => {
        timec = setInterval(timethis, 2000);
      }, 60000);

      //2事件部分
      //2.1把这次点击的时间添加到数据库
      let savesign = '/live/savesign';
      let mydata2 = {
        zhiboid: data.nowvideoid,
        sign: {
          name: sessionStorage.user,
          eid: sessionStorage.eid,
          signtime: moment().format('YYYY-MM-DD HH:mm'),
        },
      };
      await Mpost(savesign, mydata2);
    };

    //6通过观察 data.nowvideoid ，来判断和增加累计时长
    //6.1先去查询看数据库有没有已经添加的信息
    let addtime = async () => {
      let mydata = {
        zhiboid: data.nowvideoid,
        eid: sessionStorage.eid,
        name: sessionStorage.user,
        limit: '1',
      };
      const a = await Rget('/zhibolist_longtime', mydata);

      if (a.data.data.length == 0) {
        let data4 = {
          zhiboid: data.nowvideoid,
          eid: sessionStorage.eid,
          name: sessionStorage.user,
          time: '1',
        };
        await Rpost('/zhibolist_longtime', data4);
      } else {
        let data5 = {
          zhiboid: data.nowvideoid,
          eid: sessionStorage.eid,
          name: sessionStorage.user,
          time: (parseInt(a.data.data[0].time) + 1).toString(),
        };
        await Rput('/zhibolist_longtime', a.data.data[0]._id, data5);
      }
    };

    let time60: any;
    watch(
      () => data.nowvideoid,
      (a: string) => {
        if (a) {
          clearInterval(time60);
          //Execution time increaser
          time60 = setInterval(addtime, 60 * 1000);
        }
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

    const showModal = () => {
      data.visible = true;
    };
    const handleOk = (e: MouseEvent) => {
      data.visible = false;
    };
    //设置宽高样式事件
    const cssheightclick = () => {
      if (data.cssheight == 300) {
        data.cssheight = 50;
      } else {
        data.cssheight = 300;
      }
    };
    const cssheightclick2 = () => {
      if (data.cssheight2 == 300) {
        data.cssheight2 = 50;
      } else {
        data.cssheight2 = 300;
      }
    };
    return {
      showModal,
      handleOk,
      onSearch,
      sendSonData,
      tohome,
      signtimeclick,
      cssheightclick,
      getmessage,
      cssheightclick2,
      askshowclick,
      ...toRefs(data),
    };
  },

  components: {
    SettingFilled,
    myset,
    Zhibolist,
    CloseOutlined,
    FullscreenOutlined,
    MinusSquareOutlined,
    QuestionCircleOutlined,
    heart,
    ask,
  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.a1 {
  margin-top: 18px;
  position: absolute;
  top: 0px;
  left: 30px;
  z-index: 10;
  border: 1px solid #616161;
  border-radius: 3px;
  padding: 2px 5px;
}
.a11 {
  left: 65px;
}
.c5 {
  position: absolute;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  margin: 0;
}
.touch2 {
  color: #ff9800;
}
.touch2:hover {
  cursor: pointer;
  color: #ececec;
}
.c4 {
  font-size: 20px;
  color: #2c3e50;
  position: absolute;
  right: 0px;
  top: 0px;
}

.c3,
.c1 {
  opacity: 0.7;
  color: #2490e9;
  position: relative;
  position: fixed;
  z-index: 11;
  top: 0px;
  width: 20%;
  background: #ededed;
  border-radius: 5px;
  padding: 10px;
  overflow-y: scroll;
  font-size: 13px;
}

.c3 {
  right: 0;
  margin-top: 255px;
}

.c1 {
  right: 0;
}

.c3m,
.c1m {
  opacity: 0.7;
  color: #2490e9;
  position: relative;
  position: fixed;
  z-index: 11;
  bottom: 100px;
  width: 90%;
  background: #ededed;
  border-radius: 5px;
  padding: 10px;
  overflow-y: scroll;
  font-size: 13px;
  left: 0;
  right: 0;
  margin: auto;
}

.c3m {
  display: none;
}

.c2 {
  font-size: 20px;
  color: #2c3e50;
  position: absolute;
  right: 0;
  top: 0px;
}
::-webkit-scrollbar {
  height: 8px !important;
  width: 5px !important;
}

::-webkit-scrollbar-thumb {
  border-radius: 0;
  border-style: dashed;
  background-color: rgba(12, 80, 235, 0.4);
  border-color: red;
  border-width: 1px;
  background-clip: padding-box;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 1px;
  background: #ededed;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(157, 165, 183, 0.7);
}
</style>
