(function(){
  angular
  .module("houseApp")
  .controller("userCtrl",userCtrl);

  function userCtrl($stateParams, $state, $http) {

    var userVm = this;

    userVm.getUser = getUser;

    function getUser(){
      var userId = $stateParams.userId;
      return $http.get("/api/users/" + userId)
        .then(function(res){
          userVm.user = res.data;
          console.log(res.data);
        }, function(err){
          console.log(err);
        }

      )}

      userVm.getUser();

    }







})();
