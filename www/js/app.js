// Ionic Starter App angular.module is a global place for creating, registering
// and retrieving Angular modules 'starter' is the name of this angular module
// example (also set in a <body> attribute in index.html) the 2nd parameter is
// an array of 'requires' 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular
  .module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.constants'])
  .run(function ($ionicPlatform, $rootScope, $ionicLoading) {
    $ionicPlatform
      .ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar
        // above the keyboard for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova
            .plugins
            .Keyboard
            .hideKeyboardAccessoryBar(true);
          cordova
            .plugins
            .Keyboard
            .disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }
        if (window.screen.orientation) {
          window.screen.orientation.lock('portrait');
        }
      });

    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner> Loading ...'
      })
    });

    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
      console.log('Loading ...');
      $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      console.log('Loading done');
      $rootScope.$broadcast('loading:hide');
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    // Ionic uses AngularUI Router which uses the concept of states Learn more here:
    // https://github.com/angular-ui/ui-router Set up the various states which the
    // app can be in. Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'AppCtrl'
      })

      // Each tab has its own nav history stack:
      .state('tab.docs', {
        url: '/docs',
        views: {
          'tab-docs': {
            templateUrl: 'templates/tab-docs.html',
            controller: 'DocsCtrl'
          }
        }
      })
      .state('tab.doc-toBeSigned', {
        url: '/docs/:docId',
        views: {
          'tab-docs': {
            templateUrl: 'templates/doc-toBeSigned.html',
            controller: 'SignDocumentCtrl',
          }
        }
      })
      .state('tab.login', {
        url: '/login',
        views: {
          'tab-login': {
            templateUrl: 'templates/tab-login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('tab.register', {
        url: '/register',
        views: {
          'tab-register': {
            templateUrl: 'templates/tab-register.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('tab.sigsample', {
        url: '/sig-sample',
        views: {
          'tab-sig-sample': {
            templateUrl: 'templates/tab-sigSample.html',
            controller: 'SigSampleCtrl'
          }
        }
      })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/docs');
    // append Content Type to every Http POST requests
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  });
