<template>
  <a-card title="请登录" style="width: 100%; box-shadow: 2px 2px 2px #304455">
    <template #extra><a href="#">✕</a></template>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1">
        <template #tab>
          <span>
            <TeamOutlined />
            我是天健员工
          </span>
        </template>
        <!-- 用户部分 -->
        <div>
          <a-row style="margin-top: 20px">
            <a-col
              style="line-height: 33px"
              :xs="6"
              :md="{ span: 3, offset: 6 }"
              >用户名：</a-col
            >
            <a-col :xs="18" :md="10">
              <a-input v-model:value="skyuser" placeholder="请输入内容" />
            </a-col>
          </a-row>
          <a-row style="margin-top: 20px">
            <a-col
              style="line-height: 33px"
              :xs="6"
              :md="{ span: 3, offset: 6 }"
              >密&nbsp;&nbsp;&nbsp;&nbsp;码：</a-col
            >
            <a-col :xs="18" :md="10">
              <a-input-password
                v-model:value="skypwd"
                placeholder="请输入内容"
              />
            </a-col>
          </a-row>
          <a-row style="margin-top: 20px">
            <a-col :md="{ offset: 9 }">
              <a-switch v-model:checked="checked1" />
            </a-col>
            <a-col style="color: #409eff; line-height: 25px; margin-left: 5px"
              >自动登陆</a-col
            >
          </a-row>

          <a-row style="margin-top: 20px">
            <a-col :xs="{ offset: 10 }" :md="{ offset: 16 }">
              <a-button>取消</a-button>
            </a-col>
            <a-col :md="{ offset: 1 }" :xs="{ offset: 1 }">
              <a-button @click="skylogin()" type="primary">确定</a-button>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane style="display: none" key="2" force-render>
        <template #tab>
          <span>
            <UserOutlined />
            我是游客
          </span>
        </template>
      
        <div>
          <a-row style="margin-top: 20px">
            <a-col style="line-height: 33px" :md="4" :offset="6"
              >单位/姓名：</a-col
            >
            <a-col :md="10">
              <a-input v-model:value="guestuser" placeholder="请输入内容" />
            </a-col>
          </a-row>
          <a-row style="margin-top: 20px">
            <a-col style="line-height: 33px" :md="4" :offset="6"
              >密&nbsp;&nbsp;&nbsp;&nbsp;码：</a-col
            >
            <a-col :md="10">
              <a-input-password
                v-model:value="guestpwd"
                placeholder="请输入内容"
              />
            </a-col>
          </a-row>
          <a-row style="margin-top: 20px">
            <a-col :offset="9">
              <a-switch v-model:checked="checked2" />
            </a-col>
            <a-col style="color: #409eff; line-height: 25px; margin-left: 5px"
              >自动登陆</a-col
            >
          </a-row>

          <a-row style="margin-top: 20px">
            <a-col :offset="10">
              <a-button>取消</a-button>
            </a-col>
            <a-col :offset="1">
              <a-button @click="guestlogin()" type="primary">确定</a-button>
            </a-col>
            <a-col :offset="1">
              <a-button @click="showModal" type="primary">注册</a-button>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane> -->
    </a-tabs>
  </a-card>

  <!-- <template>
    <div>
      <a-button type="primary" @click="showModal">游客注册页面</a-button>
      <a-modal v-model:visible="visible" title="游客注册页面" @ok="handleOk">
        <div style="width: 80%; margin: auto">
          <p>
            <a-input v-model:value="guestreguser" placeholder="用户名" />
          </p>
          <p>
            <a-input-password v-model:value="guestregpwd" placeholder="密码" />
          </p>
          <p>
            <a-input-password
              v-model:value="guestregpwd2"
              placeholder="再一次输入密码"
            />
          </p>
          <p>
            <a-input v-model:value="guestregemail" placeholder="邮箱" />
          </p>
        </div>
      </a-modal>
    </div>
  </template> -->
