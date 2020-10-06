const gulp = require("gulp");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const lineec = require("gulp-line-ending-corrector");
const remember = require("gulp-remember");
const rename = require("gulp-rename");
const connect = require("gulp-connect");
const uglify = require("gulp-uglify");

const {
    paths: { src, dest, dist },
    BROWSERS_LIST,
    PORT,
} = require("./gulp.config.js");

const STATIC_FILE_TYPES = ["html", "css", "data", "img", "favicon"];
const JS_FILE_TYPES = ["vendors", "scripts"];

STATIC_FILE_TYPES.forEach((type) => {
    gulp.task(type, function (done) {
        gulp.src(src[type])
            .pipe(gulp.dest(`${dist}${dest[type]}`))
            .pipe(connect.reload());
        done();
    });
});

JS_FILE_TYPES.forEach((type) => {
    gulp.task(type, (done) => {
        gulp.src(src[type], { since: gulp.lastRun(type) })
            .pipe(
                babel({
                    presets: [
                        // @ts-ignore
                        [
                            "@babel/preset-env",
                            {
                                targets: { browsers: BROWSERS_LIST },
                            },
                        ],
                    ],
                })
            )
            .pipe(remember(src[type]))
            .pipe(concat(`${type}.js`))
            .pipe(lineec())
            .pipe(gulp.dest(`${dist}${dest[type]}`))
            .pipe(
                rename({
                    basename: type,
                    suffix: ".min",
                })
            )
            .pipe(uglify())
            .pipe(lineec())
            .pipe(gulp.dest(`${dist}${dest[type]}`))
            .pipe(connect.reload());
        done();
    });
});

gulp.task("connect", function () {
    connect.server({
        root: "dist",
        port: PORT,
        livereload: true,
    });
});

gulp.task("watch", function () {
    [...STATIC_FILE_TYPES, ...JS_FILE_TYPES].forEach((fileType) => {
        gulp.watch(src[fileType], gulp.task(fileType));
    });
});

gulp.task(
    "default",
    gulp.parallel([...STATIC_FILE_TYPES, ...JS_FILE_TYPES, "connect", "watch"])
);
