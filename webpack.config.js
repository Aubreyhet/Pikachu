const path = require( 'path' )
const htmlWebpackPlugin = require( 'html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundel.js'
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname, './index.html'),
            filename: 'index.html'
        }),
    ],
    module :{
        rules: [
            {test: /\.css$/, use: ['style-loader','css-loader']},
            {test: /\.less$/, use: ['style-loader','css-loader','less-loader']},
            {test: /\.(jpg|png|gif|jpeg|bmp)$/, use:'url-loader?limit=15000'},
            {test: /\.(ttf|svg|eot|woff|woff2)$/, use:'url-loader'},
            {test: /\.js$/, use:'babel-loader', exclude: /node_modules/}
        ]
    },
    resolve: {
        alias: {"vue$" : "vue/dist/vue.js"}
    }

}