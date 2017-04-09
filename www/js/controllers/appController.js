angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($rootScope, $scope, $state, AuthService) {
    console.log('AppCtrl- Auth? ',AuthService.isAuthenticated());
    AuthService.loadUserCredentials();
    if (!AuthService.isAuthenticated()) {
      $state.go('tab.login');
    }

  });
