let s1=Symbol('foo');console.log('s1 的数据类型', typeof s1);let s2=Symbol('bar');console.log('s2===s1?：', s1===s2);console.log('s1.toString：', s1.toString());console.log('s2.toString：', s2.toString());const obj1={toString(){return'abc';},};let s3=Symbol(obj1);console.log('当参数为对象时：', s3);const obj2={a: 1,b: 2,c: 3,};let s4=Symbol(obj2);console.log('当参数为对象且没有 toString 时：', s4);let n=5;let s5=Symbol('与其他类型的值进行运算');console.log(String(s5)+'显示转为字符串');let s6=Symbol();console.log('显示转为布尔值，但是不能转为数值', Boolean(s6));console.log(Number(Boolean(s6)));const s7=Symbol('foo');console.log('description 属性：', s7.description);let mySymbol=Symbol();let a1={};a1[mySymbol]='Hello';console.log('将 Symbol 值作为标识符应用于对象的属性名：', a1[mySymbol]);let a2={[mySymbol]:'world',};console.log('将 Symbol 值作为标识符应用于对象的属性名：', a2[mySymbol]);let a3={};Object.defineProperty(a3, mySymbol,{value:'ES'});console.log('将 Symbol 值作为标识符应用于对象的属性名：', a3[mySymbol]);console.log(a1.mySymbol);let a4=Symbol();let obj3={[a4]: function(){},};let obj4={[a4](){},};console.log('在对象内部，使用 Symbol 值定义属性：', obj3[a4]);console.log('在对象内部，使用 Symbol 值定义属性：', obj4[a4]);const log1={};log1.levels={DEBUG: Symbol('debug'),INFO: Symbol('info'),WARN: Symbol('warn'),};console.log('log1.levels.INFO：', log1.levels.INFO);const COLOR_RED=Symbol('RED');const COLOR_GREEN=Symbol('GREEN');function getComplement(color){switch(color){case COLOR_RED:;return COLOR_GREEN;case COLOR_GREEN:;return COLOR_RED;default:;return'Undefined color';};};console.log('getComplement(COLOR_RED：)', getComplement(COLOR_RED).description);const shapeType={triangle:'Triangle',};function getArea(shape, options){let area=0;switch(shape){case shapeType.triangle:;area=0.5 * options.width * options.height;break;};return area;};getArea(shapeType.triangle,{width: 100, height: 100});const obj5={};let a=Symbol('a');let b=Symbol('b');obj5[a]='Hello';obj5[b]='World';obj5.c='ES';console.log('Object.getOwnPropertySymbols 获取所有 Symbol 属性名：',Object.getOwnPropertySymbols(obj5),);console.log('Reflect.ownKeys 获取所有类型的键名', Reflect.ownKeys(obj5));let a5=Symbol.for('foo');let a6=Symbol.for('foo');let a8=Symbol.for('obj');let a7=Symbol('obj');console.log('Symbol.for 方法获取同一个 Symbol 值：', a5===a6);console.log('Symbol===Symbol.for?:', a7===a8);