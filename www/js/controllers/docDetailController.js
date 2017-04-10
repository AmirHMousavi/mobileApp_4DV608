angular.module('starter.controllers')
.controller('DocDetailCtrl', function($scope, $stateParams,$ionicTabsDelegate, Chats) {
  $ionicTabsDelegate.showBar(false);
  console.log($stateParams.docId);
  $scope.chat = Chats.get($stateParams.docId);


  
})