var webpack = require ('webpack');
var path = require('path');

module.exports = {
    devtool: 'inline-source-map', // output line for better debugging
    entry: [ // Where is webpack gonna look for entry files to load
        'webpack-dev-server/client?http://127.0.0.1:8080',
        'webpack/hot/dev-server', // auto reloading
        'angular-material',
        'angular-material/angular-material.scss',
        './www' // our app entry
    ],
    output: { // Where webpack will bundle our app
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: { //Where webpack will look for files
        modulesDirectories: ['node_modules', 'www'],
        extensions: ['', '.js', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.scss$/,
                loaders: [
                   'style',
                    'css',
                    'autoprefixer?browsers=last 3 versions',
                    'sass?outputStyle=expanded'
                ]
            },
            { 
                test: /\.mp3$/,
                loader: "file" 
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(woff2?|ttf|eot|svg)$/,
                loader: 'url?limit=10000'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    devServer: {
        hot: true,
        proxy: {
            '*': 'http://localhost:1000'
        }
    }