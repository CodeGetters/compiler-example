/**
 * 词法分析
 * 词法分析输出的二元式写入另外一个文本文件中。
 */

import type {tokenValItem} from '@/types';
import {scannerMap, wordMap} from './wordTypeList';
/**
 * 扫描关键字
 * @param line
 */
function scannerKeyword(lineArr: string[], tokens: tokenValItem[]) {
    // 匹配关键字
    lineArr.map((item) => {
        if (scannerMap.keyword.includes(item)) {
            tokens.push({type: wordMap.keyword, val: item});
        }
    });
}

/**
 * 扫描运算符
 * @param line
 */
function scannerOperator(lineArr: string[], tokens: tokenValItem[]) {
    // 匹配运算符
    lineArr.map((item) => {
        if (scannerMap.operator.includes(item)) {
            tokens.push({type: wordMap.operator, val: item});
        }
    });
}

/**
 * 扫描常数
 * @param line
 */
function scannerConst(lineArr: string[], tokens: tokenValItem[]) {
    const numReg = /\d+/g;
    lineArr.map((item) => {
        if (numReg.test(item)) {
            tokens.push({type: wordMap.constant, val: item});
        }
    });
}

const lexicalAnalysis = (line: string, tokens: tokenValItem[]) => {
    const lineArr = line.split(' ');

    scannerKeyword(lineArr, tokens);
    scannerOperator(lineArr, tokens);
    scannerConst(lineArr, tokens);
};

export {lexicalAnalysis};
