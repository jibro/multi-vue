const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra');
const vueWebTemp = 'temp'
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
const assetsPath = function (_path) {
  return path.posix.join('', _path)
}
let entry = {}
const getEntryFileContent = (entryPath, vueFilePath) => {
  let relativePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let contents = '';
  relativePath = relativePath.replace(/\\/g, '\\\\');
  contents += 'import App from \'' + relativePath + '\'\n';
  contents += 'new Vue({el: \'#app\',render: h => h(App)})'
  return contents;
}
const walk = (dir) => {
  dir = dir || '.';
  const directory = path.join(__dirname, 'src', dir);
  fs.readdirSync(directory).forEach((file) => {
    const fullpath = path.join(directory, file);
    const extname = path.extname(fullpath);
    console.log(extname)
    if (extname === '.vue') {
      const name = path.join(dir, path.basename(file, extname));
      const entryFile = path.join(vueWebTemp, dir, path.basename(file, extname) + '.js');
      fs.outputFileSync(path.join(entryFile), getEntryFileContent(entryFile, fullpath));
      entry[name] = path.join(__dirname, entryFile);
      console.log(entry)
    }
  })
}
walk('pages');
module.exports = {
  entry: entry,
  output: {
    path: resolve('dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  externals: {
    'vue': 'Vue',
    'axios': 'axios'
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    })
  ]
}