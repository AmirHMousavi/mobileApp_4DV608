angular.module('starter.controllers')
  .controller('SignatureCtrl', function ($scope, $state) {

    var canvas = document.getElementById('sigCanvas')
    var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
    var physicalScreenHeight = window.screen.height * window.devicePixelRatio;
    $scope.dev_width = canvas.offsetWidth;
    $scope.dev_height = canvas.offsetHeight;
    var signaturePad = new SignaturePad(canvas);
    var signatures = [];
    $scope.pag_i = 0;
    $scope.pag_t = 5;
    $scope.disableSave=true;
/*    if ($state.current.name == 'tab.sample') {
      $scope.pag_t = 5;
    } */
    $scope.clearCanvas = function () {
      signaturePad.clear();
    }

    $scope.saveCanvas = function () {
      if (signaturePad.isEmpty()) {
        $scope.signatureText = "Please Provide Signature";
      } else if ($state.current.name == 'tab.signature') {
        let signature = signaturePad.toData();
        ServerService.signRequest(signature);
      } else {
        let signature = signaturePad.toData();
        signaturePad.clear();
        signatures.push(signature);
        $scope.pag_i = signatures.length;
        if (signatures.length >= 5) {
          ServerService.uploadSignature(signatures).then(function () {
            $ionicPopup.alert({
              title: 'Congratulations!',
              template: 'You have been registered to the server'
            });
            $state.go('tab.signature');
          });
        }
      }
    }
  });
