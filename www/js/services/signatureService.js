angular.module('starter.services')
  .factory('SignatureService', function ($state, $http, $q, API_ENDPOINT, $storage) {

    var uploadSignatureSamples = function (samples, uuid) {
      console.log('signatures:', samples, 'UUID:', uuid);
      var q = $q.defer()
      $http.post(API_ENDPOINT.uploadSignature + uuid, samples).then(function (result) {
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

    return {
      uploadSignatureSamples: uploadSignatureSamples
    }

  });
