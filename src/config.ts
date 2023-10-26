import path from 'node:path';

export default {
    // 输出目录
    exampleDir: '../example',
    // 源程序(处理文件)
    sourceRoutine: 'sourceRoutine.js',
    // 预处理输出文件
    output: 'output.js',
    // 词法分析输出文件
    lexicalOutput: 'lexicalOutput.json',

    dirName: path.resolve(__dirname),

    tokenMap: {
        tokens: [],
    },
};
