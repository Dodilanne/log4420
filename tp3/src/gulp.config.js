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
            scripts: "./src/assets/scripts/*.js",
            vendors: "./src/assets/vendors/jquery-3.2.1.min.js",
        },
        dest: {
            html: "/",
            favicon: "/",
            img: "/img",
            css: "/css",
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
