(function(angular, undefined){
  "use strict";

  angular.module('demoApp', [
    'angularModalConfirm'
  ])
  .controller('GreetingController', function ($scope, $confirmModal) {
    $scope.name = "jean claude";

    $scope.delete = function() {
       $confirmModal({text: 'Are you sure you want to delete?'})
       .then(function() {
         $scope.message = 'Deleted';
       });
    }

  });

})(angular);
