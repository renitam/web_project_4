// webpack.config.js
const path = require("path"); // connect path to webpack config

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: ""
  }
}


// module.exports is the syntax for export in Node.js