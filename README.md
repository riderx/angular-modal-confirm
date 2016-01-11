# angular-modal-confirm

Need help for add testing, travis and other

=====================

Modal confirme service for AngularJS - supports creating confirm modals via a service. See [a quick fiddle](https://jsfiddle.net/riderx/aa0L1xb7/) .

1. [Usage](#usage)
2. [Developing](#developing)
3. [Tests](#tests)
4. [FAQ & Troubleshooting](#faq)
5. [Thanks](#thanks)

## Usage

First, install with Bower:

```
bower install angular-modal-confirm
```


Then reference the minified script:

```html
<script src="bower_components/angular-modal-confirm/src/angular-modal-confirm.js"></script>
```

Specify the modal service as a dependency of your application:

```js
var app = angular.module('sampleapp', ['angularModalConfirm']);
```

Now just inject the modal service into any controller, service or directive where you need it.

```js
app.controller('SampleController', function($scope, $confirmModal) {
  var isConfirm = false;

  $scope.confirmMe = function() {

  	$confirmModal({text: 'Hello modal confirm:)'})
      .then(function() {
      // do your thing if it's confirm
      isConfirm = false;
      });

  };

});
```

Calling `$confirmModal` returns a promise which is resolved when the modal DOM element is created
and the controller for it is created.

```
#### $confirm Options

The `$confirm` function takes an object with these fields:

$confirmModal([data], [settings])

* `data`: Data to be used by the modal template/templateUrl. Referenced with "data.". The keys "title", "ok", and "cancel" can be used to change the labels used in the modal.

* `settings`: Settings that will be passed to [angularModalService](https://github.com/dwmkerr/angular-modal-service)

* `controller`: The name of the controller to created. It could be a function.
* `controllerAs` : The name of the variable on the scope the controller is assigned to - (optional).
* `templateUrl`: The URL of the HTML template to use for the modal.
* `template`: If `templateUrl` is not specified, you can specify `template` as raw
  HTML for the modal.
* `inputs`: A set of values to pass as inputs to the controller. Each value provided
  is injected into the controller constructor.
* `appendElement`: The custom angular element to append the modal to instead of default `body` element.


## FAQ


## Thanks

Thanks go the the following contributors:

* [dwmkerr](https://github.com/dwmkerr) - Creator of the modal service.
* [Schlogen](https://github.com/Schlogen) - Inspired of is confirm service with modal UI.
