angular.module('starter.controllers')
  .controller('DocsCtrl', function ($scope, $rootScope, $state, Chats, $ionicTabsDelegate, AuthService, $storage,$window) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // Show the login page if the auth-login-required function is fired
    $ionicTabsDelegate.showBar(false);
    console.log('DocsCtrl- Auth? ', AuthService.isAuthenticated());
    console.log('Orientation is ' + screen.orientation.type);

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };

  })
