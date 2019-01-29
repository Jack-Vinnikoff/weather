const path = require('path');
const polyfill = require('@babel/polyfill')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const PORT = 3001;
const APP_NAME = 'Application name';

const config = {
    entry: ["@babel/polyfill",  `${SRC_DIR}/app/index.js`],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: SRC_DIR,
                loader: 'babel-loader'
            },
            {
                oneOf: [
                    {
                        test: /\.scss$/,
                        use: ExtractTextPlugin.extract({
                            fallback: "style-loader",
                            use: "css-loader!sass-loader",
                        })
                    }
                    ,
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: 'img/[name].[ext]',
                        },
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2)$/,
                        exclude: PUBLIC_DIR,
                        use: {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name][hash].[ext]'
                            }
                        }
                    }
                ]
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: APP_NAME,
            template: `${PUBLIC_DIR}/index.html`,
            filename: 'index.html'
        }),
        new ExtractTextPlugin('style.css')
    ],
    devServer: {
        contentBase: PUBLIC_DIR,
        watchContentBase: true,
        port: PORT,
        compress: true,
        contentBase: './',
        historyApiFallback: true
    }
};

module.exports = config;