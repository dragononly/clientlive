import { reactive } from "vue";
let containerRef2: any, containerRef: any, temog: any
import device from "current-device";
import Cookies from "js-cookie";
import { myGlobal } from "@/store/app";
// console.log("device.mobile() === %s", device.mobile());
let width: string = "50%", chatmclass = false, xiaoxiwidth = "70%", ifrawidth = "85%", signshowtime: any = 0,
    timeI: any, nowtime: any, lock2: any = "no", timeRecord: any, signed: any, passedtime: any, mobile: boolean = false, looktime: any = "0"
let shrinkOff = true
if (device.mobile()) {
    width = '100%'
    chatmclass = true
    xiaoxiwidth = '100%'
    ifrawidth = '100%'
    mobile = true
} else {
    mobile = false
}
let showzhibolist: any = [], signdata: any
export const live = reactive({
    mobile
})
export const data = reactive({
    looktime,
    branch: "",
    watermark: 158,
    closeOff: '2%',
    shrinkOff,
    shrinkLeft: '-99%',
    shrinkRight: '0%',
    myIsFull: false,
    liveStatusColor: 'red',
    backUrl: '',
    videoOffColor: 'green',
    textsignTitle: "点击下面的“签到”按钮，等你10分钟，别错过了哦。",
    userOffSignTable: false,
    signContinueTime: '60',
    toggleFull: true,
    need: false,
    mobile,
    fulloff: false,
    passedtime,
    signed,
    timeRecord,
    nowtime,
    signshowtime,
    lock2,
    timeI,
    url: "https://live.pccpa.cn:7002/live/movie.m3u8",
    backurl: "https://live.pccpa.cn:7002/live/movie.m3u8",
    temog,
    value: "",
    radiovalue: "1",
    ifrawidth,
    visibleCenter: false,
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
    cssheight: 90,
    cssheight2: 10,
    isactive: true,
    sayColor: ['#f4cc81', '#f4cc81', '#fff', '#fff', '#f4cc81', '#f4cc81', '#fff', '#fff', '#f4cc81', '#f4cc81'],
    saybgcolor: ['#7834d4', '#587ED2', '#4BA626', '#C8824A', '#7834d4', '#587ED2', '#4BA626', '#C8824A', '#7834d4', '#587ED2'],
    arr1: [
        {
            user: "",
            message: "",
            branch: ""
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
    user: sessionStorage.user,
    groupname: "",
});