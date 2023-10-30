/**
 * 词法分析
 * 词法分析输出的二元式写入另外一个文本文件中。
 */

import type {tokenValItem} from '@/types';
import {scannerMap, wordMap} from './wordTypeList';

/**
 * 是否是字母
 * @param char
 */
function isLetter(char: string) {
    return /^[a-zA-Z]$/.test(char);
}

/**
 * 是否是数字
 * @param char
 */
function isDigit(char: string) {
    return /^[0-9]$/.test(char);
}

/**
 * 扫描主函数
 * @param line
 * @param tokens
 * @param lineNum
 */
function scanner(line: string, tokens: tokenValItem[], lineNum: number) {
    // 单词缓存区
    let wordCache = '';
    // 数字缓存区
    let numCache = '';
    // 字符串缓存区
    let strCache = '';

    console.log('line:', line);
    let circleCount = 0;
    while (circleCount < line.length) {
        if (isLetter(line[circleCount])) {
            wordCache = line[circleCount];
            // 后序字符
            let selfCircle = circleCount + 1;
            // 判断后序字符是否是字母
            // 如果是的话就拼接在一起
            while (isLetter(line[selfCircle])) {
                wordCache = wordCache + line[selfCircle];
                selfCircle++;
            }
            // 保留字判断
            if (scannerMap.reserveWord.includes(wordCache)) {
                tokens.push({
                    type: wordMap.RESERVE,
                    val: wordCache,
                    lineNum,
                });
            } else {
                tokens.push({
                    type: wordMap.IDENTIFIER,
                    val: wordCache,
                    lineNum,
                });
            }
            circleCount = circleCount + wordCache.length - 1;
            wordCache = '';
            // 拼接后还需要将跳过已经拼接过的字符
        } else if (isDigit(line[circleCount])) {
            // 数字
            numCache = line[circleCount];
            // 后序字符
            let selfCircle = circleCount + 1;
            // 判断后序字符是否是数字
            // 如果是的话就拼接在一起
            while (isDigit(line[selfCircle])) {
                numCache = numCache + line[selfCircle];
                selfCircle++;
            }
            // 拼接后还需要将跳过已经拼接过的字符
            tokens.push({
                type: wordMap.CONSTANT,
                val: numCache,
                lineNum,
            });
            circleCount = circleCount + numCache.length - 1;
            numCache = '';
        } else if (line[circleCount] === ' ') {
            console.log('这是一个空格 跳过');
        } else {
            // 符号

            strCache = line[circleCount];
            // 后序字符
            let selfCircle = circleCount + 1;
            // 判断后序字符是否是字符
            // 如果是的话就拼接在一起
            if (scannerMap.delimiters.includes(strCache)) {
                tokens.push({
                    type: wordMap.DELIMITER,
                    val: strCache,
                    lineNum,
                });
                if (strCache === ';') lineNum++;
            } else if (scannerMap.operator.includes(strCache)) {
                while (scannerMap.operator.includes(line[selfCircle])) {
                    strCache = strCache + line[selfCircle];
                    selfCircle++;
                }
                tokens.push({
                    type: wordMap.OPERATOR,
                    val: strCache,
                    lineNum,
                });
                circleCount = circleCount + strCache.length - 1;
                strCache = '';
            }
        }
        circleCount++;
    }
}

/**
 * 扫描主函数
 * @param line 一行的字符串
 * @param tokens 输出 JSON 文件内容
 * @param tokens 行数
 */
const lexicalAnalysis = (
    line: string,
    tokens: tokenValItem[],
    lineNum: number,
) => {
    scanner(line, tokens, lineNum);
};

export {lexicalAnalysis};
