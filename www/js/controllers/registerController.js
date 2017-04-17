  angular.module('starter.controllers')
    /**
     * Registration Controller, this controller is responsibl for registering a new user and re-direct the app to take signature samples
     */
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
        if ($scope.user.password === $scope.user.password_c) {
          var outputObj = {
            'user': {
              'email': $scope.user.email,
              'password': $scope.user.password
            }
          };
          var user = JSON.stringify(outputObj);

          AuthService.register(user).then(function (response) {
            $ionicPopup.alert({
              title: 'Register success!',
              template: "New Users Should Provide Signature Samples",
              okText: 'Go!'
            }).then(function () {
              $state.go('tab.sigsample');
            })
          }, function (errResponse) {
            $ionicPopup.alert({
              title: 'Register failed!',
              template: errResponse
            });
            $scope.user = {};
            $scope.$$childTail.regForm.$setPristine();
          });
        } else {
          $ionicPopup.alert({
            title: 'Register Failed!',
            template: 'passwords does not match'
          })
        }
      };
    })

    /** a directive to check password and password-confirm on realtime (before submit) 
     * for any potential missmatch, passwords are checked on submit as well.
    */
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
