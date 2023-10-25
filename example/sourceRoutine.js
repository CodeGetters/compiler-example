/**
 * @title 基础
 * @description 不能添加属性，值不是对象---不能添加属性，类似字符串的数据类型，
 * @description 接受一个字符串作为参数，表示 Symbol 实例的描述，这样方面分清谁是谁
 * @description 参数如果是对象，会调用对象的 toString 方法，将其转为字符串，然后生成一个 symbol 值
 * @description Symbol 值不能与其他类型的值进行运算，会报错
 * @type {symbol}
 */

let s1 = Symbol('foo');
console.log('s1 的数据类型', typeof s1);

let s2 = Symbol('bar');
console.log('s2 === s1?：', s1 === s2);
console.log('s1.toString：', s1.toString());
console.log('s2.toString：', s2.toString());

const obj1 = {
    toString() {
        return 'abc';
    },
};

let s3 = Symbol(obj1);
console.log('当参数为对象时：', s3);

const obj2 = {
    a: 1,
    b: 2,
    c: 3,
};

let s4 = Symbol(obj2);

console.log('当参数为对象且没有 toString 时：', s4);

let n = 5;
let s5 = Symbol('与其他类型的值进行运算');
//console.log(n + s5)

console.log(String(s5) + '显示转为字符串');
let s6 = Symbol();
console.log('显示转为布尔值，但是不能转为数值', Boolean(s6));
console.log(Number(Boolean(s6)));

/**
 * @title Symbol.prototype.description
 *
 * @description 在 ES2019 提供可以直接返回 Symbol 描述的实例属性
 */
const s7 = Symbol('foo');
console.log('description 属性：', s7.description);

/**
 * @title 作为属性名的 Symbol
 *
 * @description 用 Symbol 值作为标识符，用于对象的属性名就能保证不会出现同名的属性
 * @description Symbol 值作为对象属性名时，不能用点运算符
 * @description 在对象内部使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中
 * @description Symbol 类型定义一组常量，保证这组常量的值不相等
 * @description Symbol 值作为属性名时，该属性还是公开属性不是私有属性
 */

let mySymbol = Symbol();

let a1 = {};
a1[mySymbol] = 'Hello';
console.log('将 Symbol 值作为标识符应用于对象的属性名：', a1[mySymbol]);

let a2 = {
    [mySymbol]: 'world',
};
console.log('将 Symbol 值作为标识符应用于对象的属性名：', a2[mySymbol]);

let a3 = {};
Object.defineProperty(a3, mySymbol, {value: 'ES'});
console.log('将 Symbol 值作为标识符应用于对象的属性名：', a3[mySymbol]);

console.log(a1.mySymbol);

let a4 = Symbol();
let obj3 = {
    [a4]: function () {},
};

let obj4 = {
    [a4]() {},
};
console.log('在对象内部，使用 Symbol 值定义属性：', obj3[a4]);
console.log('在对象内部，使用 Symbol 值定义属性：', obj4[a4]);

const log1 = {};

log1.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn'),
};
console.log('log1.levels.INFO：', log1.levels.INFO);

const COLOR_RED = Symbol('RED');
const COLOR_GREEN = Symbol('GREEN');

function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            return 'Undefined color';
    }
}

console.log('getComplement(COLOR_RED：)', getComplement(COLOR_RED).description);

/**
 * @title 消除魔术字符串
 *
 * @description 将多次出现的字符串改由含义清晰的变量代替
 */
const shapeType = {
    triangle: 'Triangle',
};

function getArea(shape, options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle:
            area = 0.5 * options.width * options.height;
            break;
    }
    return area;
}

getArea(shapeType.triangle, {width: 100, height: 100}); // 消除魔术字符串

/**
 * @title 属性名的遍历
 *
 * @description Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyName、JSON.stringify返回
 * 使用 Object.getOwnPropertyNames 方法可以获取指定对象的所有 Symbol 值
 * Reflect.ownKeys 方法获取所有类型的键名
 */

const obj5 = {};

let a = Symbol('a');
let b = Symbol('b');

obj5[a] = 'Hello';
obj5[b] = 'World';
obj5.c = 'ES';

console.log(
    'Object.getOwnPropertySymbols 获取所有 Symbol 属性名：',
    Object.getOwnPropertySymbols(obj5),
);

console.log('Reflect.ownKeys 获取所有类型的键名', Reflect.ownKeys(obj5));

/**
 * @title Symbol.for,Symbol.keyFor
 *
 * @description Symbol.for 方法可以重新使用同一个 Symbol 值，它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值，如果有就返回这个 Symbol 值，否则会新建一个并注册到全局
 * @description Symbol.for 和 Symbol() 两种写法的区别：
 * @description Symbol() 会被登记在全局环境中供搜索，而 Symbol.for() 不会
 * @description Symbol.for() 不会每次调用就返回一个新的 Symbol 类型的值，而是先检查，如果没有才会创建，换句话说，每次调用的 Symbol.for('cat') 都是一样的
 * @description Symbol.for() 返回一个在全局环境下已登记的 Symbol 类型值的 key，不管有没有在全局环境下运行
 */

let a5 = Symbol.for('foo');
let a6 = Symbol.for('foo');
let a8 = Symbol.for('obj');
let a7 = Symbol('obj');
console.log('Symbol.for 方法获取同一个 Symbol 值：', a5 === a6);
console.log('Symbol === Symbol.for?:', a7 === a8);

// Singleton 模式：调用一个类，任何时候返回的都是同一个实例

/**
 * @title 内置的 Symbol 值
 * @description ES6 内置的 11 个 Symbol 值
 * @description Symbol.hasInstance
 * @description Symbol.species
 * @description Symbol.match
 * @description Symbol.replace
 * @description Symbol.search
 * @description Symbol.split
 * @description Symbol.iterator
 * @description Symbol.toPrimitive
 * @description Symbol.toStringTag
 * @description Symbol.unscopables
 */
