# compiler-example

一个由 TS 搭建的学习版编译器

A basic compiler for learning written in typescript language

```sh
yarn tsc

yarn check

yarn dev
```

-   [x] 预处理
-   [x] 词法分析
-   [ ] 语法分析

What should be before running?
运行前代码是什么样的？

```js
// example/sourceRoutine.js
let a = 12;
let b = 14;

let c = a + b;
```

After running it will become...
代码运行后将变成...

```
// example/output.js
let a=12;let b=14;let c=a+b;
```

```json
// example/lexicalOutput.json
{
    "tokens": [
        {
            "type": "keyword",
            "val": "let",
            "line": 1
        }
    ]
}
```
