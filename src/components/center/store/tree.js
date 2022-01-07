import { reactive } from "vue";
let expandedKeys, selectedKeys, treeData = [], checkedKeys;
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
//# sourceMappingURL=tree.js.map