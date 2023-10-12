<template>
  <div style="
      margin-left: 20px;
      overflow-y: scroll;
      height: 400px;
      text-align: left;
    ">
    <div v-for="(item, index) in showarr" :key="index">
      <a-row v-if="item.backurl == '等待回传'" style="
          margin-bottom: 15px;
          font-size: 10px;
          border: 1px solid #ececec;
          padding: 5px;
          box-shadow: 10px 10px 5px #888888;
        ">
        <a-col :md="24">
          <div style="margin-bottom: 5px; position: relative">
            <a-popover :title="item.starttime[0] + '-' + item.starttime[1]" placement="left">
              <template #content>
                <div style="font-size: 12px" v-for="(v, i) in item.group" :key="i">
                  {{ v }}
                </div>
              </template>
              <a-button block style="text-align: left">
                <template #icon>
                  <TeamOutlined />
                </template>
                <a-badge count="109" :overflow-count="999" :number-style="{ backgroundColor: '#52c41a' }" />
                <span class="line1" style="margin-left: 5px; font-size: 13px; width: 60%">{{ item.name }}</span>
              </a-button>
            </a-popover>
            <a-row>
              <a-col :xs="{ span: 0 }" :md="{ span: 24 }" style="overflow: hide">
                <div style="
                    height: 100%;
                    line-height: 35px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding-right: 5px;
                    width: 20%;
                    text-align: center;
                  ">
                  <a-tooltip placement="top" @click="powerchange(item._id, item.power)">
                    <template #title>
                      <span v-if="item.power[0]">允许组外用户观看</span>
                      <span v-if="item.power[0] == false">不允许组外用户观看</span>
                    </template>
                    <CheckOutlined v-if="item.power[0]" class="touch" style="font-size: 17px; color: #52c41a" />
                    <CloseOutlined class="touch" v-if="item.power[0] == false"
                      style="font-size: 17px; color: #f97875" />
                  </a-tooltip>
                  &nbsp;&nbsp;
                  <a-tooltip placement="top" @click="powerchange2(item._id, item.power)">
                    <template #title>
                      <span v-if="item.power[1]">允许游客观看</span>
                      <span v-if="item.power[1] == false">不允许游客观看</span>
                    </template>
                    <CheckOutlined class="touch" v-if="item.power[1]" style="font-size: 17px; color: #52c41a" />
                    <CloseOutlined class="touch" v-if="item.power[1] == false"
                      style="font-size: 17px; color: #f97875" />
                  </a-tooltip>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>

        <a-col :md="3" style="padding: 1px">
          <a-tooltip placement="bottom">
            <template #title> 发起签到 </template>
            <a-button @click="addsigntime(item._id)" style="font-size: 12px" block type="primary" danger>
              <FormOutlined />
            </a-button>
          </a-tooltip>
        </a-col>
        <a-col :md="3" style="padding: 1px">
          <a-button @click="myexcel(item._id)" style="font-size: 12px" block type="primary" danger>
            <DownloadOutlined />
          </a-button>
        </a-col>
        <a-col :md="3" style="padding: 1px">
          <a-tooltip placement="bottom">
            <template #title> 删除 </template>
            <a-popconfirm title="警告:确定删除吗？" ok-text="是的" cancel-text="取消" @confirm="confirm">
              <a href="#">
                <a-button @click="degzhibo(item._id)" style="font-size: 12px" block type="danger" danger>
                  <DeleteOutlined />
                </a-button>
              </a>
            </a-popconfirm>
          </a-tooltip>
        </a-col>
        <a-col :md="3" style="padding: 1px">
          <upload v-if="item.backurl == '等待回传' ? (uploadStatus = '上传') : '上传'" @click="getNowid(item._id)" />
          <a-button v-else type="dashed" disabled>已经上传</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import {
  TeamOutlined,
  DeleteOutlined,
  DownloadOutlined,
  FormOutlined,
  CheckOutlined,
  CloseOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons-vue';
import { sendWsMessage } from '@config/http/ws';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { message } from 'ant-design-vue';
import { reactive, toRefs, defineComponent } from 'vue';
import XLSX, { WorkSheet } from 'xlsx';
import upload from './minicom/upload.vue';
import { Mpost, Rget } from '@config/http/index';
import { uploaddata } from './minicom/upload';

export default defineComponent({
  data() {
    return { ...toRefs(uploaddata) };
  },
  async setup() {
    let data = reactive({
      showarr: [
        {
          starttime: ['2021-07-01 08:39', '2021-07-01 08:39'],
          name: '测试的直播',
          power: [true, false],
          group: [],
        },
      ],
    });

    //导出记录
    const myexcel = async (id: any) => {


      //1.1读出所有的键
      let url = '/get/redisList';
      let cab = await Rget(url, {});
      console.log(cab.data.data);

      //匹配下是否当前zhiboid
      let arr = []
      for (const i of cab.data.data) {


        if (i.zhiboid == id) {
          arr.push(i)
        }
      }
      console.log(arr);

      let aoa = [
        [
          '姓名',
          '员工号',
          '部门',
          '分所',

        ],
      ];

      for (const i of arr) {
        let arrtemp = [i.fullName, i.eid, i.departmentId, i.organizationId]
        // console.log(i);

        aoa.push(arrtemp)
      }
      let worksheet: WorkSheet = XLSX.utils.aoa_to_sheet(aoa);
      let workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "第一页");
      XLSX.writeFile(workbook, '打卡' + '.xlsx');


    };

    //获取分组
    let url = '/live/findzhibo';
    let cabbranch = await Mpost(url, '');

    data.showarr = cabbranch.data.data.reverse();

    //删除确认
    let degzhiboid = '';
    const confirm = async (a: any) => {
      if (a.isTrusted) {
        let url2 = '/live/degzhibo';
        let mydata = {
          _id: degzhiboid,
        };
        let cab = await Mpost(url2, mydata);

        if (cab) {
          let url = '/live/findzhibo';
          let cabbranch = await Mpost(url, '');
          data.showarr = cabbranch.data.data;
        }
      }
    };
    //删除直播
    const degzhibo = async (id: string) => {
      degzhiboid = id;
    };

    //修改直播组权限
    const powerchange = async (id: string, power: any) => {
      if (power[0]) {
        power[0] = false;
      } else if (power[0] == false) {
        power[0] = true;
      }

      let url = '/live/updatezhibogroup';
      let mydata = {
        _id: id,
        power: power,
      };
      await Mpost(url, mydata);
    };
    //修改访客组权限
    const powerchange2 = async (id: string, power: any) => {
      if (power[1]) {
        power[1] = false;
      } else if (power[1] == false) {
        power[1] = true;
      }
      let url = '/live/updatezhibogroup';
      let mydata = {
        _id: id,
        power: power,
      };
      await Mpost(url, mydata);
    };

    //发起签到
    const addsigntime = async (id: string) => {
      let time = moment().format('YYYY-MM-DD HH:mm:ss');
      const url = '/live/addsigntime';
      let mydata = {
        _id: id,
        time: time,
      };
      let cab = await Mpost(url, mydata);
      if (cab) {
        message.success('成功发起签到');
        let pdata = {
          command: 'sign',
        };
        sendWsMessage(pdata);
      }
    };

    const getNowid = async (id: any, backurl: any) => {
      //授权父子变量
      uploaddata.nowid = id;
      //模态框显示
      uploaddata.visible2 = true;
    };

    return {
      ...toRefs(data),
      getNowid,
      degzhibo,
      confirm,
      myexcel,
      powerchange,
      powerchange2,
      addsigntime,
    };
  },
  components: {
    upload,
    TeamOutlined,
    DeleteOutlined,
    DownloadOutlined,
    FormOutlined,
    CheckOutlined,
    CloseOutlined,
    QuestionCircleOutlined,
  },
});
</script>
<style type="text/css">

</style>
