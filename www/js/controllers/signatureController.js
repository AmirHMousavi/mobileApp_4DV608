angular.module('starter.controllers')
  /**
   * Sign Document Controller, this controller is responsibl for signing the documents
   */
  .controller('SignatureCtrl', function ($scope, $state, $stateParams, $ionicTabsDelegate, RequestService, SignatureService, AuthService, $ionicPopup) {
    $ionicTabsDelegate.showBar(false);
    if ($stateParams.docId) {
      $scope.docId = $stateParams.docId;
    }

    /**instantiate a canvas that will hold the signatures */
    var canvas = document.getElementById('sigCanvas')
    $scope.dev_width = canvas.offsetWidth;
    $scope.dev_height = canvas.offsetHeight;
    var signaturePad = new SignaturePad(canvas);

    var signatures = [];
    var uuid = null;
    $scope.pag_i = 0;
    $scope.pag_t = 5;
    $scope.saveButton = 'NEXT';
    $scope.warningText = undefined;

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

    $scope.sendSamples = function () {
      if (AuthService.isAuthenticated()) {
        uuid = AuthService.getUUID();
      }
      if (signaturePad.isEmpty()) {
        $scope.warningText = "Please Provide Signature";
      } else {
        $scope.warningText = undefined;
        let signature = signaturePad.toData();
        signaturePad.clear();
        signatures.push(signature);
        $scope.pag_i = signatures.length;
        if (signatures.length === 4) {
          $scope.saveButton = 'FINISH'
        }
        if (signatures.length >= 5) {
          /**the signatures array JSON object format that API accepts */
          var outputObj = {
            'user': {
              'signatures': signatures
            }
          };
          var signaturesObj = JSON.stringify(outputObj);
          SignatureService.uploadSignatureSamples(signaturesObj, uuid).then(function (response) {
            $ionicPopup.alert({
              title: 'Congratulations!',
              template: 'Yours Signatures are sampled' + response
            }).then(function () {
              $state.go('tab.docs');
            });
          }, function (errResponse) {
            $ionicPopup.alert({
              title: 'Failure!',
              template: errResponse
            })
            $scope.pag_i = 0;
            $scope.pag_t = 5;
            $scope.saveButton = 'NEXT';
            $scope.warningText = undefined;
          });
        }
      }

    }
  })
