import { reactive } from "vue";

export const data = reactive({
    valueinput: "",
    liveid: "",
    sevalue: "默认",
    options: [
        {
            value: "jack",
            label: "Jack (100)",
        },
        {
            value: "lucy",
            label: "Lucy (101)",
        },
    ],
});