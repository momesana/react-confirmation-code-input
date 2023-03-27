/* eslint-env node */
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

function webpackConfig(env, { mode = "development" }) {
  const isDevelopment = mode === "development";
  const isEsm = env.libraryType === "esm";
  const output = isDevelopment
    ? {
        path: resolve(__dirname, "./dist"),
        filename: "main.js",
      }
    : isEsm
    ? {
        path: resolve(__dirname, "./es"),
        filename: "index.js",
        globalObject: "this",
        library: {
          type: "module",
        },
        module: true,
      }
    : {
        path: resolve(__dirname, "./lib"),
        filename: "index.js",
        globalObject: "this",
        library: {
          name: "react-confirmation-code-input",
          type: "umd",
        },
      };

  return {
    mode,
    entry: "./src/index.ts",
    devServer: {
      hot: true,
    },
    experiments: !isDevelopment && isEsm ? { outputModule: true } : undefined,
    output,
    externals: {
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react",
        module: "react",
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom",
        module: "react-dom",
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          resolve: {
            fullySpecified: false,
          },
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                plugins: [isDevelopment && "react-refresh/babel"].filter(
                  Boolean
                ),
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [isDevelopment && new ReactRefreshWebpackPlugin()].filter(Boolean),
  };
}

export default webpackConfig;
