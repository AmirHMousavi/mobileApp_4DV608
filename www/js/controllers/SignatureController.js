angular.module('starter.controllers')
  .controller('SignatureCtrl', function ($scope, $state,$ionicPopup,SignatureService) {

    var canvas = document.getElementById('sigCanvas')
    $scope.dev_width = canvas.offsetWidth;
    $scope.dev_height = canvas.offsetHeight;
    var signaturePad = new SignaturePad(canvas);
    var signatures = [];
    $scope.pag_i = 0;
    $scope.pag_t = 5;
    $scope.disableSave = true;
    $scope.saveButton = 'NEXT';
    $scope.warningText = undefined;
    /*    if ($state.current.name == 'tab.sample') {
          $scope.pag_t = 5;
        } */
    $scope.clearCanvas = function () {
      signaturePad.clear();
    }
    $scope.sendSamples = function () {
      if (signaturePad.isEmpty()) {
        $scope.warningText = "Please Provide Signature";
      } else {
        let signature = signaturePad.toData();
        signaturePad.clear();
        signatures.push(signature);
        $scope.pag_i = signatures.length;
        if (signatures.length === 4) {
          $scope.saveButton = 'FINISH'
        }
        if (signatures.length >= 5) {
          SignatureService.uploadSignatureSamples(signatures).then(function (msg) {
            $ionicPopup.alert({
              title: 'Congratulations!',
              template: 'Yours Signatures are sampled'
            }).then(function () {
              $state.go('tab.docs');
            });
          }, function (errMsg) {
            $ionicPopup.alert({
              title: 'Failure!',
              template: 'errMsg'
            })
            $scope.pag_i = 0;
            $scope.pag_t = 5;
            $scope.saveButton = 'NEXT';
            $scope.warningText = undefined;
          });
        }
      }

    }

    $scope.sendSignature = function () {
      if (signaturePad.isEmpty()) {
        $scope.signatureText = "Please Provide Signature";
      } else {
        let signature = signaturePad.toData();
        SignatureService.uploadSignature(signature).then(function (msg) {}, function (errMsg) {});
      }
    }
  });
