const { log } = console;
const { tree } = require('./tree');

const printTree = (node, prefix = '') => {
    let result = '';
    if (Array.isArray(node) && node.length > 0) {
        node.forEach(({ name, items }, index) => {
            const lastNode = index == node.length - 1;
            result += prefix + (lastNode ? '└' : '├') + ' ' + name + '\n';
            if (items) {
                result += printTree(items, prefix + (lastNode ? ' ' : '|') + ' ');
            }
        });
    }
    return result;
};


log(printTree(tree));

module.exports = { printTree };