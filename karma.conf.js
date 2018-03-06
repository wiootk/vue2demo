var path = require('path')
module.exports = function(config) {
    config.set({
        // basePath: '',
        frameworks: ['mocha', 'sinon-chai'],
        // 测试入口文件
        files: ['./test/unit/index.js'],
        //         exclude: [    ],
         // 用webpack解析，同时显示测试文件路径
        preprocessors: {
            './test/unit/index.js': ['webpack', 'sourcemap'],
        },
         // 设置测试覆盖率输出插件
        reporters: ['spec', 'coverage'],
        // karma-coverage配置，配置测试覆盖率的输出目录及格式
        coverageReporter: {
            dir: './coverage',
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' },
            ]
        },
        // port: 9876,
        // logLevel: config.LOG_INFO,
        // concurrency: Infinity,
        colors: true,
        autoWatch: false,
        // 设置默认打开的浏览器
        browsers: ['PhantomJS'],
        //  设置运行完成是否自动退出
        singleRun: true,
         // 是否打印webpack打包信息
        webpackMiddleware: {
            noInfo: true
        },
        // webpack 配置用来解析js文件和vue文件，如果有css请自行配置css-loader
        webpack: {
            module: {
                loaders: [{
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.vue$/,
                        loaders: [{
                            loader: 'vue-loader',
                        }]
                    },
                ]
            },
            resolve: {
                //拓展名      
                extensions: ['.js', '.vue', '.json'],
                //简写
                alias: {
                    'vue$': 'vue/dist/vue.esm.js',
                    '@': path.resolve(__dirname, './src'),
                    'router': path.resolve(__dirname, './src/components/router'),
                },
                //去哪找依赖
                modules: [
                    path.join(__dirname, './node_modules')
                ]
            }
        }
    })
}