</template>
<script lang="ts">
import { TeamOutlined, UserOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { Mpost } from '../../../config/http/index';
import { useRouter } from 'vue-router';
import { settime, isouttime, eid, user } from '../../tools/time';
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { tree } from '../center/store/tree';

export default defineComponent({
  data() {
    return {};
  },

  async setup() {
    const router = useRouter();
    let data = reactive({
      value: '',
      skyuser: '',
      skypwd: '',
      guestuser: '',
      guestpwd: '',
      activeKey: '1',
      guestreguser: '',
      guestregpwd: '',
      guestregpwd2: '',
      guestregemail: '',
      visible: false,
      checked1: false,
    });
    if (localStorage.autologin == '1') {
      //如果登陆认证没有过期
      data.checked1 = true;
      setTimeout(async () => {
        if (await isouttime()) {
          let testeid = await eid();
          sessionStorage.eid = await eid();
          sessionStorage.user = await user();

          message.success('欢迎回来👏 ' + (await user()));
          setTimeout(() => {
            router.push('center');
          }, 1500);
          return;
        }
      }, 200);
    }

    watch(
      () => data.checked1,
      (a) => {
        console.log(a);
        if (a) {
          localStorage.autologin = '1';
        } else {
          localStorage.autologin = '0';
        }
      },
    );

    //天健用户登陆
    const skylogin = async () => {
      let mydata = {
        user: data.skyuser,
        pwd: data.skypwd,
      };

      //这里授权一个外部登陆账号
      if (data.skyuser == 'test' && data.skypwd == '000000') {
        sessionStorage.eid = '115097';
        sessionStorage.user = '熊忠波';
        message.success('欢迎登陆👏 ' + sessionStorage.user);
        router.push('center');
        return;
      }

      //这里是一个仿生账号
      if (data.skyuser == 'test2' && data.skypwd == '000000') {
        sessionStorage.eid = '100698';
        sessionStorage.user = '叶怀敏';
        message.success('欢迎登陆👏 ' + sessionStorage.user);
        router.push('center');
        return;
      }

      let url = '/live/login';
      let cab = await Mpost(url, mydata);

      if (cab?.data?.data) {
        //1.1拿到eid以后去查询自己的名字

        sessionStorage.eid = String(cab.data.data.eid);

        let url = '/live/eid';
        let mydata: any = {
          eid: sessionStorage.eid,
        };

        let cab2 = await Mpost(url, mydata);

        settime(cab.data.data.eid, cab2.data.data.name);
        sessionStorage.user = cab2.data.data.name;
        message.success('欢迎登陆👏 ' + sessionStorage.user);
        router.push('center');
      } else {
        message.error('账号密码错误');
      }
    };

    //游客用户登陆
    // const guestlogin = async () => {
    //   let mydata = {
    //     user: data.guestuser,
    //     pwd: data.guestpwd,
    //   };
    //   let url = '/live/guestlogin';
    //   let cab = await Mpost(url, mydata);
    //   if (cab.data.data) {
    //     message.success('登陆成功');
    //     sessionStorage.eid = '999999';
    //     router.push('center');
    //   } else {
    //     message.error('账号密码错误');
    //   }
    // };

    //点击注册显示注册窗口
    // const showModal = () => {
    //   data.visible = true;
    // };

    //注册页面点击确定
    // const handleOk = async (e: MouseEvent) => {
    //   let mydata = {
    //     user: data.guestreguser,
    //     pwd: data.guestregpwd,
    //   };
    //   let url = '/live/guestreg';
    //   let cab = await Mpost(url, mydata);

    //   if (cab.data.data) {
    //     message.success('注册成功');
    //     data.visible = false;
    //   } else {
    //     message.error('用户名已经存在');
    //   }
    // };

    return {
      ...toRefs(data),
      skylogin,

      // handleOk,
      // guestlogin,
    };
  },
  components: {
    UserOutlined,
    TeamOutlined,
  },
});
</script>
