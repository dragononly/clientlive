import { reactive } from "vue";
let containerRef2: any, containerRef: any, temog: any
import device from "current-device";
// console.log("device.mobile() === %s", device.mobile());
let width: string = "50%", chatmclass = false, xiaoxiwidth = "100%", ifrawidth = "80%", signshowtime: any = 0,
    timeI: any, nowtime: any, lock2: any = "no", timeRecord: any, signed: any, passedtime: any, mobile: boolean = false
if (device.mobile()) {
    width = '100%'
    chatmclass = true
    xiaoxiwidth = '100%'
    ifrawidth = '100%',
        mobile = true
}
let showzhibolist: any = [], signdata: any
export const data = reactive({
    textsignTitle: "点击下面的“签到”按钮，等你10分钟，别错过了哦。",
    userOffSignTable: false,
    signContinueTime: '60',
    toggleFull: true,
    need: false,
    mobile,
    fulloff: true,
    passedtime,
    signed,
    timeRecord,
    nowtime,
    signshowtime,
    lock2,
    timeI,
    url: "",
    temog,
    value: "",
    radiovalue: "1",
    ifrawidth,
    visible: false,
    chatmclass,
    width,
    xiaoxiwidth,
    admin: false,
    signtime: false,
    showzhibolist,
    videobg: '#fff',
    zhibolistshow: true,
    videoplay: false,
    close1: false,
    nowvideoid: "",
    liveoff: 0,
    signdata,
    cssheight: 250,
    cssheight2: 250,

    sayColor: ['#f4cc81', '#f4cc81', '#fff', '#fff', '#f4cc81', '#f4cc81', '#fff', '#fff', '#f4cc81', '#f4cc81'],
    saybgcolor: ['#7834d4', '#587ED2', '#4BA626', '#C8824A', '#7834d4', '#587ED2', '#4BA626', '#C8824A', '#7834d4', '#587ED2'],
    arr1: [
        {
            user: "",
            message: "",
        },
    ],
    arr2: [
        {
            user: "",
            message: "",
        },
    ],
    youkecss: "none",
    containerRef2,
    containerRef,
    eid: sessionStorage.eid,
    groupname: "",
});