angular.module('bloodbank', [])
  .controller('searchCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.results = [];
    $scope.groups = [
      { label: 'Any group', value: 'any'},
      { label: 'A+', value: '`A+`'},
      { label: 'A-', value: '`A-`'},
      { label: 'B+', value: '`B+`'},
      { label: 'B-', value: '`B-`'},
      { label: 'AB+', value: '`AB+`'},
      { label: 'O+', value: '`O+`'}
    ];
    $scope.selectedGroup = $scope.groups[0];

    $scope.search = function () {
      var word = $scope.keyword;
      var query = '/search/';
      console.log('word is', word);
      if (! _.isUndefined(word)) {
        query += word + '/';
      }
      if ($scope.selectedGroup.value != 'any') {
        query += $scope.selectedGroup.value;
      }
      console.log('querying ' + query);
      $http.get(query)
        .success(function (data, status, headers, config) {
          $scope.results = data;
        });
    }
  }]);
