const express = require('express');
const router = express.Router();
const pages = require('../utils/constants/page-attributes');

Object.keys(pages).forEach((template) => {
  const { title, paths } = pages[template];
  paths.forEach((path) => {
    router.get(path, (req, res) => {
      res.render(`pages/${template}`, { title });
    });
  });
});

module.exports = router;
