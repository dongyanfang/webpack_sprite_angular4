/**
 * Created by wdg02 on 2018/1/23.
 */
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
var path = require('path');

var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = webpackMerge(commonConfig, {
    output: {
        path      : helpers.root('dist'),
        publicPath: '/dist/',
        filename  : '[name].js'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {test: /\.styl$/, loaders: [
                'style-loader',
                'css-loader',
                'stylus-loader'
            ]},
            {test: /\.png$/, loaders: [
                'file-loader?name=i/[hash].[ext]'
            ]}
        ]
    },
    resolve: {
        modules: [
            'node_modules',
            'assets/sprite' //css在哪里能找到sprite图
        ]
    },
    plugins: [
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: path.resolve(__dirname, '../src/assets/imgs/icons'),
                glob: '*.png'
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: path.resolve(__dirname, '../dist/sprites/sprite.png'),
                css: path.resolve(__dirname, '../dist/sprites/sprite.css')
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../sprites/sprite.png'
            },
            spritesmithOptions: {
                algorithm: 'top-down'
            }
        })
    ]
});
