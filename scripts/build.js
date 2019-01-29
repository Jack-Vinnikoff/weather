const webpack = require('webpack');
const config = require('../webpack.config');
const fs = require('fs-extra');
const merge = require('webpack-merge');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

copyPublicFolder();

const prodConfig = merge(config, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    }
});

let compiler = webpack(prodConfig);

compiler.run((err, stats) => {
    if (!err) {
        console.log('Build created successfully!');
    }
    else {
        console.log(`Build return with error: ${err}`);
    }
});


function copyPublicFolder() {
    fs.copySync('public', 'dist', {
        dereference: true,
        filter: file => file !== 'public/index.html',
    });
}