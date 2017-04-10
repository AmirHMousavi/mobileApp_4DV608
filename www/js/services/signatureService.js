angular.module('starter.services')
  .factory('SignatureService', function ( $state, $http, $q, API_ENDPOINT, $storage, AuthService) {
    if (!AuthService.isAuthenticated()) {
      $state.go('tab.login')
    }
    var token = $storage.getItem('authToken');
    var uuid = $storage.getItem('user-uuid');

    var uploadSignatureSamples = function (samples) {
      var q = $q.defer()

      $http.post(API_ENDPOINT.uploadSignature+uuid, samples, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(function (result) {
        if (result.status === 200) {
          q.resolve(result.data);
        } else {
          q.reject(result.data);
        }

      }, function (result) {
        q.reject(result.data);
      })
      return q.promise;
    }

    return{
        uploadSignatureSamples:uploadSignatureSamples
    }

  });
