import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
    mode: 'development',

    entry: './src/index.tsx',

    output: {
        filename: 'bundle.js',
        path: `${__dirname}/dist`
    },

    devtool: 'source-map',

    devServer: {
        port: 3000,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },

    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.json' ]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: require('html-webpack-template'),
            appMountId: 'app',
            mobile: true,
            lang: 'en-US',
            title: 'Physics'
        })
    ]
};

export default config;