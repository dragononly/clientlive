import { reactive } from "vue";
let containerRef2: any, containerRef: any, temog: any
import device from "current-device";
// console.log("device.mobile() === %s", device.mobile());
let width: string = "50%", chatmclass = false, xiaoxiwidth = "80%", ifrawidth = "80%"
if (device.mobile()) {
    width = '100%'
    chatmclass = true
    xiaoxiwidth = '100%'
    ifrawidth = '100%'
}
let showzhibolist: any = [], signdata: any
export const data = reactive({
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
    need: false,
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