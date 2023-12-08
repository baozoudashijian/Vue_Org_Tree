import {nextTick} from "vue";
import {
    connectLineClassName,
    dataOpened,
    treeChildrenClassName,
    treeNodeClassName,
    treeParentClassName
} from "./const.js";

/**
 * 初始化树状图
 * @param {HTMLElement} rootTreeNode 树状图的根 treeNode 节点
 * */
export function resetTree(rootTreeNode) {
    nextTick().then(() => {
        _resetTree(rootTreeNode)
    })
}
/**
 * 初始化树状图
 * @param {HTMLElement} rootTreeNode 树状图的根 treeNode 节点
 * */
function _resetTree(rootTreeNode) {
    const allLevelParentElements = getAllLevelParentElements(rootTreeNode)
    allLevelParentElements.forEach(item => {
        if(item.length > 1) {
            computedParentElementsPosition(item)
        }
    })
    allLevelParentElements.forEach(item => {
        item.forEach((v, index) => {
            if(index !== item.length - 1 || v.nextElementSibling) {
                computedShrinkPosition(v)
                resetChildrenLine(v)
            }
        })
    })
}
/**
 * 获取 treeNode 下所有的第一次被展开 .treeParentClassName 元素
 * 每一层的 .treeParentClassName 元素合成一个数组，所有层的数组再合成一个数组
 * @param {HTMLElement} treeNode treeNode 节点
 * @returns {HTMLElement[][]}
 * */
function getAllLevelParentElements(treeNode) {
    const parentElements = []
    let currentLevelParentElements = [] // 当前层级的.tree_parent, 属于一个中间变量，因为当while满足某个条件会清空该数组
    let currentTreeNode
    let cacheCurrentTreeNode
    let currentChildrenElement // 当前层级的.tree_children
    let nextLevelTreeNodes = [treeNode]
    while(currentTreeNode = nextLevelTreeNodes.pop()) {
        while(currentTreeNode && !isOpened(currentTreeNode)) {
            cacheCurrentTreeNode = currentTreeNode
            currentLevelParentElements.push(getElementByClassName(currentTreeNode, treeParentClassName))
            currentChildrenElement = getElementByClassName(currentTreeNode, treeChildrenClassName)
            currentTreeNode = getLowTreeNode(currentTreeNode)
            if(currentChildrenElement && currentChildrenElement.style.display !== "none") {
                nextLevelTreeNodes = nextLevelTreeNodes.concat(getSiblings(currentTreeNode).slice(2))
            }else{
                break
            }
        }
        parentElements.push(currentLevelParentElements)
        currentLevelParentElements = []
    }
    return parentElements
}
/**
 * 对齐同一水平线的 treeParentClassName 元素
 * @param {HTMLElement[]} 位于同一层需要居中对齐
 * */
function computedParentElementsPosition(parentElements) {
    const heights = parentElements.map(ele => ele.offsetHeight)
    const maxHeight = Math.max.apply(null, heights)
    const halfMaxHeight = maxHeight / 2
    parentElements.forEach((element, index) => {
        if(heights[index] < maxHeight) {
            element.style.marginTop = halfMaxHeight - heights[index] / 2 + 'px'
        }else{
            element.style.marginTop = 0
        }
    })
}
/**
 * 计算伸缩节点的位置
 * @param {HTMLElement}
 * */
function computedShrinkPosition(parentElement) {
    const stretchNodeElement = parentElement.nextElementSibling
    if(stretchNodeElement) {
        stretchNodeElement.style.transform = `translateY(${parentElement.offsetTop + parentElement.offsetHeight / 2 - stretchNodeElement.offsetHeight / 2}px)`
    }
}
export function resetChildrenLine(parentElement) {
    const childrenElement = parentElement.nextElementSibling.nextElementSibling
    const treeNodeElement = getElementByClassName(childrenElement, treeNodeClassName)
    const treeNodes = getSiblings(treeNodeElement)
    if(treeNodes.length <= 1) return
    computedConnectLine(treeNodeElement, treeNodes[treeNodes.length - 1], getElementByClassName(childrenElement, connectLineClassName))
}
function computedConnectLine(firstTreeNodeElement, lastTreeNodeElement, connectLineElement) {
    const firstNodeElement = getElementByClassName(firstTreeNodeElement, treeParentClassName)
    const lastNodeElement = getElementByClassName(lastTreeNodeElement, treeParentClassName)
    const firstNodeElementRect = firstNodeElement.getBoundingClientRect()
    const lastNodeElementRect = lastNodeElement.getBoundingClientRect()
    connectLineElement.style.transform = `translateY(${firstNodeElementRect.height / 2 + firstNodeElement.offsetTop}px)`
    connectLineElement.style.height = lastNodeElementRect.bottom - firstNodeElementRect.top - firstNodeElementRect.height / 2 - lastNodeElementRect.height / 2 + 'px'
}
export function isOpened(treeNode) {
    return treeNode.getAttribute('data-' + dataOpened.key) === dataOpened.opened
}
/**
* 获取rootElement下的第一个className元素
 * @param rootElement rootElement节点元素
 * @param {string[]} classNames 类名
 * @returns {HTMLElement | null}
* */
function getElementByClassName(rootElement, ...classNames) {
    let element = rootElement // 根元素会在for循环中被覆盖
    for(let i=0; i<classNames.length; i++) {
        if(!element) return null
        element = element.querySelector('.' + classNames[i])
    }
    return element
}
/**
 * 根据当前treeNode元素，查找第一个子treeNode，并且display不能是none
 * @param {HTMLElement} treeNode
 * */
function getLowTreeNode(treeNode) {
    const lowChildren = getElementByClassName(treeNode, treeChildrenClassName)
    if(lowChildren && lowChildren.style.display !== 'none') {
        return getElementByClassName(lowChildren, treeNodeClassName)
    }
    return null
}
/**
* 获取所有兄弟节点
* @param {HTMLElement | null} element节点元素
* @returns {HTMLElement[]}
* */
function getSiblings(element) {
    if(!element) return []
    const elements = []
    let rootElement = element
    // 先移动到第一个节点
    while (rootElement.previousElementSibling) {
        rootElement = rootElement.previousElementSibling
    }
    // 然后从第一个往下面一个一个push进去，以此获取所有兄弟节点
    while (rootElement) {
        elements.push(rootElement)
        rootElement = rootElement.nextElementSibling
    }
    return elements
}