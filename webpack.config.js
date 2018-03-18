var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry:{
        homePage: "./app/assets/javascripts/entries/home-page.js",
        shopPage: "./app/assets/javascripts/entries/my-shop-page.js",
        itemPage: "./app/assets/javascripts/entries/item-page.js",
        cartPage: "./app/assets/javascripts/entries/cart-page.js",
        buyerOrdersPage: "./app/assets/javascripts/entries/buyer-orders-page.js",
        sellerOrdersPage: "./app/assets/javascripts/entries/seller-orders-page.js",
        profilePage: "./app/assets/javascripts/entries/profile-page.js"
    },
    output: {
        path: __dirname + '/app/assets/javascripts/build/',
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            {test:/\.(js|jsx)$/,exclude: /node_modules/,loader: 'babel-loader', query: {presets: ['es2015', 'react', 'stage-2']} },
            {test: /\.(css|scss)$/, loader: "style-loader!css-loader!sass-loader" },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:'/icons/[name].[ext]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                },
                                gifsicle: {
                                    interlaced: true,
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                }
                            }
                        }
                    }]

            }

        ]
    }
};