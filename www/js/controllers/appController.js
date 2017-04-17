angular.module('starter.controllers', [])
  /**
   * The main App Controller, this controller using Authentication service to check if any logged in user exists
   */
  .controller('AppCtrl', function ($scope, $state, AuthService) {
    console.log('AppCtrl- Auth? ', AuthService.isAuthenticated());
    AuthService.loadUserCredentials();
    if (!AuthService.isAuthenticated()) {
      $state.go('tab.login');
    }
  });
