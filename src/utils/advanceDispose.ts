/**
 * 文件预处理
 * 去掉源程序中的空格，跳格，回车，换行，注释等
 */

/**
 * 消除多行注释、单行注释、代码后的注释
 * @param {*} line string
 */
function clearAnnotation(line: string): string {
    // 单行注释
    const commentReg = /\/\//;
    // 多行注释
    const initialMulti = line.startsWith('/*');

    if (initialMulti) {
        line = '';
    } else {
        const isMulti = commentReg.test(line);

        if (line.indexOf('*') === 1) {
            line = '';
        } else if (isMulti) {
            // 单行注释
            line.indexOf('//') === 0
                ? (line = '')
                : (line = line.split('//')[0]);
        }
    }
    return line;
}

/**
 * 给没有分号的句尾添加句尾
 * } 结尾的不加分号
 * @param {*} line string
 */
function addSemi(line: string): string {
    const letterEnd = line.charAt(line.length - 1);

    // 句尾为 '}' 的情况
    let braceEnd = letterEnd !== '{';
    // 句尾为 ',' 的情况
    let commaEnd = letterEnd !== ',';
    // 句尾为 '(' 的情况
    let bracketEnd = letterEnd !== '(';

    // const letterStart = line.charAt(0);

    if (
        line.length &&
        braceEnd &&
        commaEnd &&
        bracketEnd &&
        line.slice(-1) !== ';'
    ) {
        line = line + ';';
    }
    // 判断这一行有没有内容
    return line;
}

/**
 * 消除代码中多余的空格
 * @param {*} line string
 */
function blankElimination(line: string): string {
    // 消除 + - * / = => ' 前后的空格
    line = line.replace(/\s*([+\-*/='=>])\s*/g, '$1');

    // 消除 () 前后的空格
    line = line.replace(/\s*\(\s*/g, '(').replace(/\s*\)\s*/g, ')');

    // 消除 {} 前后的空格
    line = line.replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}');

    // 消除遗留的换行符回车符以及出现空格开头的内容
    line = line.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');

    return line;
}

/**
 * 预处理主入口程序
 * @param line string
 */
const programPreprocessing = (line: string): string => {
    // 消除注释
    line = clearAnnotation(line);

    // 清除代码中多余空格
    line = blankElimination(line);

    // 句尾添加分号
    line = addSemi(line);

    return line;
};

export {programPreprocessing};
