exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        module: {
            rules: [
                {
                    test: /\.wasm$/,
                    loader: "file-loader",
                    type: "javascript/auto",
                }
            ]
        },
        resolve: {
            fallback: {
                path: require.resolve("path-browserify")
            }
        }
    });
};

// exports.modifyWebpackConfig = function ({ config, env }) {
//     config.merge({
//         module: {
//             rules: [
//                 {
//                     test: /\.wasm$/,
//                     loader: "file-loader",
//                     type: "javascript/auto",
//                 }
//             ]
//         },
//         resolve: {
//             fallback: {
//                 path: require.resolve("path-browserify")
//             }
//         }
//     });
//     return config;
// }
