# compiler-example

一个由 TS 搭建的学习版编译器

A basic compiler for learning written in typescript language

```sh
yarn tsc

yarn dev
```

-   [x] 预处理
-   [x] 词法分析

What should be able to be run today?

```js
let a = 12;
let b = 14;

let c = a + b;
```

After running it will become...

```
let a=12;let b=14;let c=a+b;
```

```json
{
    "tokens": [
        {
            "type": "keyword",
            "val": "let"
        }
    ]
}
```
