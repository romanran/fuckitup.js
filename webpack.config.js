//387cb25ad7ef2814d44a27fe4f7ffb208d015626
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

module.exports = {
    mode: 'development',
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'fuckitup.js'
    },
    module: {
        noParse: /lodash/,
        rules: [{
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                },
            },
            {
                test: /\.less$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?sourceMap=true',
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true,
                            paths: [
                                path.resolve(path.join(__dirname, 'src'))
                            ],
                            plugins: [require('less-plugin-glob')]
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/',
                        publicPath: 'assets/'
                    }
                }]
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: 0,
            skipFirstNotification: true
        }),
        new CleanWebpackPlugin('./dist'),
        new MiniCssExtractPlugin({
            filename: 'fuckitup.css',
            chunkFilename: '[id].css'
        }),
        new FriendlyErrorsWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            }
        })
    ]
}