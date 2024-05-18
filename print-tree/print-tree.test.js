const { printTree } = require('./print-tree');

describe('printTree', () => {
    test('should correctly print a simple tree', () => {
        const tree = [
            {
                name: 1,
                items: [
                    {
                        name: 2,
                        items: [
                            { name: 3 },
                            { name: 4 },
                        ],
                    },
                    {
                        name: 5,
                        items: [
                            { name: 6 },
                            { name: 7 },
                        ],
                    },
                    {
                        name: 8,
                        items: [
                            { name: 9 },
                        ],
                    },
                ],
            },
        ];
        const expectedOutput =
            '└ 1\n' +
            '  ├ 2\n' +
            '  | ├ 3\n' +
            '  | └ 4\n' +
            '  ├ 5\n' +
            '  | ├ 6\n' +
            '  | └ 7\n' +
            '  └ 8\n' +
            '    └ 9\n';

        const result = printTree(tree);
        expect(result).toBe(expectedOutput);
    });

    test('should correctly print a tree with one node', () => {
        const tree = [
            { name: 1 }
        ]
        const expectedOutput = '└ 1\n';

        const result = printTree(tree);
        expect(result).toBe(expectedOutput);

    });

    test('should handle an empty tree', () => {
        const tree = [];
        const expectedOutput = '';

        const result = printTree(tree);
        expect(result).toBe(expectedOutput);
    });
})