angular.module('starter.controllers')
  .controller('DocDetailCtrl', function ($scope, $stateParams, $ionicTabsDelegate, Chats, SignatureService, $ionicPopup) {
    $ionicTabsDelegate.showBar(false);
    console.log($stateParams.docId);
    $scope.chat = Chats.get($stateParams.docId);
    var docId ='' //Documents.get($stateParams.docId)

    var canvas = document.getElementById('sigCanvas')
    $scope.dev_width = canvas.offsetWidth;
    $scope.dev_height = canvas.offsetHeight;
    var signaturePad = new SignaturePad(canvas);
    $scope.warningText = undefined;

        $scope.clearCanvas = function () {
      signaturePad.clear();
    }

    $scope.sendSignature = function () {
      if (signaturePad.isEmpty()) {
        $scope.signatureText = "Please Provide Signature";
      } else {
        let signature = signaturePad.toData();
        SignatureService.uploadSignature(signature, docId).then(function (msg) {
          $ionicPopup.alert({
            title: 'Signature Sucess!',
            template: 'you signed the document' + docId
          })
        }, function (errMsg) {
          $ionicPopup.alert({
            title: 'Failure!',
            template: errMsg
          })
        });
      }
    }
  })
