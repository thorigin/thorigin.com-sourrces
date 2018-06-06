const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const JSSRC = path.resolve(__dirname, 'src/js');
const STYLESRC = path.resolve(__dirname, 'src/style');
const IMGS = path.resolve(__dirname, 'src/images');

const paths = [
    {
        path: '/#home'
    },{
        path: '/#projects'
    },{
        path: '/#resume'
    },{
        path: '/#contact'
    },{
        path: '/export/omar.thor.resume.2018.pdf'
    },{
        path: '/export/omar.thor.resume.2018.odt'
    },{
        path: '/export/omar.thor.resume.2018.docx'
    },{
        path: '/export/omar.thor.resume.2018.txt'
    }
];

const production = process.env.NODE_ENV === 'production';

var extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

module.exports = {
    entry:  path.resolve('./src/js/index.js'),
    target: 'web',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
    },
    plugins: [
            new CopyWebpackPlugin([
                //COPY static HTML resources
                { from: 'public_html' },
                { from: 'src/images/banner.png', to: 'assets/banner.png' },
                { from: 'src/images/thorigin.com-og.jpeg', to: 'assets/thorigin.com-og.jpeg' },
                { from: 'src/export/omar.thor.resume.2018.pdf', to: 'export/omar.thor.resume.2018.pdf' },
                { from: 'src/export/omar.thor.resume.2018.odt', to: 'export/omar.thor.resume.2018.odt' },
                { from: 'src/export/omar.thor.resume.2018.docx', to: 'export/omar.thor.resume.2018.docx' },
                { from: 'src/export/omar.thor.resume.2018.txt', to: 'export/omar.thor.resume.2018.txt' },
            ]),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            extractSass,
            new SitemapPlugin('http://thorigin.com', paths),
            new OptimizeCssAssetsPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            })
    ],
    module: {        
        rules: [
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        {
                                loader: "css-loader",
                                options: { importLoaders: 1 }
                            },{
                            loader: 'postcss-loader', // Run post css actions
                            options: {
                                plugins: function () { // post css plugins, can be exported to postcss.config.js
                                    return [
                                        require('precss'),
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        },{
                            loader: "sass-loader"
                        }
                    ],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },{
                test: /\.(jpe?g|gif|png|svg|woff|woff2|ttf|eot)(\?\S*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: 'assets/[hash].[ext]',
                            limit: 10240
                        }
                    }
                ]
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }                    
                }
            }
        ]
    }
};
