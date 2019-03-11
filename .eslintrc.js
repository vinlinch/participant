module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  // https://stackoverflow.com/questions/38296761/how-to-support-es7-in-eslint
  // 为了让eslint支持es7或更高的语法
  // "parser": "babel-eslint",
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "plugins": [
    // https://github.com/BenoitZugmeyer/eslint-plugin-html
    // 支持 *.vue lint
    // "html"
    "vue"
  ],
  // https://eslint.org/docs/rules/
  "rules": {
    //-----------代码风格类-----------
    //缩进为2
    // "indent": [
    //   "error",
    //   2
    // ],
    "linebreak-style": 0,
    //js中字符串必须使用单引号 暂时不起用
    // "quotes": [
    //   "error",
    //   "single"
    // ],
    //统一不写分号 暂时不起用
    // "semi": [
    //   "error",
    //   "never"
    // ],
    "no-trailing-spaces": [
      "error",
      {"skipBlankLines": true}
    ],
    // https://eslint.org/docs/user-guide/configuring#using-configuration-files
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    //----------语法类-------------
    "no-cond-assign": 2,//禁止条件表达式中出现赋值操作符
    "no-console": 0,//禁用 console
    "no-constant-condition": 2,//禁止在条件中使用常量表达式
    "no-dupe-args": 2,//禁止 function定义中出现重名参数
    "no-dupe-keys": 2,//禁止对象字面量中出现重复的 key
    "no-duplicate-case": 2,//禁止出现重复的 case 标签
    "no-empty": 2,//禁止出现空语句块
    "no-empty-character-class": 2,//禁止在正则表达式中使用空字符集
    "no-ex-assign": 2,//禁止对 catch 子句的参数重新赋值
    "no-extra-semi": 2,//禁止不必要的分号
    "no-func-assign": 2,//禁止对 function 声明重新赋值
    "no-inner-declarations": 2,//禁止在嵌套的块中出现变量声明或 function 声明
    "no-invalid-regexp": 2,//禁止 RegExp 构造函数中存在无效的正则表达式字符串
    "no-obj-calls": 2,//禁止把全局对象作为函数调用
    "no-sparse-arrays": 2,//禁用稀疏数组
    "no-template-curly-in-string": 2,// 禁止在双引号中使用模板占位语法
    "no-unreachable": 2,//禁止在return、throw、continue 和 break 语句之后出现不可达代码
    "use-isnan": 2,//要求使用 isNaN() 检查 NaN
    //"consistent-return":2,//要求 return 语句要么总是指定返回的值，要么不指定 （特定函数使用）
    "no-empty-function": 2,//禁止出现空函数
    // "no-empty-pattern": 2,//禁止使用空解构模式
    "no-eq-null": 2,//禁止在没有类型检查操作符的情况下与 null 进行比较
    "no-fallthrough": 2,//禁止 case 语句落空
    "no-floating-decimal": 2,//禁止数字字面量中使用前导和末尾小数点
    "no-loop-func": 2,//禁止在循环中出现 function 声明和表达式
    "no-multi-spaces": 2,//禁止使用多个空格
    "no-param-reassign": 2,//禁止对 function 的参数进行重新赋值
    "no-redeclare": 2,//禁止多次声明同一变量
    "no-return-assign": 2,//禁止在 return 语句中使用赋值语句
    "no-self-assign": 2,//禁止自我赋值
    "no-void": 2,//禁用 void 操作符
    "no-with": 2,//禁用 with 语句
    "require-await": 2,//禁止没有await操作的函数声明为async函数
    "wrap-iife": 2,//要求 IIFE （立即执行函数）使用括号括起来
    "max-nested-callbacks": [2, {"max": 3}],//强制回调函数最大嵌套深度为3层
    "constructor-super": 2,// 要求在构造函数中有 super() 的调用
    "no-this-before-super": 2,//禁止在构造函数中，在调用 super() 之前使用 this 或 super
    "require-yield": 2,//要求 generator 函数内有 yield
    //------------变量声明类
    "no-shadow": 2,//禁止变量声明与外层作用域的变量同名
    "no-shadow-restricted-names": 2,//禁止将标识符定义为受限的名字
    //"no-undef":2,//禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    "no-undefined": 2,//禁止将 undefined 作为标识符
    "no-unused-vars": 0,//禁止出现未使用过的变量 存在bug暂时禁用
    "no-use-before-define": 2,//禁止在变量定义之前使用它们

    /* for vue */

    // 禁止重复的二级键名
    // @off 没必要限制
    'vue/no-dupe-keys': 'off',
    // 禁止出现语法错误
    'vue/no-parsing-error': 'error',
    // 禁止覆盖保留字
    // 'vue/no-reservered-keys': 'error',
    // 组件的 data 属性的值必须是一个函数
    // @off 没必要限制
    'vue/no-shared-component-data': 'off',
    // 禁止 <template> 使用 key 属性
    // @off 太严格了
    'vue/no-template-key': 'off',
    // render 函数必须有返回值
    'vue/require-render-return': 'error',
    // prop 的默认值必须匹配它的类型
    // @off 太严格了
    'vue/require-valid-default-prop': 'off',
    // 计算属性必须有返回值
    'vue/return-in-computed-property': 'error',
    // template 的根节点必须合法
    'vue/valid-template-root': 'error',
    // v-bind 指令必须合法
    'vue/valid-v-bind': 'error',
    // v-cloak 指令必须合法
    'vue/valid-v-cloak': 'error',
    // v-else-if 指令必须合法
    'vue/valid-v-else-if': 'error',
    // v-else 指令必须合法
    'vue/valid-v-else': 'error',
    // v-for 指令必须合法
    'vue/valid-v-for': 'error',
    // v-html 指令必须合法
    'vue/valid-v-html': 'error',
    // v-if 指令必须合法
    'vue/valid-v-if': 'error',
    // v-model 指令必须合法
    'vue/valid-v-model': 'error',
    // v-on 指令必须合法
    'vue/valid-v-on': 'error',
    // v-once 指令必须合法
    'vue/valid-v-once': 'error',
    // v-pre 指令必须合法
    'vue/valid-v-pre': 'error',
    // v-show 指令必须合法
    'vue/valid-v-show': 'error',
    // v-text 指令必须合法
    'vue/valid-v-text': 'error',



    //
    //
    // 最佳实践
    //
    // @fixable html 的结束标签必须符合规定
    // @off 有的标签不必严格符合规定，如 <br> 或 <br/> 都应该是合法的
    'vue/html-end-tags': 'off',
    // 计算属性禁止包含异步方法
    'vue/no-async-in-computed-properties': 'error',
    // 禁止出现难以理解的 v-if 和 v-for
    'vue/no-confusing-v-for-v-if': 'error',
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 'error',
    // 禁止在计算属性中对属性修改
    // @off 太严格了
    'vue/no-side-effects-in-computed-properties': 'off',
    // 禁止在 <textarea> 中出现 {{message}}
    'vue/no-textarea-mustache': 'error',
    // 组件的属性必须为一定的顺序
    'vue/order-in-components': 'error',
    // <component> 必须有 v-bind:is
    'vue/require-component-is': 'error',
    // prop 必须有类型限制
    // @off 没必要限制
    'vue/require-prop-types': 'off',
    // v-for 指令的元素必须有 v-bind:key
    'vue/require-v-for-key': 'error',

    //
    //
    // 风格问题
    //
    // @fixable 限制自定义组件的属性风格
    // @off 没必要限制
    'vue/attribute-hyphenation': 'off',
    // html 属性值必须用双引号括起来
    'vue/html-quotes': 'error',
    // @fixable 没有内容时，组件必须自闭和
    // @off 没必要限制
    'vue/html-self-closing': 'off',
    // 限制每行允许的最多属性数量
    // @off 没必要限制
    'vue/max-attributes-per-line': 'off',
    // @fixable 限制组件的 name 属性的值的风格
    // @off 没必要限制
    'vue/name-property-casing': 'off',
    // @fixable 禁止出现连续空格
    'vue/no-multi-spaces': 'error',
    // @fixable 限制 v-bind 的风格
    // @off 没必要限制
    'vue/v-bind-style': 'off',
    // @fixable 限制 v-on 的风格
    // @off 没必要限制
    'vue/v-on-style': 'off',
    //prop必须有default值
    'vue/require-default-prop':'off',
    //横向有内容的标签必须换行
    'vue/singleline-html-element-content-newline':'off',
    //{{ xxx }} 内容两边必须有空格 没必要限制
    'mustache-interpolation-spacing':'off'
  }
};
