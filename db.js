try {
  var dbToken = process.env.dbToken || require('./config').token;
} catch (e) {
  console.log(e);
}
var Q = require('q');
var db = require('orchestrate')(dbToken);

function search (keyword) {
  console.log('searching', keyword);
  var deferred = Q.defer();
  db.search('bloodbank', keyword)
    .then(function (res) {
      var resp = [];
      res.body.results.forEach(function (r) {
        resp.push(r.value);
      });
      deferred.resolve(resp);
    });
  return deferred.promise;
}
exports.search = search;
