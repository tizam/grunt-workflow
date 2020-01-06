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
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')

// reload function
const reload = (done) => {
    server.reload()
    done()
}

// browserSync init server
const serve = (done) => {
    server.init({
        server: './',
    })
    done()
}

// clean the dist folder
const clean = () => del(['./dist'])

// css task
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

// js task
const js = () => {
    return src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./dist/js/'))
}

// image task
const image = () => {
    return src('./src/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('./dist/images/'))
}

// watch file task
const watchFile = () => {
    watch(['./src/**/*.scss'], series([css, reload]))
    watch(['./**/*.html'], series([reload]))
    watch(['./src/**/*.js'], series([js, reload]))
    watch(['./src/**/*.png', './src/**/*.jpg', './src/**/*.svg', './src/**/*.jpeg'], series([image, reload]))
}

// default dev function
const dev = series(clean, parallel([css, js, image]), serve, watchFile)

// export functions
exports.image = image
exports.clean = clean
exports.default = dev