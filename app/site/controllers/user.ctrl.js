(function(){
  angular
  .module("houseApp")
  .controller("userCtrl",userCtrl);

  function userCtrl($stateParams, $state, $http, houseSrv) {

    var userVm = this;

// see if logged in
    if(localStorage.authToken == undefined || localStorage.authToken == null){
          $state.go('auth');
        }

    userVm.getUser = getUser;
    userVm.logout = logout;
    userVm.addHouse = addHouse;
    userVm.house;
    userVm.houses = houseSrv.houses;
    userVm.user = {};
    userVm.filter = 'y';
    userVm.user.id = $stateParams.userId;



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



    function addHouse(){
      var newHouse = {
        address: userVm.house.address,
        description: userVm.house.description,
        user_id: $stateParams.userId
      }
      console.log(newHouse);
      houseSrv.addHouse(newHouse);
    }


    function updateHouse(){
      console.log(userVm.house)

      var updHouse = {
        address: userVm.house.address,
        description: userVm.house.description
      }
      console.log(updHouse)
      houseSrv.updateHouse(updHouse, $stateParams.houseId)

    }

    function deleteHouse(){
      houseSrv.deleteHouse($stateParams.houseId)
    }





}

})();
