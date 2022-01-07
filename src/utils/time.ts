import localforage from "localforage"
let time: any = new Date();

var todaytime = parseInt(
    (Date.parse(time) / 1000 / 60 / 60).toString()
);

//登陆的时候设置时间
export const settime = (eid: any, user: any) => {
    localforage.setItem("timeout", todaytime)
    localforage.setItem("eid", eid)
    localforage.setItem("user", user)
}
let meid = async () => await localforage.getItem("eid")
let muser = async () => await localforage.getItem("user")

export const eid = meid
export const user = muser

//验证时间是否过期
let misouttime = async () => await localforage
    .getItem("timeout")
    .then(function (value) {
        //   console.log(value)
        //上次设置的时间+30 如果小于今天的时间，那么过期
        if ((Number(value) + 1) < todaytime) {
            return false
        } else {
            return true
        }
    })
export const isouttime = misouttime

