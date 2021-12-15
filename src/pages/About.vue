<template>
  <div>222</div>
</template>
<script lang="ts">
import { onMounted, reactive } from "vue";
// import XLSX, { WorkSheet } from "xlsx";
export default {
  setup() {
    const state = reactive({ list: [] });
    // let aoa = [
    //   ["姓名", "性别", "年龄"],
    //   ["张三", "男", 32],
    //   ["离世", "女", 132],
    //   ["张杀毒", "男", 34],
    // ];
    // let worksheet: WorkSheet = XLSX.utils.aoa_to_sheet(aoa);
    // let workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "第一页");
    // let aoa2 = [
    //   ["姓名1", "性别", "年龄"],
    //   ["张三1", "男1", 32],
    //   ["离世1", "女1", 132],
    //   ["张杀毒1", "男1", 34],
    // ];
    // let worksheet2: WorkSheet = XLSX.utils.aoa_to_sheet(aoa2);
    // XLSX.utils.book_append_sheet(workbook, worksheet2, "第二页");
    // XLSX.writeFile(workbook, "分析结果.xlsx");

    return { state };
  },
};
</script>

<style scoped>
.common-card {
  margin-bottom: 24px;
  line-height: 24px;
}

.common-title {
  font-size: 15px;
  font-weight: bold;
}

a {
  color: black;
}
</style>
