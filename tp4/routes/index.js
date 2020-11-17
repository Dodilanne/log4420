const express = require("express");
const router = express.Router();
const pages = require("../utils/constants/page-attributes");

Object.keys(pages).forEach((template) => {
    const { title, paths, additionalScripts } = pages[template];
    paths.forEach((path) => {
        router.get(path, (_req, res) => {
            res.render(`pages/${template}`, {
                title,
                additionalScripts,
                pageName: template,
            });
        });
    });
});

module.exports = router;
