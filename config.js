import pkg from './package.json'
import minimist from 'minimist'

const envSettings = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'development'
  }
}

const options = minimist(process.argv.slice(2), envSettings)
const production = options.env === 'production'

const config = {
  src: 'src',
  localUrl: `${pkg.name}.dev`,
  envProduction: production
}

const tasks = {
  sass: {
    src: `${config.src}/sass/style.scss`,
    dest: './',
    sassOptions: {
      includePaths: ['node_modules/'],
      outputStyle: 'expanded'
    },
    autoprefixer: [
      "> 1%",
      "last 2 versions",
      "Firefox ESR"
    ]
  },
  webpack: {
    src: `${config.src}/js/app.js`,
    dest: './js',
    filename: 'bundle.js'
  },
  cleanup: [
    './style.css',
    './js/bundle*.js'
  ],
  watch: {
    sass: [`${config.src}/sass/**/!(_)*.{scss,sass}`],
    webpack: [`${config.src}/js/**/*.js`],
    reload: [
      './**/*.php',
      './js/*.js'
    ]
  }
}

config.tasks = tasks
module.exports = config
