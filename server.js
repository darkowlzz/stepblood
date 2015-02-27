'use strict';

var express = require('express'),
    router  = express.Router(),
    db      = require('./db');

var app = express();
app.use('/', express.static(__dirname + '/app/'));
app.set('json spaces', 2);

router.get('/search/:keyword', function (req, res) {
  console.log('Got req');
  var keyword = req.params.keyword;
  console.log('query string:', keyword);
  db.search(keyword).then(function (result) {
    console.log('result:', result);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
});

router.get('/search/:name/:group', function (req, res) {
  console.log('got find req');
  var query = "value.Name:" + req.params.name + " AND " +
              "value.Group:" + req.params.group;
  console.log('query string:', query);
  db.search(query).then(function (result) {
    console.log('result:', result);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  })
});

router.get('/', function (req, res) {
  res.render('/index.html');
})

app.use('/', router);

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Visit %d', server.address().port);
});
