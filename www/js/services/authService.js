// Auth token interceptor (appends the Authorization header to every request)

angular.module('starter.services')
  .service('AuthService', function ($q, $http, API_ENDPOINT, $storage) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;
    var UUID;

    function loadUserCredentials() {
      var token = $storage.getItem('authToken');
      var uuid = $storage.getItem('user-uuid');
      if (token && uuid) {
        useCredentials(token, uuid);
      }
    }

    function useCredentials(token, uuid) {
      isAuthenticated = true;
      authToken = token;
      UUID = uuid

      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      UUID = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      $storage.removeItem('authToken');
      $storage.removeItem('user-uuid');
    }

    var register = function (user) {
      console.log('register:', API_ENDPOINT.register, user);
      var q = $q.defer()
      $http.post(API_ENDPOINT.register, user, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(function (result) {
        console.log('result', result);
        if (result.data) {
          $storage.setItem('authToken', result.data.token);
          $storage.setItem('user-uuid', result.data.uuid);
          loadUserCredentials();
          q.resolve(result.data);
        } else {
          q.reject(result.data);
        }
      }, function (result) {
        console.log('rejected', result.data);
        q.reject(result.data);
      });
      return q.promise;
    };

    var login = function (user) {
      var q = $q.defer();
      $http.post(API_ENDPOINT.login, user, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(function (result) {
        if (result.status === 200) {
          $storage.setItem('authToken', result.data.token);
          $storage.setItem('user-uuid', result.data.uuid);
          loadUserCredentials();
          q.resolve(result.data);
        } else {
          q.reject(result.status);
        }
      }, function (result) {
        console.log('rejected', result.data);
        q.reject(result.data);
      });
      return q.promise;
    };

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
    };
  });

