const path = require("path");

module.exports = {
  entry: "./app/_components/ChatWidget.js", // Entry point for your ChatWidget component
  output: {
    filename: "widget.js", // Output file name
    path: path.resolve(__dirname, "dist"), // Output directory
    library: "ChatWidget", // Expose the component as a global variable
    libraryTarget: "umd", // Universal Module Definition (works for CommonJS, AMD, and as a global variable)
    globalObject: "this", // Ensure compatibility with both browser and Node.js environments
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  externals: {
    react: "React", // Use external React library
    "react-dom": "ReactDOM", // Use external ReactDOM library
  },
};
