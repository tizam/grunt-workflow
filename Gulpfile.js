const { src, dest, parallel, watch, series } = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')
const browserSync = require('browser-sync')
const server = browserSync.create()
const del = require('del')

const reload = (done) => {
    server.reload()
    done()
}

const serve = (done) => {
    server.init({
        server: './',
    })
    done()
}

const clean = () => del(['./dist'])

const build = () => {
    console.log('build task')
}

const css = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(dest('./dist/css/'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('./dist/css/'))
}

const watchFile = () => {
    watch(['./src/**/*.scss'], series([css, reload]))
    watch(['./**/*.html'], series([reload]))
}

const dev = series(clean, css, serve, watchFile)

exports.clean = clean
exports.default = dev

// exports.css = css
// exports.watchFile = watchFile
// exports.browserSyncInit = browserSyncInit
// exports.default = series([css, browserSyncInit])

