var webpack = require ('webpack');
var path = require('path');

module.exports = {
    entry: [
        'angular-material',
        'angular-material/angular-material.scss',
        './www'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
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
                    'sass?outputStyle=compact'
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
        new webpack.NoErrorsPlugin()
    ]
};