  angular.module('starter.controllers')
    .controller('RegisterCtrl', function ($scope, $state, AuthService, $ionicPopup, $ionicTabsDelegate) {
      $ionicTabsDelegate.showBar(false);
      $scope.user = {};

      $scope.goBackToLogin = function () {
        $state.go('tab.login')
      }
      $scope.toSigSample = function () {
        $state.go('tab.sigsample');
      }

      $scope.signup = function () {
        // create a new object based on the format that API accepts
        var outputObj = {
          'user': {
            'email': $scope.user.email,
            'password': $scope.user.password
          }
        };
        // create new JSON output
        var user = JSON.stringify(outputObj);

        AuthService.register(user).then(function (msg) {
          $ionicPopup.alert({
            title: 'Register success!',
            template: "New Users Should Provide Signature Samples",
            okText: 'Go!'
          }).then(function (res) {
            $state.go('tab.sigsample');
          })
        }, function (errMsg) {
          var alertPopup = $ionicPopup.alert({
            title: 'Register failed!',
            template: errMsg
          });
          $scope.user = {};
          $scope.$$childTail.regForm.$setPristine();
        });
      };
    })
    .directive('validPasswordC', function () {
      return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
          ctrl.$parsers.unshift(function (viewValue, $scope) {
            var noMatch = viewValue != scope.regForm.password.$viewValue
            ctrl.$setValidity('noMatch', !noMatch);
            return viewValue;
          })
        }
      }
    });
