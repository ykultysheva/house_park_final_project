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
  //  console.log('config');
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
      .state("base",{
        abstract:true,
        url:"",
        controller:"baseCtrl",
        controllerAs:"ctrl",
        templateUrl:"site/partials/base.html"
      })
      .state("base.user",{
        url:"/users/:userId",
        controller: "userCtrl as ctrl",
        templateUrl: "site/partials/user.html",
          resolve:{
            houses:function(houseSrv){
              return houseSrv.getHouses();
            }
          }
      })
      .state("base.house",{
        // url:"users/:userId/:houseId",
        url:"/houses/:houseId",
        controller: "houseCtrl as ctrl",
        templateUrl: "site/partials/house.html",
        resolve:{
            house:function(houseSrv, $stateParams){
              console.log($stateParams.houseId);
              return houseSrv.getHouse($stateParams.houseId)
                .then(function(res){
                  return res;
                })
            },
            maintenances:function($http,$stateParams,maintSrv){
              return $http.get("/api/maintenances/")
              .then(function(res){
                // should be an array
                //console.log('resolving' + res.data);
                var maintenance = [];
                for(var i=0;i<res.data.length;i++){
                  if(res.data[i].house_id == $stateParams.houseId){
                    maintenance.push(res.data[i]);
                  }
                }
                maintSrv.maintenances = maintenance;
                return res.data;
              }, function(err){
                //console.log(err);
              })
              // return maintSrv.getMaintenances();
            }
            // maintenance:function(maintSrv,$stateParams){
            //   console.log($stateParams.maintenanceId);
            //   return maintSrv.getMaintenance($stateParams.maintenanceId)
            //   .then(function(res){
            //     return res;
            //   })
            // }
        }


      })
      .state("base.edit",{
        url:"/edit_house/:houseId",
        controller:"houseCtrl as ctrl",
        templateUrl:"site/partials/edit_house.html",
          resolve:{
          house:function(houseSrv, $stateParams){
          //  console.log($stateParams.houseId);
            return houseSrv.getHouse($stateParams.houseId)
              .then(function(res){
                return res;
              })
          },
          maintenances:function($http){
            return $http.get("/api/maintenances/")
            .then(function(res){
              // should be an array
              //console.log('resolving' + res.data);
              return res.data;
            }, function(err){
              //console.log(err);
            })
        }

      }

      });

    $httpProvider.interceptors.push(function(jwtHelper){
      return {
        request:function(config){
        //  console.log('Requests');
        //  console.log(config);

          if(localStorage.authToken != undefined){
            config.headers.authentication = localStorage.authToken;
          }
          return config;
        },
        response:function(response){
        //  console.log('Response');

          var auth_token = response.headers('authentication');
        //  console.log(auth_token);

          if(auth_token){
            var decrypt_token = jwtHelper.decodeToken(auth_token);
          //  console.log(decrypt_token);
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
