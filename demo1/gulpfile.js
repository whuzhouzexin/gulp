const rename = {
  "gulp-clean-css": "cleanCss"
}
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const gulpSequence = require("gulp-sequence");
const del = require("del");
const browserSync = require("browser-sync");
const reload  = browserSync.reload;
// 样式的处理:一般包括编译，监听报错，autoprefix 压缩css，合并css
gulp.task("styles", function() {
  return gulp.src("./static/css/*.scss").
  pipe($.sass()).on("error", $.sass.logError).
    pipe($.cleanCss()).pipe(gulp.dest("./build")).pipe(reload({
      stream: true
    }));
});
//删除目录
gulp.task("del", function() {
  return del(["./build"]);
});
// html一般包括css合并,image压缩,压缩html
gulp.task("html", function() {
  return gulp.src("./static/html/*.html").
    pipe($.htmlmin()).pipe(gulp.dest("./build")).
    pipe(reload({stream: true}));
});

gulp.task("server", function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [ 'build']
    }
  })
});
gulp.task("default", function() {
  gulpSequence("del", "styles", "html", "server")(function(err){
    if (err) {
      console.log(err)
    };
  });
})