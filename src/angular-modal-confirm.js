/*
* angular-confirm
* https://github.com/riderx/angular-modal-confirm
* @version v1.0.0 - 2016-01-11
* @license Apache
*/

angular.module('angularModalConfirm', ['angularModalService'])
.value('$confirmModalDefaults', {
  template:
  '<div class="modal fade">' +
  '<div class="modal-dialog">' +
  '<div class="modal-content">' +
  '<div class="modal-header">' +
  '<button type="button" class="close" ng-click="cancel()" data-dismiss="modal" aria-hidden="true">&times;</button>' +
  '<h4 class="modal-title">{{data.title}}</h4>' +
  '</div>' +
  '<div class="modal-body">' +
  '<p>{{data.text}}</p>' +
  '</div>' +
  '<div class="modal-footer">' +
  '<button type="button" ng-click="ok()" class="btn btn-default" data-dismiss="modal">{{data.ok}}</button>' +
  '<button type="button" ng-click="cancel()" class="btn btn-primary" data-dismiss="modal">{{data.cancel}}</button>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</div>',
  controller: 'ConfirmModalController',
  inputs: {
    title: 'Confirm',
    ok: 'OK',
    text:'hey, are you sure ?',
    cancel: 'Cancel'
  }
})
.factory('$confirmModal', function ($confirmModalDefaults, ModalService, $q) {
  return function (data, settings) {
    var defaults = angular.copy($confirmModalDefaults);
    settings = angular.extend(defaults, (settings || {}));
    data = {data: angular.extend({}, settings.inputs, data || {})};

    if ('templateUrl' in settings && 'template' in settings) {
      delete settings.template;
    }
    settings.inputs = data;

    var deferred = $q.defer();
    ModalService.showModal(settings)
    .then(function(modal) {
      if (modal && modal.element)
      {
        modal.element.modal();
        modal.close.then(function(result) {
          if (result)
          deferred.resolve(true);
          else {
            deferred.reject(false);
          }
        });
      }
      else {
        console.log(modal);
      }
    }).catch(function(error) {
      console.log(error);
    });
    return deferred.promise;
  };
})
.controller('ConfirmModalController', function ($scope, close, data) {

  $scope.data = angular.copy(data);

  $scope.ok = function () {
    close(true, 500);
  };

  $scope.cancel = function () {
    close(false, 500);
  };

})
.directive('confirmModal', function ($confirmModal) {
  return {
    priority: 1,
    restrict: 'A',
    scope: {
      confirmIf: "=",
      ngClick: '&',
      confirmModal: '@',
      confirmSettings: "=",
      confirmTitle: '@',
      confirmOk: '@',
      confirmCancel: '@'
    },
    link: function (scope, element, attrs) {

      element.unbind("click").bind("click", function ($event) {

        $event.preventDefault();

        if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {

          var data = {text: scope.confirm};
          if (scope.confirmTitle) {
            data.title = scope.confirmTitle;
          }
          if (scope.confirmOk) {
            data.ok = scope.confirmOk;
          }
          if (scope.confirmCancel) {
            data.cancel = scope.confirmCancel;
          }
          $confirmModal(data, scope.confirmSettings || {}).then(scope.ngClick);
        } else {

          scope.$apply(scope.ngClick);
        }
      });

    }
  }
});
