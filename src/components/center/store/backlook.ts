import { reactive, toRefs } from "vue";

export const backlook = reactive({
    width: '100%', //播放器高度
    height: 'auto', //播放器高度
    color: '#409eff', //主题色
    title: '视频名', //视频名称
    src: '', //视频源
    muted: false, //静音
    webFullScreen: true,
    speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
    autoPlay: false, //自动播放
    loop: false, //循环播放
    mirror: false, //镜像画面
    ligthOff: false, //关灯模式
    volume: 0.3, //默认音量大小
    control: true, //是否显示控制器
    controlBtns: ['audioTrack', 'quality', 'speedRate', 'volume']
});

