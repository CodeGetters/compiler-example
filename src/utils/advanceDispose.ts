/**
 * 消除多行注释、单行注释、代码后的注释
 * @param {*} line string
 */
function clearAnnotation(line: string) {
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
function addSemi(line: string) {
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
function blankElimination(line: string) {
    // 消除 = 前后的空格
    line = line.replace(/\s*=\s*/g, '=');

    // 消除 => 前后的空格
    line = line.replace(/\s*=>\s*/g, '=>');

    // 消除 ' 左右的空格
    line = line.replace(/\s*\'\s*/g, "'").replace(/\s*\'\s*/g, "'");

    // 消除 () 前后的空格
    line = line.replace(/\s*\(\s*/g, '(').replace(/\s*\)\s*/g, ')');

    // 消除 {} 前后的空格
    line = line.replace(/\s*\{\s*/g, '{').replace(/\s*\}\s*/g, '}');

    // 消除遗留的换行符回车符以及出现空格开头的内容
    line = line.replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, '');

    return line;
}

export {clearAnnotation, addSemi, blankElimination};
