const { src, dest, parallel, watch } = require('gulp')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')

const build = () => {
    console.log('build task')
}

const css = () => {
    return src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(dest('./dist/css/'))
}

const watchFile = () => {
    watch(['./src/scss/**/*.scss'], css)
}

exports.css = css
exports.watchFile = watchFile
exports.default = build

