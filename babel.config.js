module.exports = {
  presets: ["@vue/app", "@vue/babel-preset-jsx"],
  // .babelrc or babel-loader option
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "true" }] 
    // `style: true` 会加载 less 文件
  ]
  
};
