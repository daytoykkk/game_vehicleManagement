const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    // 针对antd实现按需打包：根据import来打包
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,   //自动打包相关的样式
    }),
    // 自定义主题
    addLessLoader({
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: { 
                '@primary-color': '#648cb9',
                '@border-radius-base': '4px',
                '@layout-header-background': '#648cb9',
            },
        }
    }),
);