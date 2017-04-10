angular.module('starter.controllers')
  .controller('LoginCtrl', function ($scope, AuthService, $ionicPopup, $state, $ionicTabsDelegate) {
    $ionicTabsDelegate.showBar(false);
    $scope.user = {};


    $scope.goregister = function () {
      $state.go('tab.register');
    };

    $scope.login = function () {
      var outputObj = {
        'user': {
          'email': $scope.user.email,
          'password': $scope.user.password
        }
      };
      var user = JSON.stringify(outputObj);
      AuthService.login(user).then(function (msg) {
        $state.go('tab.docs');
      }, function (errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
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
