import { reactive } from "vue";
let containerRef2: any, containerRef: any, temog: any
import device from "current-device";
import Cookies from "js-cookie";
import { myGlobal } from "@/store/app";
// console.log("device.mobile() === %s", device.mobile());
let width: string = "50%", chatmclass = false, xiaoxiwidth = "100%", ifrawidth = "85%", signshowtime: any = 0,
    timeI: any, nowtime: any, lock2: any = "no", timeRecord: any, signed: any, passedtime: any, mobile: boolean = false
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
    closeOff: '20%',
    shrinkOff,
    shrinkLeft: '-99%',
    shrinkRight: '80%',
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
    url: "https://minioserver.moono.vip/sky/uploads/1/cdn/%E5%8D%83%E5%8F%A4%E7%8E%A6%E5%B0%98%20%E7%AC%AC01%E9%9B%86_1080P%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B%E5%B9%B3%E5%8F%B0_%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91.mp4",
    backurl: "https://minioserver.moono.vip/sky/uploads/1/cdn/%E5%8D%83%E5%8F%A4%E7%8E%A6%E5%B0%98%20%E7%AC%AC01%E9%9B%86_1080P%E5%9C%A8%E7%BA%BF%E8%A7%82%E7%9C%8B%E5%B9%B3%E5%8F%B0_%E8%85%BE%E8%AE%AF%E8%A7%86%E9%A2%91.mp4",
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
    cssheight: 70,
    cssheight2: 10,
    isactive: true,
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
    user: sessionStorage.user,
    groupname: "",
});