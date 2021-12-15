import { reactive } from "vue";
let nowmessage: any = { name: '' }
let question: any = { a: 0, b: 0, c: 0, d: 0 }
export const wsdata = reactive({
    nowmessage,
    off: "0",
    question,
    askshow: false,
    signdata: 0,
    messagestatus: 0
});

