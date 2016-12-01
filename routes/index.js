var express = require('express');
var router = express.Router();


module.exports = (app) => {
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router
}

