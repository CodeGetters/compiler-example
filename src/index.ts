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
import {mainParser} from '@/utils/parserCore';

/**
 * -------------
 * 预处理
 * 词法分析
 * -------------
 */
const readFile = readline.createInterface({
    input: fs.createReadStream(
        `${config.dirName}/${config.exampleDir}/${config.sourceRoutine}`,
    ),
    crlfDelay: Infinity,
});

const pretreatWStream = fs.createWriteStream(
    `${config.dirName}/${config.exampleDir}/${config.output}`,
    {
        encoding: 'utf8',
        autoClose: true,
    },
);

let lineNum = 0;

readFile.on('line', (line: string) => {
    // 预处理入口
    line = programPreprocessing(line);

    if (line) {
        lineNum++;
        // 预处理入口
        lexicalAnalysis(line, config.tokenMap.tokens, lineNum);
    }

    pretreatWStream.write(line);
});

readFile.on('close', () => {
    pretreatWStream.end();
    console.log('---预处理阶段已完成---');

    fs.writeFile(
        `${config.dirName}/${config.exampleDir}/${config.lexicalOutput}`,
        JSON.stringify(config.tokenMap),
        (err) => {
            if (err) console.log('---创建外部 JSON 文件失败');
            else console.log('---词法分析阶段已完成---');
            /**
             * -------------
             * 语法分析入口文件
             * -------------
             */

            fs.readFile(
                `${config.dirName}/${config.exampleDir}/${config.output}`,
                'utf-8',
                (err, fileStr) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    mainParser(fileStr);
                    console.log('---语法分析阶段已完成---');
                },
            );
        },
    );
});
