const { src, dest, parallel, watch } = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')

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
    watch(['./src/scss/**/*.scss'], css)
}

exports.css = css
exports.watchFile = watchFile
exports.default = build

