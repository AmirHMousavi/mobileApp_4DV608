angular.module('starter.controllers')
/**
 * Login Controller, this controller is responsible for Login and Logout functions
 * re-directs app to registration form & check if user is logged in
 */
  .controller('LoginCtrl', function ($scope, AuthService, $ionicPopup, $state, $ionicTabsDelegate, SignatureService) {
    $ionicTabsDelegate.showBar(false);
    $scope.user = {};

    /**
     * re-directs app to registration form
     */
    $scope.goregister = function () {
      $state.go('tab.register');
    };

    /**
     * Login function
     */
    $scope.login = function () {
      // create a new object based on the format that API accepts
      var outputObj = {
        'user': {
          'email': $scope.user.email,
          'password': $scope.user.password
        }
      };
      var user = JSON.stringify(outputObj);
      AuthService.login(user).then(function (loginResponse) {
        SignatureService.checkSigSampleProvided(loginResponse.uuid).then(function (sigSampleResponse) {
          $state.go('tab.docs');
        }, function (errSigSampleResponse) {
          $ionicPopup.alert({
            title: 'Signature Errors',
            template: errSigSampleResponse.error + ', You should provide signature samples!',
            okText: 'Go!'
          }).then(function () {
            $state.go('tab.sigsample')
          })
        })
      }, function (errLoginResponse) {
        $ionicPopup.alert({
          title: 'Login failed!',
          template: errLoginResponse
        });
        $scope.user = {};
        $scope.$$childTail.theloginForm.$setPristine();
      });
    };
    $scope.isLoggedIn = function () {
      return AuthService.isAuthenticated();
    };
    $scope.logout = function () {
      console.log('logout')
      AuthService.logout();
      $state.go('tab.login');
    }
  });
