angular.module('starter.services')
  .factory('SignatureService', function ($state, $http, $q, API_ENDPOINT, $storage) {

    /**
     * uploadSignatureSamples : Gets signature samples array from controller and POST to API with users uuid as URL parameter
     * @param {JSON} samples 
     * @param {String} uuid 
     */
    var uploadSignatureSamples = function (samples, uuid) {
      console.log('sig samples raw:', samples, 'UUID:', uuid);
      var q = $q.defer()
      $http.post(API_ENDPOINT.uploadSignature + uuid, samples).then(function (response) {
        console.log('upload sig samples success',response)
        q.resolve(response.data);
      }, function (errResponse) {
        console.log('upload sig samples fail',errResponse)
        q.reject(errResponse.data);
      })
      return q.promise;
    }

    /**
     * uploadSignature : gets signature JSON object from controller and POST to API with document ID as URL parameter
     * @param {JSON} signature 
     * @param {String} id 
     */
    var uploadSignature = function (signature, id) {
      console.log('upload 1 sig raw:', signature, 'docID:', id);
      var q = $q.defer();
      $http.post(API_ENDPOINT.signRequest + id, signature).then(function (response) {
        console.log('upload 1 sig success',response)
        q.resolve(response.data)
      }, function (errResponse) {
        console.log('upload 1 sig fail',errResponse)
        q.reject(errResponse.data)
      });
      return q.promise;
    }

    /**
     * checkSigSampleProvided : checks if a registerd user has already provided signature samples or not
     * @param {String} uuid 
     */
    var checkSigSampleProvided = function (uuid) {
      console.log('check if sig sample providdeed')
      var q = $q.defer();
      $http.get(API_ENDPOINT.uploadSignature + uuid).then(function (response) {
        console.log('check sig sample provided success',response)
        q.resolve(response.data)
      }, function (errResponse) {
        console.log('check sig sample provided fail',errResponse)
        q.reject(errResponse.data)
      });
      return q.promise;
    }

    return {
      uploadSignatureSamples: uploadSignatureSamples,
      uploadSignature: uploadSignature,
      checkSigSampleProvided: checkSigSampleProvided
    }

  });
