<template>
  <!-- data-opened， 0(opened) 表示没被展开过，1(noOpened) 代表已经被展开过了（或者没有子元素所以没有展开不展开的概念，直接认为是1） -->
  <div :class="treeNodeClassName" ref="treeNodeRef" :data-opened="dataOpened.noOpened">
    <div :class="treeParentClassName">
      <div class="stretch_node_r" v-if="!isRoot">
        <p class="line_r"></p>
      </div>
      <div class="node_content">
        <slot v-bind:data="{ treeNodeData, $treeNodeRefs: $refs }"></slot>
      </div>
    </div>
    <!-- 控制展开/收缩的节点 -->
    <div :class="stretchNodeClassName" v-if="childrenLen">
      <p class="line_l"></p>
      <p :class="['line_dot', treeNodeData.isOpen ? 'cut_dot' : 'add_dot']" @click="changeOpen"></p>
    </div>
    <div
        :class="treeChildrenClassName"
        v-if="childrenLen && openedChildren"
        v-show="treeNodeData.isOpen"
    >
      <p :class="connectLineClassName" v-if="childrenLen > 1"></p>
      <vue-chart-tree
          v-for="item in treeNodeData.children"
          :key="item.id"
          :treeNodeData="item"
          :isRoot="false"
      >
        <template v-slot:default="slotProps">
          <slot v-bind:data="slotProps.data"></slot>
        </template>
      </vue-chart-tree>
    </div>
  </div>
</template>
<script setup lang="ts">
import {computed, onMounted, ref, watchEffect} from "vue";
import {
  dataOpened,
  treeParentClassName, treeChildrenClassName, treeNodeClassName, stretchNodeClassName, connectLineClassName
  // @ts-ignore
} from './const.js'
// @ts-ignore
import { resetTree, updatePartTree, isOpened } from './util.js'

const treeNodeRef = ref<any>(null)
const props = defineProps({
  // 当前节点是否是根节点
  isRoot: {
    type: Boolean,
    required: false,
    default: true
  },
  // 当前节点的数据信息
  treeNodeData: {
    type: Object,
    required: true
  }
})

const childrenLen = computed(() => {
  return (props.treeNodeData.children || []).length
})
const openedChildren = computed(() => {
  return props.treeNodeData.isOpen || (treeNodeRef.value && isOpened(treeNodeRef.value))
})
const changeOpen = (item: any) => {
  // item.isOpen = !item.isOpen
  props.treeNodeData.isOpen = !props.treeNodeData.isOpen
  // updatePartTree(treeNodeRef.value)
}
watchEffect(() => {
  if(props.treeNodeData) {
    updatePartTree(treeNodeRef.value)
  }
})
onMounted(() => {
  if (props.isRoot) {
    // resetTree(treeNodeRef.value)
  }
})

</script>
<style lang="scss" scoped>
.tree_node {
  width: 0;
  position: relative;
  margin-bottom: 16px;
  font-size: 0;
  white-space: nowrap;
  &:last-child {
    margin-bottom: 0;
  }
  .tree_parent {
    position: relative;
    vertical-align: top;
    display: inline-block;
  }
  .stretch_node_r {
    display: inline-block;
    width: 26px;
    .line_r {
      position: absolute;
      left: -10px;
      top: 50%;
      width: 36px;
    }
  }
  .node_content {
    display: inline-block;
  }
  .stretch_node {
    position: relative;
    display: inline-block;
    z-index: 10;
    p {
      display: inline-block;
      vertical-align: middle;
    }
    .line_dot {
      width: 20px;
      height: 20px;
      cursor: pointer;
      user-select: none;
      border-radius: 50%;
      background-size: contain;
      background-position: 50%;
      background-repeat: no-repeat;
      transition: all 0.15s;
      &.add_dot {
        background-image: url('./assets/add-round.png');
      }
      &.cut_dot {
        background-image: url('./assets/cut-round.png');
      }
    }
  }
  .tree_children {
    position: relative;
    display: inline-block;
    vertical-align: top;
    .connect_line {
      position: absolute;
      left: -10px;
      top: 0;
      height: 100%;
      width: 1px;
      background-color: #e0e0e0;
      z-index: 6;
    }
  }
}
.tree_node .line_l,
.tree_node .line_r {
  display: inline-block;
  vertical-align: middle;
  width: 26px;
  height: 1px;
  background-color: #e0e0e0;
}
</style>