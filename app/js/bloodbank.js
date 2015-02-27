angular.module('bloodbank', [])
  .controller('searchCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.results = [];

    $scope.search = function () {
      var word = $scope.keyword;
      console.log('searching for ' + word);
      var query = '/search/' + word;
      console.log(query);
      $http.get(query)
        .success(function (data, status, headers, config) {
          $scope.results = data;
        });
    }
  }]);
