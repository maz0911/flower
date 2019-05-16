const path = require("path");

const ExtractWebpack = require("extract-text-webpack-plugin");
const HtmlWebpack = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.join(__dirname, "bulid"),
        filename: "index.js"
    },
    module: {
        rules: [{
            //压缩js
            test: /\.js$/,
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            }
        }, {
            //压缩css
            test: /\.css$/,
            use: ["style-loader", "css-loader"],

        }, {
            //压缩图片
            test: /\.(png|jpg|gif|jpeg)$/,
            loader: "url-loader",
            options: {
                limit: 4000
            }
        }, {
            //压缩icon
            test: /\.(woff|svg|eot|ttf)$/,
            loader: "file-loader",
            options: {
                name: "./fonts/[name].[ext]"
            }
        }, {
            //压缩scss
            test: /\.scss$/,
            use: ExtractWebpack.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }]
    },
    plugins: [
        new ExtractWebpack("style.css"),
        new HtmlWebpack({
            template: "index.html",
        })
    ],
    //起服务
    devServer: {
        port: 8989,
        open: true,
        inline: true,
        host: 'localhost'
    }
}