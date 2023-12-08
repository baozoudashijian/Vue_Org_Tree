<template>
  <div class="area_wrapper" ref="treeNodeRef">
    <vue-org-tree
      :tree-node-data="rootData"
      :is-root="true"
    >
      <template v-slot:default="slotProps">
        <div class="parent_wrapper">
          <div class="parent_content" @click="handleNodeClick(slotProps.data)">
            <p class="content_name">{{ slotProps.data.treeNodeData.name }}</p>
          </div>
        </div>
      </template>
    </vue-org-tree>
  </div>
</template>

<script setup>
import VueOrgTree from "./components/vue-org-tree.vue";
import {genTestData} from "./mock.js";
import {onMounted, ref} from "vue";
import {resetTree} from "./components/util.js";

const rootData = ref({
  "id": 0,
  "name": "b2ed130bdd2dc0e1",
  "isOpen": false,
  "children": [
    {
      "id": 1,
      "name": "0127305b8c42256",
      "isOpen": false,
      "children": [
        {
          "id": 2,
          "name": "d370003807d",
          "isOpen": true,
          "children": [
            {
              "id": 3,
              "name": "7e497fe6c324d",
              "isOpen": true,
              "children": [
                {
                  "id": 4,
                  "name": "278e88011f",
                  "isOpen": true
                }
              ]
            },
            {
              "id": 5,
              "name": "704670671e20b927ae6",
              "isOpen": true,
              "children": [
                {
                  "id": 6,
                  "name": "5f14405f2269407743",
                  "isOpen": false
                }
              ]
            }
          ]
        },
        {
          "id": 34,
          "name": "6fc9080b7344549c",
          "isOpen": false,
          "children": [
            {
              "id": 35,
              "name": "522fb034726a20375",
              "isOpen": true,
              "children": [
                {
                  "id": 36,
                  "name": "d476b132dbaeb2",
                  "isOpen": true
                }
              ]
            },
            {
              "id": 37,
              "name": "5449cec58963f791061",
              "isOpen": false
            },
            {
              "id": 41,
              "name": "1b17806174fa9452",
              "isOpen": true,
              "children": [
                {
                  "id": 42,
                  "name": "ed328db1659a9",
                  "isOpen": true
                },
                {
                  "id": 43,
                  "name": "a50324958bc",
                  "isOpen": true
                }
              ]
            }
          ]
        },
        {
          "id": 44,
          "name": "3f768aa245898bf",
          "isOpen": true,
          "children": [
            {
              "id": 45,
              "name": "863e36ea7cfa968e8",
              "isOpen": false,
              "children": [
                {
                  "id": 46,
                  "name": "3e28ab49de6924",
                  "isOpen": false
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 51,
      "name": "4b2a038ed28e",
      "isOpen": true,
      "children": [
        {
          "id": 52,
          "name": "80f6549f945cd87747",
          "isOpen": true
        }
      ]
    },
    {
      "id": 57,
      "name": "70da50a58e0a",
      "isOpen": true
    }
  ]
})
const treeNodeRef = ref(null)

onMounted(() =>{
  resetTree(treeNodeRef.value)
})
const handleNodeClick = (data) => {
  console.log(data)
}

</script>
<style scoped>
.area_wrapper {
  box-sizing: border-box;
  padding: 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
}
.tree_wrapper {
  height: 100%;
  overflow: scroll;
}
.parent_wrapper {
  display: inline-block;
  width: 126px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  background: #fff;
  color: #5e6d82;
  transition: all 0.15s ease;
}
.parent_wrapper:hover {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
.parent_wrapper.active {
  background: #409effFF;
  color: #fff;
}
.parent_content {
  display: flex;
  align-items: flex-start;
}
.content_name {
  flex: 1;
  line-height: 16px;
  overflow: hidden;
  white-space: initial;
  word-break: break-all;
  font-size: 14px;
}


</style>
