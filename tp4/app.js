const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

require("dotenv").config();

require("./lib/db");
const index = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

if (process.env.NODE_ENV !== "test") {
    app.use(logger("dev"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "public")));

// initialize the session
app.use(
    session({
        secret: "log4420",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

app.use("/", index);

/**
 * @typedef {Error & {status?: number}} ErrWithStatus
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    /**
     * @type {ErrWithStatus}
     */
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(
    /**
     * @param {ErrWithStatus} err
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     * @param {import("express").NextFunction} next
     */
    (err, req, res, next) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render("error");
    }
);

module.exports = app;
