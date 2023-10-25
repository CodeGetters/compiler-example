// TODO:解决路径的问题，使其能够保证编译后不改变路径也能运行
// TODO：配置打包
import {
    clearAnnotation,
    addSemi,
    blankElimination,
} from '@/utils/advanceDispose';
import fs from 'node:fs';
import path from 'node:path';
import config from '@/config';
import 'module-alias/register';
import readline from 'node:readline';

// 创建  readline.Interface 实例
// 开始逐行监听
const readFile = readline.createInterface({
    // 目标文件
    input: fs.createReadStream(
        path.resolve(__dirname, `${config.exampleDir}/${config.sourceRoutine}`),
    ),
    crlfDelay: Infinity,
});

// 创建写入流
const writeStream = fs.createWriteStream(
    path.resolve(__dirname, `${config.exampleDir}/${config.output}`),
    {
        encoding: 'utf8', // 不写默认是utf8
        autoClose: true, // 写完是否自动关闭
    },
);

// 逐行修改
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
