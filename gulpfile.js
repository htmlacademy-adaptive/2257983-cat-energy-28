import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import { stacksvg } from "gulp-stacksvg";
import {deleteAsync} from 'del';

// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([
  autoprefixer(),
  csso()
  ]))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
  .pipe(browser.stream());
}

//HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Scripts

const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
}

//Images

const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
  }

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(gulp.dest('build/img'));
  }

//WebP

const webp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh({
    webp: {}
    }))
  .pipe(gulp.dest('build/img'));
}

//SVG

const svg = () => {
  return gulp.src('source/img/**/*.svg')
  .pipe(svgmin())
  .pipe(gulp.dest('build/img'));
}

const svgsprite = () => {
  return gulp.src('source/img/**/*.svg')
  .pipe(svgmin())
  .pipe(stacksvg({
      output: 'sprite.svg'
  }))
  .pipe(gulp.dest('build/img/'));
}

//Copy

const copy = (down) => {
  return gulp.src([
    'source/fonts/**/*.{woff,woff2}',
    'source/*.ico',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

//delete

const clean = () => {
  return deleteAsync('build');
  };

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html').on('change', browser.reload);
}

//Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel (
    styles,
    html,
    scripts,
    svg,
    svgsprite,
    webp
  )
)

//Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel (
    styles,
    html,
    scripts,
    svg,
    svgsprite,
    webp
  ),
  gulp.series(
    server,
    watcher
));
