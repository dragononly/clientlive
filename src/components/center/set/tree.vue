<template>
  <a-row>
    <a-col :md="24" :xs="24">
      <div style="background: #fff; height: 390px; overflow-y: scroll">
        <a-tree
          checkable
          :load-data="onLoadData"
          :tree-data="treeData"
          @check="check"
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          v-model:checkedKeys="checkedKeys"
        />
      </div>
    </a-col>
  </a-row>

  <div>
    <a-row>
      <a-col :md="4" :xs="8">
        <a-button @click="save()" block type="primary">保存到</a-button>
      </a-col>
      <a-col :md="20" :xs="16">
        <a-input v-model:value="inputvalue" placeholder="新用户组名称" />
      </a-col>
    </a-row>
    <div>
      <a-badge :status="status" />
      {{ statusname }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { Mpost } from '../../../../config/http/index';
import { tree } from '../store/tree';
import { message } from 'ant-design-vue';
export default defineComponent({
  data() {
    return { ...toRefs(tree) };
  },
  async setup(props: any, context: any) {
    //加载..........................................................................................................//
    //1查询分所

    {
      if (tree.off) {
        let url = '/live/branch';
        let take_branch = await Mpost(url, '');
        for (let i = 0; i < take_branch.data.data.length; i++) {
          let obj = {
            title: take_branch.data.data[i],
            key: i,
          };
          tree.treeData.push(obj);
        }
        tree.off = false;
      }
    }

    //2勾选分组的时候加载子目录
    const onLoadData = async (treeNode: any) => {
      return new Promise(async (resolve: (value?: unknown) => void) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        //1通过-符号去判断层级
        if (treeNode.dataRef.key.toString().indexOf('-') == -1) {
          const take_department = async (branch: string) => {
            let mydata = { branch: branch };
            let url = '/live/department';
            let cab = await Mpost(url, mydata);
            return cab.data.data;
          };
          let a = await take_department(treeNode.dataRef.title);
          //1.1通过分所去查询其所在的部门
          //这是分所级目录
          treeNode.dataRef.children = [];
          for (let i = 0; i < a.length; i++) {
            let obj = {
              title: a[i],
              key: `${treeNode.eventKey}-${i}`,
            };
            treeNode.dataRef.children.push(obj);
          }
        } else {
          let long = treeNode.dataRef.key.split('-').length;
          if (long == '2') {
            //这是部门级目录
            const take_departmentchild = async (department: string) => {
              let mydata = { department: department };
              let url = '/live/departmentchild';
              let cab = await Mpost(url, mydata);
              return cab.data.data;
            };
            let a = await take_departmentchild(treeNode.dataRef.title);
            treeNode.dataRef.children = [];
            for (let i = 0; i < a.length; i++) {
              let obj = {
                title: a[i],
                key: `${treeNode.eventKey}-${i}`,
              };
              treeNode.dataRef.children.push(obj);
            }
          } else {
            //这是子部门目录
            const take_departmentchildname = async (
              departmentchild: string,
            ) => {
              let mydata = { departmentchild: departmentchild };
              let url = '/live/departmentchildname';
              let cab = await Mpost(url, mydata);
              return cab.data.data;
            };
            let a = await take_departmentchildname(treeNode.dataRef.title);
            treeNode.dataRef.children = [];
            for (let i = 0; i < a.length; i++) {
              let obj = {
                title: a[i].name,
                key: `${treeNode.eventKey}-${i}`,
                isLeaf: true,
              };
              treeNode.dataRef.children.push(obj);
            }
          }
        }
        tree.treeData.value = [...tree.treeData];
        resolve();
      });
    };

    //存入...................................................................................
    //勾选逻辑

    let branch: any = [],
      department: any = [],
      departmentchild: any = [],
      name: any = [];
    async function check(a: any, b: any) {
      (branch = []), (department = []), (departmentchild = []), (name = []);
      for (const i of b.checkedNodes) {
        let needi = i.props;
        //1先分组
        if (needi.key.toString().indexOf('-') == -1) {
          //分所目录
          branch.push(needi.title);
        } else {
          let long = needi.key.split('-').length;
          if (long == 2) {
            //部门目录
            department.push(needi.title);
          } else if (long == 3) {
            //子部门目录
            departmentchild.push(needi.title);
          } else {
            //人名目录
            name.push(needi.title);
          }
        }
      }
    }
    //点击保存函数
    const save = async () => {
      //判断是否为空
      if (!tree.inputvalue) {
        message.error('组名不能为空哦');
        return;
      }
      let mydata = {
        groupname: tree.inputvalue,
        branch: branch,
        department: department,
        departmentchild: departmentchild,
        name: name,
      };
      let cab = await Mpost('/live/savegroup2', mydata);
      if (cab.data.message == 'ok') {
        message.success('保存成功');
      }
    };
    return {
      save,
      onLoadData,
      check,
    };
    /////setup结束线
  },
});
</script>
