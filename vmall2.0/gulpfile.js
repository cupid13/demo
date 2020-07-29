const gulp = require("gulp");
const htmlmin = require("gulp-htmlmin");
gulp.task("copy-html", function () {
  return gulp
    .src("*.html")
    .pipe(
      htmlmin({
        removeEmptyAttibutes: true, // 移出所有空属性
        collapseWhitespace: true, // 压缩 html
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});

//处理图片
gulp.task("images", function () {
  return gulp
    .src("img/*.{jpg,png}")
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
});

//处理js代码，凡是用第三方框架js，不要压缩
gulp.task("scripts", function () {
  return gulp
    .src(["js/*.js", "!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
});

//处理数据
gulp.task("data", function () {
  return gulp
    .src(["*.json", "!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
});
gulp.task("php", function () {
  return gulp
    .src("*.php")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
});

const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
//如果要压缩css代码，一个scss一个任务
gulp.task("login", function () {
  return gulp
    .src("css/login.css")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("index", function () {
  return gulp
    .src("css/index.css")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("Details", function () {
  return gulp
    .src("css/Details.css")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("Details.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("car", function () {
  return gulp
    .src("css/car.css")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("car.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});
gulp.task("list", function () {
  return gulp
    .src("css/list.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("list.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
});

//build任务
gulp.task(
  "build",
  ["copy-html", "images", "scripts", "data","php","index", "Details","car","list","login"],
  function () {
    console.log("项目建立成功");
  }
);

//建立服务器  添加监听
gulp.task("watch", function () {
  gulp.watch("*.html", ["copy-html"]);
  gulp.watch("img/*.{jpg,png}", ["images"]);
  gulp.watch("*.php", ["php"]);
  gulp.watch(["js/*.js", "!gulpfile.js"], ["scripts"]);
  gulp.watch(["*.json", "!package.json"], ["data"]);
  gulp.watch("css/login.css", ["login"]);
  gulp.watch("css/index.css", ["index"]);
  gulp.watch("css/Details.css", ["Details"]);
  gulp.watch("css/car.css", ["car"]);
  gulp.watch("css/list.scss", ["list"]);
});

const connect = require("gulp-connect");
gulp.task("server", function () {
  connect.server({
    root: "dist",
    port: 8888,
    livereload: true,
  });
});

//同时启动
gulp.task("default", ["watch", "server"]);
