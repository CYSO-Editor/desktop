const path = require('path');
const {DefinePlugin} = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const base = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-source-map',
    target: 'web',
    resolve: {
        modules: [
            path.resolve(__dirname, 'node_modules'),
            'node_modules',
            path.resolve(__dirname, '../scratch-gui/node_modules'),
            path.resolve(__dirname, '../scratch-vm/node_modules')
        ],
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                test: /\.(svg|png|wav|gif|jpg|mp3|woff2|hex)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'static/assets/',
                    esModule: false
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]_[local]_[hash:base64:5]',
                            camelCase: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-import',
                                    'postcss-simple-vars',
                                    'autoprefixer'
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
}

module.exports = [
    {
        ...base,
        output: {
            path: path.resolve(__dirname, 'dist-renderer-webpack/editor/gui'),
            filename: 'index.js',
            publicPath: './'
        },
        entry: './src-renderer-webpack/editor/gui/index.jsx',
        optimization: {
            splitChunks: false,
            runtimeChunk: false
        },
        plugins: [
            new DefinePlugin({
                'process.env.ROOT': '""'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'node_modules/scratch-blocks/media',
                        to: 'static/blocks-media/default'
                    },
                    {
                        from: 'node_modules/scratch-blocks/media',
                        to: 'static/blocks-media/high-contrast'
                    },
                    {
                        from: 'node_modules/scratch-gui/src/lib/themes/blocks/high-contrast-media/blocks-media',
                        to: 'static/blocks-media/high-contrast',
                        force: true
                    },
                    {
                        from: 'node_modules/scratch-gui/static/library-assets',
                        to: '../library-assets'
                    },
                    {
                        context: 'src-renderer-webpack/editor/gui/',
                        from: '*.html'
                    }
                ]
            })
        ],
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                'node_modules',
                path.resolve(__dirname, '../scratch-gui/node_modules'),
                path.resolve(__dirname, '../scratch-vm/node_modules')
            ],
            alias: {
                'scratch-gui$': path.resolve(__dirname, 'node_modules/scratch-gui/src/index.js'),
                'scratch-render-fonts$': path.resolve(__dirname, 'node_modules/scratch-gui/src/lib/tw-scratch-render-fonts'),
                'scratch-vm$': path.resolve(__dirname, '../scratch-vm/src/index.js'),
                'scratch-audio$': path.resolve(__dirname, '../scratch-vm/node_modules/scratch-audio/src/index.js'),
                'scratch-render$': path.resolve(__dirname, 'node_modules/scratch-gui/node_modules/scratch-render/src/index.js'),
                'scratch-paint$': path.resolve(__dirname, 'node_modules/scratch-paint/dist/scratch-paint.js'),
                // Use scratch-gui's scratch-blocks, which supports procedure returns.
                'scratch-blocks$': path.resolve(__dirname, '../scratch-gui/node_modules/scratch-blocks')
            }
        }
    },

    {
        ...base,
        output: {
            path: path.resolve(__dirname, 'dist-renderer-webpack/editor/addons'),
            filename: 'index.js'
        },
        entry: './src-renderer-webpack/editor/addons/index.jsx',
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules'),
                'node_modules'
            ]
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: 'src-renderer-webpack/editor/addons/',
                        from: '*.html'
                    }
                ]
            })
        ]
    }
];
