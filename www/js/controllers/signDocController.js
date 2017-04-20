angular.module('starter.controllers')
  /**
   * Sign Document Controller, this controller is responsibl for signing the documents
   */
  .controller('SignDocumentCtrl', function ($scope, $stateParams, $state, $ionicTabsDelegate, RequestService, $ionicPopup) {
    $ionicTabsDelegate.showBar(false);
    $scope.docId = $stateParams.docId;

    /**instantiate a canvas that will hold the signatures */
    var canvas = document.getElementById('sigCanvas2')
    $scope.dev_width = canvas.offsetWidth;
    $scope.dev_height = canvas.offsetHeight;
    var signaturePad = new SignaturePad(canvas);

    $scope.warningText = undefined;
    $scope.clearCanvas = function () {
      signaturePad.clear();
    }

    /**
     * calling Signature Service to send signature array of vectors to API
     */
    $scope.sendSignature = function () {
      if (signaturePad.isEmpty()) {
        $scope.warningText = "Please Provide Signature";
      } else {
        $scope.warningText = undefined;
        let sig = signaturePad.toData();
        console.log('the signature',sig)
        var outObj = {
          "signature": sig
        };
        var signature = JSON.stringify(outObj);
        RequestService.signDocument($scope.docId, signature).then(function (msg) {
          $ionicPopup.alert({
            title: 'Signature Sucess!',
            template: 'you signed the document with ID ' + $scope.docId
          }).then($state.go('tab.docs'))
        }, function (errMsg) {
          $ionicPopup.alert({
            title: 'Failure!',
            template: errMsg.error + ', signature does not match samples'
          }).then($scope.clearCanvas())
        });
      }
    }
  })
