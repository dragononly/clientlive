import { reactive } from "vue";
let nowmessage = { name: '' };
let question = { a: 0, b: 0, c: 0, d: 0 };
let people = "0";
export const wsdata = reactive({
    nowmessage,
    off: "0",
    question,
    askshow: false,
    signdata: 0,
    messagestatus: 0,
    people
});
//# sourceMappingURL=wsdata.js.map