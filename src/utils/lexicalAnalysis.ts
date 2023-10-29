/**
 * 词法分析
 * 词法分析输出的二元式写入另外一个文本文件中。
 */

import type {tokenValItem} from '@/types';
import {scannerMap, wordMap} from './wordTypeList';

/**
 * 是否是字母
 * @param str
 */
function isSingleLetter(str: string) {
    return /^[a-zA-Z]$/.test(str);
}

/**
 * 是否是数字
 * @param str
 */
function isNum(str: string) {
    return /^[0-9]$/.test(str);
}

/**
 * 判断当前字母类型
 * @param letter 需要判断的字母
 */
function letterType(letter: string): string {
    if (isSingleLetter(letter)) {
        return 'letter';
    } else if (isNum(letter)) {
        return 'number';
    }
    return 'symbol';
}

/**
 * 判断字母缓存区中的字母组合是否能被关键、标识符字匹配，否则将放入标识符中
 * @param wordCache 字母缓存区
 * @param tokens 输出 JSON 文件内容
 * @param lineNum 行数
 */
function letterMatch(
    wordCache: string,
    tokens: tokenValItem[],
    lineNum: number,
) {
    if (scannerMap.keyword.includes(wordCache)) {
        tokens.push({
            type: wordMap.KEYWORD,
            val: wordCache,
            lineNum,
        });
    } else if (scannerMap.identifiers.includes(wordCache)) {
        tokens.push({
            type: wordMap.IDENTIFIER,
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
    wordCache = '';
}

/**
 * 判断当前符号是否被操作符或者分隔符匹配
 * @param str 当前字母
 * @param tokens 输出 JSON 文件内容
 * @param lineNum 行数
 */
function symbolMatch(str: string, tokens: tokenValItem[], lineNum: number) {
    if (/^[_$]$/.test(str)) {
        // TODO it could be a variable
        console.log('it could be a variable');
    } else if (scannerMap.delimiters.includes(str)) {
        tokens.push({
            type: wordMap.DELIMITER,
            val: str,
            lineNum,
        });
    } else if (scannerMap.operator.includes(str)) {
        tokens.push({
            type: wordMap.OPERATOR,
            val: str,
            lineNum,
        });
    }
}

/**
 * 操作主函数
 * @param line 一行的字符串
 * @param tokens 输出 JSON 文件内容
 * @param tokens 行数
 */
const lexicalAnalysis = (
    line: string,
    tokens: tokenValItem[],
    lineNum: number,
) => {
    // 单词缓存区
    let wordCache = '';

    // 数字缓存区
    let numCache = '';

    // 字符串缓存区
    let strCache = '';
    console.log(line);

    // TODO：有些字符会重复多次
    // TODO：置空没有作用
    // TODO：重构计划 --- 先判断是否是单行的函数执行,前提是该行字符串有空格,切割(空格)，
    // 然后进行再对切割后的数组第二个元素进行遍历操作
    // 这样就将关键字提取出来了
    //
    for (let i = 0; i < line.length; i++) {
        // 空格直接跳过
        if (line[i] === ' ') {
            // 字符串缓存区操作
            if (wordCache.length) {
                letterMatch(wordCache, tokens, lineNum);
                // TODO:这里不知道为什么没有置空
                wordCache = '';
            }
            continue;
        } else {
            // 判断是否是 ' 开头
            // 是的话后面所有的内容都属于字符串(直到再次遇到同样的才算结束)
            if (line[i] === "'" || line[i] === '"') {
                strCache = strCache + line[i];
            } else {
                // 判断当前字符属于字母、数字、符号
                const currentType = letterType(line[i]);
                if (currentType !== 'letter') {
                    // 字符串缓存区操作
                    if (wordCache.length) {
                        letterMatch(wordCache, tokens, lineNum);
                    }

                    if (currentType === 'number') {
                        numCache = numCache + line[i];
                        // 符号操作
                    } else if (currentType === 'symbol') {
                        symbolMatch(line[i], tokens, lineNum);
                    }
                } else {
                    // 当前字母是字母
                    if (numCache.length) {
                        tokens.push({
                            type: wordMap.IDENTIFIER,
                            val: numCache,
                            lineNum,
                        });
                        numCache = '';
                    }
                    wordCache = wordCache + line[i];
                }
            }
        }
    }
};

export {lexicalAnalysis};
