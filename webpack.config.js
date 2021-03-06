//387cb25ad7ef2814d44a27fe4f7ffb208d015626
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: ['./src/main.js'],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'dist/bundle.js'
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
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader?sourceMap=true',
                    {
                        loader: 'less-loader',
                        options: {
                            strictMath: true,
                            noIeCompat: true
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
        new CleanWebpackPlugin('./dist'),
        new MiniCssExtractPlugin({
            filename: 'dist/[name].css',
            chunkFilename: 'dist/[id].css'
        }),
        new FriendlyErrorsWebpackPlugin(),
    ]
}