//导入解析vue
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//配置首页
const htmlWebPlugin = require('html-webpack-plugin');
const plugin = new htmlWebPlugin({
    template: './src/index.html',
    filename: 'index.html'
});
//导入node 的path 组件 设置 导出导入的文件
const path = require('path');
module.exports = {
    mode: 'development',
    //设置 导出导入的文件
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    plugins: [plugin, new VueLoaderPlugin()],
    module: {
        rules: [
            // css  样式加载器
            { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'scss-loader'] },
            //图片字体路径加载器
            {
                test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
                use: ['url-loader?limit = 16940']
            },
            //vue 解析加载器
            { test: /\.vue$/, loader: 'vue-loader' }
        ]
    }

}