angular.module('starter.controllers')
/**
 * Signature Sampling Controller, this controller is responsible for taking FIVE signature samples from user, after registration
 */
  .controller('SigSampleCtrl', function ($scope, $state, $ionicPopup, SignatureService, AuthService, $ionicTabsDelegate) {
    $ionicTabsDelegate.showBar(false);
    /**Canvas instantiation  */
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

    $scope.clearCanvas = function () {
      signaturePad.clear();
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
  });
