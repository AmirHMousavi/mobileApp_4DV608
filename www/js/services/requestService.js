angular.module('starter.services', [])

.factory('RequestService', function($q,$http,API_ENDPOINT, $storage,$rootScope) {
  // Might use a resource here that returns a JSON array

  return {
    getAllDocuments: function(){
      var q = $q.defer();
      $http.get(API_ENDPOINT.checkForRequests).then(function(response){
       console.log('get doc succress',response);
        q.resolve(response.data);
      },function(errResponse){
       console.log('get docs fail',errResponse);
        q.reject(errResponse.data);
      });
      return q.promise;
    },
    /**
     * signDocument : gets signature JSON object from controller and POST to API with document ID as URL parameter
     * @param {String} id
     * @param {JSON} signature
     */
    signDocument: function (id, signature) {
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
    },
    checkIfRequestIsSigned: function(id){
      var q = $.defer();
      $http.get(API_ENDPOINT.checkForRequests+'/'+id).then(function(response){
        console.log('check doc is signed success',response)
        q.resolve(response.data);
      },function(errResponse){
        console.log('check doc is signed fail',errResponse)
        q.reject(errResponse.data)
      });
      return q.promise;
    }
  };
})


;
