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
    // 文件根目录
    dirName: path.resolve(__dirname),
    // 二元组
    tokenMap: {
        tokens: [],
    },
    // 语法处理输出文件
    parseOutput: 'parseOutput.txt',
    // 语法分析结果
    ParsingRes: '',
};
