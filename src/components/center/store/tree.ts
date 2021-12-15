import { reactive } from "vue";
let expandedKeys: any, selectedKeys: any, treeData: any = [], checkedKeys: any
export const tree = reactive({
    expandedKeys,
    selectedKeys,
    treeData,
    branch: "",
    department: "",
    departmentchild: "",
    nowbranch: "",
    checkedKeys,
    inputvalue: "",
    status: "processing",
    statusname: "",
    off: true
});

