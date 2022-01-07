<template>
  <div style="padding-top: 1px">
    <div class="group1">
      <div class="text">打卡签到</div>
      <div class="text2">14:00距结束</div>
      <div class="text3">
        {{ hours % 60 }}:{{ mintus % 60 }}:{{ seconds % 60 }}
      </div>
    </div>
    <div class="c1">
      <div @click="showModal" class="group2 touch">打卡</div>
      <div class="group3 touch">{{ sta }}</div>
    </div>
  </div>

  <a-modal v-model:visible="visible" title="登录签到" @ok="handleOk">
    <p><a-input v-model:value="value" placeholder="账号密码" /></p>
    <p><a-input v-model:value="value2" placeholder="密码" /></p>
  </a-modal>
</template>

<script lang="ts">
import { Rpost, Mpost, Rget } from '@config/http/index';
import { defineComponent, reactive, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import moment from 'moment';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'home',
  async setup() {
    let data = reactive({
      visible: false,
      value: '',
      value2: '',
      sta: '查询',
      BB: '2022-01-03 14:00:00',
      seconds: 12,
      mintus: 0,
      hours: 0,
      nowtime: new Date(),
    });
    let time1: any = null;
    const router = useRouter();
    //时间差地方

    time1 = setInterval(() => {
      data.nowtime = new Date();

      let start_date = moment(data.nowtime, 'YYYY-MM-DD HH:mm:ss');
      let end_date = moment(data.BB, 'YYYY-MM-DD HH:mm:ss');
      //秒
      data.seconds = end_date.diff(start_date, 'seconds');
      if (data.seconds < 0) {
        message.info('年会开始');
        clearInterval(time1);
        router.push('/');
      }

      //分钟
      data.mintus = parseInt(String(data.seconds / 60));
      //小时
      data.hours = parseInt(String(data.mintus / 60));
    }, 1000);

    if (localStorage.getItem('sign') == 'yes') {
      data.sta = '已签到';
    }

    const showModal = async () => {
      //1. Go to search db exist
      if (localStorage.getItem('sign') == 'yes') {
        message.info('你已经打过卡了');
      } else {
        data.visible = true;
      }
    };

    const handleOk = async () => {
      let mydata = {
        user: data.value,
        pwd: data.value2,
      };
      let url = '/live/login';
      const cab: any = await Mpost(url, mydata);
      // console.log(cab.data.data);
      // id: 7988, eid: 115097, login_id: 'xiongzhongbo', login_password: 'ibB1nugnDEOjIHHW7F+yfQ=='
      if (cab?.data?.data) {
        localStorage.setItem('sign', 'yes');
        let mydata2 = {
          eid: cab?.data?.data?.eid,
          limit: '1',
        };
        //通过eid去查询部门，departmentchild， 名字，eid
        const cab2 = await Rget('/skyuser', mydata2);
        // console.log(cab2.data.data[0]);
        // branch: "杭州总所"
        // department: "行政管理总部"
        // departmentchild: "硬件网络维护部"
        // eid: "115097"
        // name: "熊忠波"
        // rank_id: "12000157"
        // __v: 0
        // _id: "61c447fcbc01821445da9ce5"

        if (cab2?.data?.data[0]?.eid) {
          let mydata3 = {
            eid: cab2?.data?.data[0]?.eid,
            departmentchild: cab2?.data?.data[0]?.departmentchild,
            name: cab2?.data?.data[0]?.name,
          };

          const cab3 = await Rpost('/skyyear', mydata3);
          if (cab3?.data?.data) {
            message.info('打卡成功');
            data.visible = false;
          } else {
            message.info('重复打卡，是不是在别的地方打卡过一次？');
          }
        }
      } else {
        localStorage.setItem('sign', 'no');
        message.info('账号密码错误');
      }
    };
    return {
      ...toRefs(data),
      showModal,
      handleOk,
    };
  },
  components: {},
});
</script>

<style scoped>
.group1 {
  position: relative;
  margin: auto;
  margin-top: 20px;
  width: 370px;
  height: 240px;
  background: #e02a1f;
  border: 1px solid #c2cfd2;
  box-sizing: border-box;
}
.group1 > .text {
  position: absolute;
  width: 124px;
  height: 34px;
  top: 65px;
  left: 0;
  right: 0;
  margin: auto;
  font-size: 30px;
  line-height: 35px;
  font-weight: 500;

  color: #ffffff;
}
.group1 > .text2 {
  position: absolute;
  width: 104px;
  height: 21px;
  top: 118px;
  left: 0;
  right: 0;
  margin: auto;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 550;
  line-height: 21px;
  /* identical to box height */

  color: #ffffff;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.group1 > .text3 {
  position: absolute;
  width: 234px;
  height: 53px;
  left: 0;
  right: 0;
  margin: auto;
  top: 149px;
  font-size: 30px;
  line-height: 53px;

  color: #ffffff;
  background: #1a1616;
}
.group2 {
  position: absolute;
  width: 134px;
  height: 134px;
  left: 0px;
  border-radius: 134px;

  background: #14b57b;

  font-weight: bold;
  font-size: 22px;
  line-height: 134px;

  color: #f1e046;
}
.group3 {
  position: absolute;
  width: 134px;
  height: 134px;
  left: 213px;
  border-radius: 134px;

  background: #14b57b;

  font-weight: bold;
  font-size: 22px;
  line-height: 134px;

  color: #f1e046;
}
.c1 {
  width: 360px;
  height: 150px;
  margin: auto;
  margin-top: 20px;
  position: relative;
}
</style>
