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
  '<div class="modal-header"> {{data.title}}' +
  '<button type="button" class="close" ng-click="cancel()" data-dismiss="modal" aria-hidden="true">&times;</button>' +
  '<h4 class="modal-title">Yes or No?</h4>' +
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
    cancel: 'Cancel'
  }
})
.factory('$confirm', function ($modal, $confirmModalDefaults, ModalService, $q) {
  return function (data, settings) {
    var defaults = angular.copy($confirmModalDefaults);
    settings = angular.extend(defaults, (settings || {}));

    data = angular.extend({}, settings.defaultLabels, data || {});

    if ('templateUrl' in settings && 'template' in settings) {
      delete settings.template;
    }

    settings.resolve = {
      data: function () {
        return data;
      }
    };

    var deferred = $q.defer();
    ModalService.showModal(settings)
    .then(function(modal) {
      modal.element.modal();
      modal.close.then(function(result) {
        if (result)
        deferred.resolve(true);
        else {
          deferred.reject(false);
        }
      });
    });
    return deferred.promise;
  };
})
.controller('ConfirmModalController', function ($scope, close, title, ok, cancel) {

  $scope.data = {};
  $scope.data.title = angular.copy(title);
  $scope.data.ok = angular.copy(ok);
  $scope.data.cancel = angular.copy(cancel);

  $scope.ok = function () {
     close(true, 500);
  };

  $scope.cancel = function () {
     close(false, 500);
  };

})
.directive('confirm', function ($confirm) {
  return {
    priority: 1,
    restrict: 'A',
    scope: {
      confirmIf: "=",
      ngClick: '&',
      confirm: '@',
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
          $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
        } else {

          scope.$apply(scope.ngClick);
        }
      });

    }
  }
});
