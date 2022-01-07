// let e = "测试环境"
let e = "测试环境222"
let a: string, b: string, c: string

if (e == "测试环境") {
    a = "http://127.0.0.1:9000/public/live/index.html?a="
    b = "http://127.0.0.1:9000"
    c = "http://localhost:9000"
} else {
    a = "http://cdn.pccpa.cn/live/?a="
    b = "http://cdn.pccpa.cn:9000"
    c = "http://ws.pccpa.cn:9000"
}

export const htmlurl = a
export const baseURL = b
export const robotUrl = b
export const wsUrl = c

