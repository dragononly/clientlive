<template>
  <div
    style="
      width: 100%;
      margin: auto;
      padding: 10px;
      box-shadow: 5px 5px 5px #888888;
      border: 1px solid #ececec;
    "
  >
    <a-row>
      <a-col
        :md="6"
        style="line-height: 30px; font-size: 15px; text-align: left"
        >直播项目名</a-col
      >
      <a-col :md="18">
        <a-input v-model:value="zhiboname" placeholder="请输入直播标题" />
      </a-col>
    </a-row>
    <a-row style="margin-top: 5px">
      <a-col :xs="24">
        <a-space direction="vertical">
          <a-range-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始时间', '结束时间']"
            @change="onChangestarttime"
          />
        </a-space>
      </a-col>
    </a-row>
    <a-row style="margin-top: 5px">
      <a-col :xs="24" :md="24">
        <div>
          <a-select
            style="width: 100%"
            v-model:value="selectvalue"
            mode="multiple"
            placeholder="选择收藏夹中的用户组"
            option-label-prop="label"
          >
            <a-select-option
              v-for="(i, index) in group"
              :key="index"
              :value="i.name"
              :label="i.name"
            >
              <span role="img" :aria-label="i.name">
                {{ i['img'] }}
              </span>
              {{ i['name'] }}
            </a-select-option>
          </a-select>
        </div>
      </a-col>
    </a-row>
    <div style="margin-top: 2px">
      <div>
        <a-checkbox v-model:checked="checked">允许组外员工收看</a-checkbox>
        <a-checkbox v-model:checked="checked2">允许游客收看</a-checkbox>
      </div>
      <div style="padding: 5px 0">
        <a-input v-model:value="videourl" placeholder="视频源" />
      </div>
    </div>
    <a-row>
      <a-col :xs="20" :md="12">
        <a-date-picker
          show-time
          @change="onChangeSignin"
          placeholder="预设签到时间"
        />
      </a-col>
      <a-col :xs="24" :md="3" :offset="1">
        <a-button type="primary" block @click="signtime()">
          <template #icon>
            <PlusOutlined />
          </template>
        </a-button>
      </a-col>
    </a-row>

    <div
      style="
        height: 150px;
        border: 1px solid #ececec;
        margin-top: 5px;
        overflow-y: scroll;
      "
    >
      <div v-for="(v, i) in timearr" :key="i">
        <a-button
          @click="detime(i)"
          style="text-align: left"
          block
          type="dashed"
          danger
          size="small"
          >{{ v
          }}<span style="float: right">
            <a-button type="danger" danger size="small">删除</a-button>
          </span></a-button
        >
      </div>
    </div>
    <a-row style="line-height: 30px">
      <a-col :xs="25" :md="15" style="font-size: 13px; color: #304455"
        >签到时限30秒</a-col
      >
      <a-col :md="4"> </a-col>
      <a-col :md="4" :offset="1">
        <a-button @click="cltime()" block size="small" type="danger" style=""
          >清空</a-button
        >
      </a-col>
    </a-row>

    <a-row>
      <a-col :xs="24" :md="6">
        <a-button @click="start()" block type="primary">启动</a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, reactive, toRefs } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import moment, { Moment } from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { message } from 'ant-design-vue';
import { Mpost } from '@config/http/index';
import { data } from './store/startlive';
export default defineComponent({
  data() {
    return {
      ...toRefs(data),
    };
  },
  components: {
    PlusOutlined,
  },
  async setup(p, ctx) {
    let nowciicktime: any = '', //预设签到时间日期变量
      arrstarttime: any = ''; //预设直播项目名时间日期变量
    //1去加载分组
    if (data.off) {
      let url = '/live/searchgroup2';

      let cabgroup = await Mpost(url, '');
      for (let i = 0; i < cabgroup.data.data.length; i++) {
        let ob: any;
        ob = {
          name: cabgroup.data.data[i].groupname,
          img: '⭐️',
        };
        data.group.push(ob);
      }
      data.off = false;
    }

    //当时间修改的时候日期显示的内容
    const onChangeSignin = (value: Moment[], dateString: any) => {
      nowciicktime = dateString.substr(0, 16);
    };
    //直播日期栏的修改
    const onChangestarttime = (value: Moment[], dateString: any) => {
      arrstarttime = dateString;
    };

    //签到时间后面的小删除按钮
    const detime = (i: any) => {
      data.timearr.splice(i, 1);
    };

    //清空按钮点击事件
    const cltime = (i: any) => {
      data.timearr = [];
    };

    const start = async () => {
      let power: any = [];
      //1需要获得以下参数
      //1.1直播名
      if (!data.zhiboname) {
        message.info('直播名还是空的');
        return;
      }
      //1.2直播时间
      if (!arrstarttime) {
        message.info('直播的开始时间没选');
        return;
      }
      //1.3用户组
      if (!data.selectvalue.length) {
        message.info('用户组还没选');
        return;
      }
      //1.4权限
      power.push(data.checked);
      power.push(data.checked2);

      let url = '/live/addzhibo';

      //1.5保存到数据的签到时间需要去重复
      let newarr: any = new Set(data.timearr);
      newarr = Array.from(newarr);
      let mydata = {
        name: data.zhiboname,
        starttime: arrstarttime,
        group: data.selectvalue,
        power: power,
        signtime: newarr,
        url: data.videourl,
      };

      let cabarr = await Mpost(url, mydata);
      if (cabarr.data.data) {
        message.info('成功启动');
      }
    };
    //签到时间增加按钮点击事件
    const signtime = () => {
      if (nowciicktime) {
        data.timearr.push(nowciicktime);
      } else {
        message.info('时间还没选');
      }
    };

    const onSearch = (searchValue: string) => {
      // console.log('use value', searchValue);
      // console.log('or use this.value', value.value);
    };

    watch(data.selectvalue, (val) => {
      console.log(`selected:`, val);
    });
    return {
      onSearch,
      signtime,
      detime,
      cltime,
      start,
      onChangestarttime,
      onChangeSignin,
    };
  },
});
</script>
