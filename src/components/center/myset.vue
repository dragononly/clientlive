<template>
  <div style="height: 500px">
    <a-row>
      <a-col :xs="10" :md="8" style="">
        <a-menu
          id="dddddd"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          mode="inline"
          @click="handleClick"
        >
          <a-sub-menu v-if="admin" key="sub1" @titleClick="titleClick">
            <template #title>
              <span>
                <SettingOutlined />
                <span>设置</span>
              </span>
            </template>
            <a-menu-item-group key="g1">
              <template #title>
                <QqOutlined />
                <span>设置用户组</span>
              </template>
              <!-- <a-menu-item key="1">用户组</a-menu-item> -->
              <a-menu-item key="0">添加用户组</a-menu-item>
              <a-menu-item key="1">自定义用户组</a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
          <a-sub-menu v-if="admin" key="sub2" @titleClick="titleClick">
            <template #title>
              <span>
                <ToolOutlined />
                <span>直播选项</span>
              </span>
            </template>
            <a-menu-item key="2">开启直播</a-menu-item>
            <a-menu-item key="3">直播列表</a-menu-item>
            <a-menu-item key="4">历史列表</a-menu-item>
            <a-menu-item key="5">推流地址</a-menu-item>
            <a-menu-item key="6">其它设置</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3" @titleClick="titleClick">
            <template #title>
              <span>
                <ToolOutlined />
                <span>用户设置</span>
              </span>
            </template>
            <a-menu-item key="7">退出登陆</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-col>
      <a-col :xs="14" :md="16">
        <!-- 添加用户组 -->
        <mysetc v-if="vif[0]" />

        <!-- 自定义用户组 -->
        <group v-if="vif[1]" />

        <!-- 开启的直播 -->
        <livetelecast v-if="vif[2]" />

        <!-- 直播列表 -->
        <zhibolist v-if="vif[3]" />
        <!-- 直播列表 -->
        <setzhibolistHistory v-if="vif[4]" />
        <!-- 推流地址 -->
        <tuiliu v-if="vif[5]" />
        <!-- 其它设置 -->
        <other v-if="vif[6]" />
        <!-- 用户设置 -->
        <user v-if="vif[7]" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, watch, reactive, toRefs } from 'vue';
import {
  QqOutlined,
  ToolOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import mysetc from './set/adduser.vue';
import user from './set/user.vue';
import other from './set/other.vue';
import group from './set/group.vue';
import livetelecast from './user/startlive.vue';
import Zhibolist from './set/setzhibolist.vue';
import setzhibolistHistory from './set/setzhibolistHistory.vue';
import tuiliu from './set/tuiliu.vue';
import { data } from './store/live';
import { message } from 'ant-design-vue';
import { log } from 'console';
export default defineComponent({
  data() {
    return { ...toRefs(data) };
  },
  setup() {
    let data = reactive({
      selectedKeys: ['5'],
      openKeys: ['sub3'],
      vif: [false, false, false, false, false, false, false, true],
    });

    const handleClick = (e: any) => {
      data.vif = [false, false, false, false, false, false, false, false];
      data.vif[e.key] = true;
    };

    const titleClick = (e: Event) => {};
    watch(
      () => data.openKeys,
      (val) => {},
    );
    return {
      ...toRefs(data),
      handleClick,
      titleClick,
    };
  },
  components: {
    mysetc,
    livetelecast,
    QqOutlined,
    ToolOutlined,
    SettingOutlined,
    setzhibolistHistory,
    group,
    Zhibolist,
    tuiliu,
    user,
    other,
  },
});
</script>
