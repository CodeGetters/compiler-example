/**
 * 从外部文件中逐行读取文件内容
 * 并对每一行进行处理
 * 调用处理程序
 */

import 'module-alias/register';
import fs from 'node:fs';
import config from '@/config';
import readline from 'node:readline';
import {programPreprocessing} from '@/utils/advanceDispose';
import {lexicalAnalysis} from '@/utils/lexicalAnalysis';

// 开始逐行监听
const readFile = readline.createInterface({
    // 目标文件
    input: fs.createReadStream(
        `${config.dirName}/${config.exampleDir}/${config.sourceRoutine}`,
    ),
    crlfDelay: Infinity,
});

// 预处理写入流
const pretreatWStream = fs.createWriteStream(
    `${config.dirName}/${config.exampleDir}/${config.output}`,
    {
        encoding: 'utf8',
        autoClose: true,
    },
);

readFile.on('line', (line: string) => {
    // 预处理
    line = programPreprocessing(line);

    // 词法分析
    if (line) {
        lexicalAnalysis(line, config.tokenMap.tokens);
    }

    // 预处理写入流
    pretreatWStream.write(line);
});

readFile.on('close', () => {
    pretreatWStream.end();
    console.log('---预处理阶段已完成---');

    fs.writeFile(
        `${config.dirName}/${config.exampleDir}/${config.lexicalOutput}`,
        JSON.stringify(config.tokenMap),
        (err) => {
            if (err) console.log('---创建外部JSON文件失败');
            else console.log('---词法分析阶段已完成---');
        },
    );
});
