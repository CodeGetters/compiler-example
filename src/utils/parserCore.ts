let POINT_INDEX = 0;

/**
 * `/d/`  匹配任何数字字符
 * `/\s/` 匹配任何空白字符(空格、换行符、制表符)
 */

/**
 * 指向下一个字符
 */
function getNextToken(fileStr: string): string {
    // 跳过空格和换行符
    while (POINT_INDEX < fileStr.length && /\s/.test(fileStr[POINT_INDEX])) {
        POINT_INDEX++;
    }

    // 检查是否已达到输入字符串的末尾
    if (POINT_INDEX >= fileStr.length) {
        return 'ending';
    }

    // 获取下一个符号
    let token = '';

    // 如果下一个字符是字母，则读取一个标识符或关键字
    if (/[a-zA-Z]/.test(fileStr[POINT_INDEX])) {
        while (/[a-zA-Z]/.test(fileStr[POINT_INDEX])) {
            token += fileStr[POINT_INDEX];
            POINT_INDEX++;
        }
    }
    // 如果下一个字符是数字，则读取一个数字
    else if (/\d/.test(fileStr[POINT_INDEX])) {
        while (
            POINT_INDEX < fileStr.length &&
            /\d/.test(fileStr[POINT_INDEX])
        ) {
            token = token + fileStr[POINT_INDEX];
            POINT_INDEX++;
        }
    }
    // 如果下一个字符是运算符
    else if (/(<|>)/.test(fileStr[POINT_INDEX])) {
        while (
            POINT_INDEX < fileStr.length &&
            /\d/.test(fileStr[POINT_INDEX])
        ) {
            token += fileStr[POINT_INDEX];
            POINT_INDEX++;
        }
    }
    // 否则，将单个字符作为符号返回
    else {
        token = fileStr[POINT_INDEX];
        POINT_INDEX++;
    }
    if (!token) {
        token = fileStr[POINT_INDEX + 1];
        POINT_INDEX++;
    }
    console.log('---token---', token);
    return token;
}

/**
 * 语句分析程序
 * @param fileStr
 */
function statement(fileStr: string) {
    if (getNextToken(fileStr) === 'if') {
        expression(fileStr);
        statement(fileStr);
    } else if (getNextToken(fileStr) === 'else') {
        statement(fileStr);
    } else {
        // 解析变量赋值语句
        variable(fileStr);
        if (getNextToken(fileStr) === '=') {
            POINT_INDEX++;
            expression(fileStr);
        }
    }
}

// 表达式
function expression(fileStr: string) {
    term(fileStr);

    while (fileStr[POINT_INDEX] === '+' || fileStr[POINT_INDEX] === '>') {
        POINT_INDEX++;
        term(fileStr);
    }
}

// 变量
function variable(fileStr: string) {
    let token = getNextToken(fileStr);

    if (token.match(/[a-zA-Z0-9]/)) {
        POINT_INDEX++;

        if (getNextToken(fileStr) === '[') {
            POINT_INDEX++;
            expression(fileStr);
            if (fileStr[POINT_INDEX] === ']') {
                POINT_INDEX++;
            }
        }
        return;
    } else if (fileStr[POINT_INDEX].match(/[>]/)) {
        POINT_INDEX++;
        variable(fileStr);
    } else if (token === '*') {
        POINT_INDEX++;
        variable(fileStr);
    } else if (token === ';') {
        statement(fileStr);
    } else if (token === '=') {
        POINT_INDEX++;
        expression(fileStr);
    } else if (token === '-') {
        POINT_INDEX++;
        variable(fileStr);
    } else {
        throw new Error(`Invalid variable about --- ${fileStr[POINT_INDEX]}`);
    }
}

// 项
function term(fileStr: string) {
    factor(fileStr);

    while (fileStr[POINT_INDEX] === '*' || fileStr[POINT_INDEX] === '/') {
        POINT_INDEX++;
        factor(fileStr);
    }
}

// 因子
function factor(fileStr: string) {
    let token = getNextToken(fileStr);

    // 判断左右两边是否是括号
    if (token === '(') {
        expression(fileStr);
        if (getNextToken(fileStr) === 'else') {
            statement(fileStr);
        }
    } else {
        variable(fileStr);
    }
}

/**
 * 分析主程序
 */
function mainParser(fileStr: string) {
    if (fileStr) {
        console.log('解析目标字符串：', fileStr);
        statement(fileStr);
    }
}
export {mainParser};
