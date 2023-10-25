// TODO:解决路径的问题，使其能够保证编译后不改变路径也能运行
// TODO：配置路径别名
// TODO：将项目中的模块导入修改一下
// TODO：配置打包
import fs from 'node:fs';
import path from 'node:path';
import 'module-alias/register';
const readline = require('node:readline');

import {
    clearAnnotation,
    addSemi,
    blankElimination,
} from '@/utils/advanceDispose';

const readFile = readline.createInterface({
    // 目标文件
    input: fs.createReadStream(
        path.resolve(__dirname, '../example/sourceRoutine.js'),
    ),
    crlfDelay: Infinity,
});

const writeStream = fs.createWriteStream(
    path.resolve(__dirname, '../example/output.js'),
    {
        encoding: 'utf8', // 不写默认是utf8
        autoClose: true, // 写完是否自动关闭
    },
);

readFile.on('line', (line: string) => {
    // 消除注释
    line = clearAnnotation(line);

    // 清除代码中多余空格
    line = blankElimination(line);

    // 句尾添加分号
    line = addSemi(line);

    writeStream.write(line);
});

readFile.on('close', () => {
    writeStream.end();
    console.log('success');
});
