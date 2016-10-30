import autoprefixer from 'gulp-autoprefixer'
import browserSync, {reload, stream} from 'browser-sync'
import config from './config'
import cssmin from 'gulp-cssmin'
import del from 'del'
import gulp from 'gulp'
import gulpIf from 'gulp-if'
import plumber from 'gulp-plumber'
import runSequence from 'run-sequence'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import webpack from 'webpack'
import webpackConfig from './webpack.config.babel'
import webpackStream from 'webpack-stream'

// sass
// =====================================================
gulp.task('sass', () => {
  return gulp.src(config.tasks.sass.src)
    .pipe(gulpIf(!config.envProduction, sourcemaps.init()))
    .pipe(plumber({
      errorHandler: (err) => {
        console.log(err.messageFormatted)
        this.emit('end')
      }
    }))
    .pipe(sass(config.tasks.sass.sassOptions))
    .pipe(autoprefixer({ browsers: config.tasks.sass.autoprefixer }))
    .pipe(gulpIf(!config.envProduction, sourcemaps.write()))
    // .pipe(gulpIf(config.envProduction, cssmin()))
    .pipe(gulp.dest(config.tasks.sass.dest))
    .pipe(stream())
})

// webpack
// =====================================================
gulp.task('webpack', () => {
  if (config.envProduction) {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
  } else {
    webpackConfig.devtool = 'source-map'
  }
  return gulp
    .src(config.tasks.webpack.src)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(config.tasks.webpack.dest))
})

// Server
// =====================================================
gulp.task('server', () => {
  return browserSync.init({
    proxy: config.localUrl,
    open: 'external'
  })
})

// Watch
// =====================================================
gulp.task('watch', () => {
  const props = []
  Object.keys(config.tasks.watch).forEach(function (key) {
    let task
    if (key === 'reload') {
      task = gulp.watch(config.tasks.watch[key]).on('change', reload)
    } else {
      task = gulp.watch(config.tasks.watch[key], [key])
    }
    return props.push(task)
  })
  return props
})

// CLEAN
// =====================================================
gulp.task('clean', (cb) => {
  return del(config.tasks.cleanup, cb)
})

// Default
// =====================================================
gulp.task('default', (cb) => {
  return runSequence(
    ['build'],
    'watch',
    'server',
    cb
  )
})

// Build
// =====================================================
gulp.task('build', (cb) => {
  return runSequence(
    'clean',
    'sass',
    'webpack',
    cb
  )
})
