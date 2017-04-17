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
