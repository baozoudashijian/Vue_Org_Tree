/**
 * 用于生成测试数据
 * @param maxDepth 树状图的最大深度
 * @param maxChildrenLen 节点最多拥有的直接子元素的个数
 * @param depth 当前路径的深度
* */
let id = 0
export function genTestData(maxDepth= 5, maxChildrenLen= 5, depth= 0) {
    const rootNode = {
        id: id++,
        name: genTestName(),
        isOpen: Math.random() > 0.4
    }
    if(depth + 1 === maxDepth) {
        return rootNode
    }
    rootNode.children = Array(Math.round(Math.random() * maxChildrenLen)).fill(0).map(() => {
        return genTestData(maxDepth, maxChildrenLen, depth + 1)
    })
    return rootNode
}
function genTestName() {
    const nameLen = Math.random() * 10 + 10
    let name = ''
    while (name.length < nameLen) {
        name += Math.random().toString(16).slice(2)
    }
    return name.slice(0, nameLen)
}