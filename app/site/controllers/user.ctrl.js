(function(){
  angular
  .module("houseApp")
  .controller("userCtrl",userCtrl);

  function userCtrl($stateParams, $state, $http) {

    var userVm = this;

// see if logged in
    if(localStorage.authToken == undefined || localStorage.authToken == null){
          $state.go('auth');
        }

    userVm.getUser = getUser;
    userVm.logout = logout;





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

      function logout(){
      localStorage.removeItem('authToken');
      $state.go('auth');
    }



      userVm.getUser();

    }







})();
