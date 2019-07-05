// 加载gulp
const gulp = require('gulp');
//加载gulp-load-plugins插件，并马上运行它
const plugins = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

const paths = {
  pug: {
    src: 'src/index.pug',
    dest: 'dist/',
    watch: 'src/index.pug'
  },
  img: {
    src: 'src/assets/**/*',
    dest: 'dist/assets/',
    watch: 'src/assets/**/*'
  }
};

// 启动 browserSync 服务，自己启动server，并且为浏览器实时刷新提供服务
gulp.task('browserSync', () => {
  return browserSync.init({
    server: {
      baseDir: './dist'
    },
    files: './dist'
  });
});

gulp.task('pug', () => {
  return gulp
    .src(paths.pug.src) // 传入管道的文件
    .pipe(plugins.plumber())
    .pipe(
      plugins.pug({
        pretty: true // 默认为false，表示是否美化HTML
      })
    )
    .pipe(gulp.dest(paths.pug.dest)); // dest:destination
});

// 复制img文件
gulp.task('img', () => {
  return gulp.src(paths.img.src).pipe(gulp.dest(paths.img.dest));
});

gulp.task('watch', () => {
  gulp.watch(paths.pug.watch, gulp.parallel('pug'));
  gulp.watch(paths.img.watch, gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('watch', 'browserSync', 'pug', 'img'));
