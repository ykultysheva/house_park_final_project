(function(){
  'use strict';

  angular
    .module('houseApp', [
      'ui.router',
      'angular-jwt'
    ]);

  angular
    .module('houseApp')
    .constant('HOST_BASE_URL', 'http://localhost:8080')
    .config(configBlock);


  configBlock.$inject = ['$stateProvider', '$urlRouterProvider','$httpProvider'];

  function configBlock($stateProvider, $urlRouterProvider, $httpProvider){
    console.log('config');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('auth',{
        url:'/login',
        templateUrl:'site/partials/auth.html',
        controller:'AuthCtrl',
        controllerAs:'authVm'
      })
      .state('register',{
        url:'/register',
        templateUrl:'site/partials/register.html',
        controller:'AuthCtrl',
        controllerAs:'authVm'
      })
      .state("user",{
        url:"/users/:userId",
        controller: "userCtrl as ctrl",
        templateUrl: "site/partials/user.html",
        // resolve?
      });

    $httpProvider.interceptors.push(function(jwtHelper){
      return {
        request:function(config){
          console.log('Requests');
          console.log(config);

          if(localStorage.authToken != undefined){
            config.headers.authentication = localStorage.authToken;
          }
          return config;
        },
        response:function(response){
          console.log('Response');

          var auth_token = response.headers('authentication');
          console.log(auth_token);

          if(auth_token){
            var decrypt_token = jwtHelper.decodeToken(auth_token);
            console.log(decrypt_token);
            if(decrypt_token.email){
              localStorage.authToken = auth_token;
            }

          }
          return response;
        }
      }
    })

  }

})();
