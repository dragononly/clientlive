// let e = "测试环境"
let e = "测试环境"
let a: string, b: string, c: string, d: string
import device from "current-device";
if (e == "测试环境22") {
    a = "http://cdn.pccpa.cn/live/?a="
    b = "http://127.0.0.1:9001"
    c = "http://localhost:9001"
    d = "https://zxy1.pccpa.cn/api/v1/tj-adapter/front/callback"
} else {
    a = "https://cdn.pccpa.cn/live/?a="
    b = "https://cdn.pccpa.cn:9000"
    c = "https://ws.pccpa.cn"
    d = "https://zxy1.pccpa.cn/api/v1/tj-adapter/front/callback"
}
if (device.ios()) {
    a = "https://cdn.pccpa.cn/liveiphone/?a="
}
// if (device.android()) {
//     a = "https://cdn.pccpa.cn/liveiphone/?a="
// }


export const htmlurl = a
export const baseURL = b
export const robotUrl = b
export const wsUrl = c
export const zhixueyun = d
