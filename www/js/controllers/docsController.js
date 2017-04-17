angular.module('starter.controllers')
  /**
   * Documents Controller, this controller fetchs all documents ready to be signed from server
   */
  .controller('DocsCtrl', function ($scope, RequestService, $timeout, $ionicTabsDelegate, $ionicPopup) {

    $ionicTabsDelegate.showBar(false);
    $scope.allDocuments = {}
    var timer;

    $scope.getAllDocs = function () {
      RequestService.getAllDocuments().then(function (response) {
        if(!angular.equals($scope.allDocuments,response.requests)){
        $scope.allDocuments = response.requests;}
      }, function (response) {
        $ionicPopup.alert({
          title: 'Erro',
          template: response
        })
      });
    };

    // Function to replicate setInterval using $timeout service.
    $scope.intervalFunction = function () {
      timer = $timeout(function () {
        $scope.getAllDocs();
        $scope.intervalFunction();
      }, 3000)
    };

    // Kick off the interval
    $scope.$on('$ionicView.enter', function () {
      console.log('entered the docs view')
      $scope.getAllDocs();
      $scope.intervalFunction();
    })

    $scope.$on('$ionicView.beforeLeave', function () {
      console.log('left the Docs view')
      // Make sure that the interval is destroyed too
      $timeout.cancel(timer)
    });

  })
