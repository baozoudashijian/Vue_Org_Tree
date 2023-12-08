<template>
  <div :class="treeNodeClassName">
    <div :class="treeParentClassName">
      <div class="stretch_node_r" v-if="!isRoot">
        <p class="line_r"></p>
      </div>
      <div class="node_content">
        <slot v-bind:data="{ treeNodeData, $treeNodeRefs: $refs }"></slot>
      </div>
    </div>

    <div :class="stretchNodeClassName"  v-if="childrenLen">
      <p class="line_l"></p>
      <p :class="['line_dot', treeNodeData.isOpen ? 'cut_dot' : 'add_dot']"></p>
    </div>

    <div
      :class="treeChildrenClassName"
      v-if="childrenLen"
    >
      <p :class="connectLineClassName" v-if="childrenLen > 1"></p>
      <vue-org-tree
        v-for="item in treeNodeData.children"
        :key="item.id"
        :tree-node-data="item"
        :is-root="false"
      >
        <template v-slot:default="slotProps">
          <slot v-bind:data="slotProps.data"></slot>
        </template>
      </vue-org-tree>
    </div>
  </div>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue'
import {stretchNodeClassName, treeChildrenClassName, treeNodeClassName, treeParentClassName, connectLineClassName} from "./const.js";
import {resetTree} from "./util.js";

const props = defineProps(['treeNodeData', 'isRoot'])

const childrenLen = computed(() => {
  return (props.treeNodeData.children || []).length
})

</script>
<style scoped>
.tree_node {
  position: relative;
  margin-bottom: 16px;
  /*font-size: 0;*/
  white-space: nowrap;
}
.tree_node:last-child {
  margin-bottom: 0;
}
.tree_node .tree_parent {
  position: relative;
  vertical-align: top;
  display: inline-block;
}
.tree_node .stretch_node_r {
  display: inline-block;
  width: 26px;
}
.tree_node .stretch_node_r .line_r {
  position: absolute;
  left: -10px;
  top: 50%;
  width: 36px;
}
.tree_node .node_content {
  display: inline-block;
}
.tree_node .stretch_node {
  position: relative;
  display: inline-block;
  z-index: 10;
}
.tree_node .stretch_node p {
  display: inline-block;
  vertical-align: middle;
}
.tree_node .stretch_node .line_dot {
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  background-size: contain;
  background-position: 50%;
  background-repeat: no-repeat;
  transition: all 0.15s;
}
.tree_node .stretch_node .line_dot.add_dot {
  background-image: url('./assets/add-round.png');
}
.tree_node .stretch_node .line_dot.cut_dot {
  background-image: url('./assets/cut-round.png');
}
.tree_node .line_l, .tree_node .line_r {
  display: inline-block;
  vertical-align: middle;
  margin: 0;
  width: 26px;
  height: 1px;
  background-color: #e0e0e0;
}
.tree_node .tree_children {
  position: relative;
  display: inline-block;
  vertical-align: top;
}
.tree_node .tree_children .connect_line {
  position: absolute;
  left: -10px;
  top: 0;
  height: 100%;
  width: 1px;
  margin: 0;
  background-color: #e0e0e0;
  z-index: 6;
}
</style>
