// let e = "测试环境"
let e = "测试环境22"
let a: string, b: string, c: string

if (e == "测试环境") {
    a = "http://127.0.0.1:9000/public/live/index.html?a="
    b = "http://127.0.0.1:9000"
    c = "ws://localhost:9000/"
} else {
    a = "http://cdn.pccpa.cn:9000/public/live/index.html?a="
    b = "http://cdn.pccpa.cn:9000"
    c = "ws://cdn.pccpa.cn:9000/"
}

export const htmlurl = a
export const baseURL = b
export const robotUrl = b
export const wsUrl = c

