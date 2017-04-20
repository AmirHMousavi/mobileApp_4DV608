// Auth token interceptor (appends the Authorization header to every request)

angular.module('starter.services')
  .service('AuthService', function ($q, $http, API_ENDPOINT, $storage) {
    var isAuthenticated = false;
    var authToken;
    var UUID;

    /**
     * @memberof AuthService
     * @ngdoc services
     * @name saveUserCredentials
     * @description store authToken & uuid at localStorage.
     * @param {String} token 
     * @param {String} uuid 
     */
    function saveUserCredentials(token, uuid) {
      console.log('saveUserCredentials', token, uuid)
      if (token && uuid) {
        $storage.setItem('authToken', token);
        $storage.setItem('user-uuid', uuid);
        loadUserCredentials();
      }else{
        console.log('saveUserCredentials ERROR!')
      }
    }
    /**
     * @memberof AuthService
     * @ngdoc services
     * @name loadUserCredentials
     * @description load authToken & uuid from localStorage to local variables and sets Http requests header for Authentication.
     */
    function loadUserCredentials() {
      authToken = $storage.getItem('authToken');
      UUID = $storage.getItem('user-uuid');
      if(authToken){isAuthenticated = true;}
      $http.defaults.headers.common.token = authToken;
      console.log('loadUserCredentials',authToken,UUID);
    }

    /**
     * @memberof AuthService
     * @ngdoc services
     * @name destroyUserCredentials
     * @description clears all authentication related credentials from storage and http header. 
     */
    function destroyUserCredentials() {
      authToken = undefined;
      UUID = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.token = undefined;
      $storage.removeItem('authToken');
      $storage.removeItem('user-uuid');
    }

    /**
     * register : gets te user object from controller and POST to API
     * @param {JSON} user
     * @returns success => {String} authToken & uuid
     * @returns failure => {String} 'Invalid Email' or 'Email Already In Use'  
     */
    var register = function (user) {
      var q = $q.defer()
      $http.post(API_ENDPOINT.register, user).then(function (response) {
        console.log('register success', response)
        saveUserCredentials(response.data.token, response.data.uuid);
        q.resolve(response.data);
      }, function (errResponse) {
        console.log('register fail', errResponse)
        q.reject(errResponse.data);
      });
      return q.promise;
    };

    /**
     * login : gets te user object from controller and POST to API
     * @param {JSON} user
     * @returns success => {String} authToken & uuid
     * @returns failure => {String} 'Invalid Credentials' 
     */
    var login = function (user) {
      var q = $q.defer();
      $http.post(API_ENDPOINT.login, user).then(function (response) {
        console.log('login success', response)
        saveUserCredentials(response.data.token, response.data.uuid);
        q.resolve(response.data);
      }, function (errResponse) {
        console.log('login Fail', errResponse)
        q.reject(errResponse.data);
      });
      return q.promise;
    };

    /**
     * logout : Destroys All User Credentials
     */
    var logout = function () {
      destroyUserCredentials();
    };

    loadUserCredentials();

    return {
      login: login,
      register: register,
      logout: logout,
      loadUserCredentials: loadUserCredentials,
      isAuthenticated: function () {
        return isAuthenticated;
      },
      getAuthToken: function () {
        return authToken;
      },
      getUUID: function () {
        return UUID;
      }
    };
  });
