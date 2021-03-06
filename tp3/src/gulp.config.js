/**
 * Gulp Configuration File
 **/

module.exports = {
    paths: {
        src: {
            html: "./src/*.html",
            favicon: "./src/assets/img/favicon/favicon.ico",
            img: "./src/assets/img/*.*",
            css: "./src/assets/css/style.css",
            data: "./src/data/*.json",
            singletons: "./src/assets/scripts/singletons/*.js",
            scripts: "./src/assets/scripts/*.js",
            vendors: "./src/assets/vendors/*.js",
        },
        dest: {
            html: "/",
            favicon: "/",
            img: "/img",
            css: "/css",
            data: "/data",
            singletons: "/js",
            scripts: "/js",
            vendors: "/js",
        },
        dist: "./dist",
    },
    PORT: 8000,
    BROWSERS_LIST: [
        "last 2 version",
        "> 1%",
        "ie >= 11",
        "last 1 Android versions",
        "last 1 ChromeAndroid versions",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Safari versions",
        "last 2 iOS versions",
        "last 2 Edge versions",
        "last 2 Opera versions",
    ],
};
