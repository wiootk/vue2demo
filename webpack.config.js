var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')
var entryJS = glob.sync('./src/*.js').reduce(function(prev, curr) {
    prev[curr.slice(6, -3)] = curr;
    return prev;
}, {});
//entryJS['common'] = ['vue', 'jquery', 'iview', 'router', 'Vuex', 'VueResource', 'directive']
entryJS['common'] = ['vue', 'jquery', 'router'];

var htmls = glob.sync('./*.html').map(function(item) {
    return new HtmlWebpackPlugin({
        filename: item,
        template: item,
        inject: false,
        chunks: [item.slice(2, -5), 'common']
    });
});



module.exports = {
    // entry: './src/main.js',
    // output: {
    //     path: path.resolve(__dirname, './dist'),
    //     publicPath: '/dist/',
    //     filename: 'build.js'
    // },

    entry: entryJS,
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        // filename: '[name].[hash].js'
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                'scss': 'vue-style-loader!css-loader!sass-loader',
                                'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: true // <Switch> 和 <Circle>,设为 true 后， <i-row>、<i-select>
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }, {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|otf|svg|svgz)(\?.+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000
                    }
                }]
            }, {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            { test: /iview.src.*?js$/, loader: 'babel-loader' }
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
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port: 5555,
        host: '172.168.1.70',
        inline: true,
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

//注册全局变量
module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin('common')
    // , new HtmlWebpackPlugin()
]).concat(htmls);



if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}