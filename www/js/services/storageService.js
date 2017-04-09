// Service to use local storage
angular.module('starter.services')
.factory('$storage', function() {
    return {
        getItem: function(key, toJson) {
            var value = window.localStorage[key];
            return toJson ? angular.fromJson(value) : value;
        },
        setItem: function(key, value) {
            window.localStorage[key] = typeof value == "object" ? angular.toJson(value) : value;
        },
        hasItem: function(key) {
            return window.localStorage[key] != undefined ? true : false;
        },
        removeItem: function(keys) {
            var keysToClear = keys.split(" ");
            angular.forEach(keysToClear, function(key){
                window.localStorage.removeItem(key);
            });
        }
    }
})