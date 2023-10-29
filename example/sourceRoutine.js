/**
 * @title 基础
 * @description 不能添加属性，值不是对象---不能添加属性，类似字符串的数据类型，
 * @description 接受一个字符串作为参数，表示 Symbol 实例的描述，这样方面分清谁是谁
 * @description 参数如果是对象，会调用对象的 toString 方法，将其转为字符串，然后生成一个 symbol 值
 * @description Symbol 值不能与其他类型的值进行运算，会报错
 * @type {symbol}
 */

let a = 1;
let b = 2;
let c = a + b;

let d = '111';
let f = '"1" + 2';
f = f + d;

const g = () => {};
