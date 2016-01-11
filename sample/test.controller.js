(function(angular, undefined){
  "use strict";

  angular.module('demoApp', [
    'angularModalService',
    'angularModalConfirm'
  ])
  .controller('GreetingController', function ($scope, $confirm) {
    $scope.name = "jean claude";

    $scope.delete = function() {
      $confirm({text: 'Are you sure you want to delete?'})
      .then(function() {
        console.log('ici');
        $scope.message = 'Deleted';
      });
    }


  });

})(angular);
