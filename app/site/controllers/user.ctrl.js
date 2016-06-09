(function(){
  angular
  .module("houseApp")
  .controller("userCtrl",userCtrl);

  function userCtrl($stateParams, $state, $http, houseSrv, $location) {

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
    userVm.goToHouse = goToHouse;

    userVm.getUser();

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




    function addHouse(){
      var newHouse = {
        address: userVm.house.address,
        description: userVm.house.description,
        user_id: $stateParams.userId,
        photo: userVm.house.photo,
        price: userVm.house.price,
        mortgage: userVm.house.mortgage,
        tax: userVm.house.tax,
        insurance: userVm.house.insurance,
        rent: userVm.house.rent
      }
      console.log(newHouse);
      houseSrv.addHouse(newHouse);
      userVm.houseShow = true;
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

    // function toHouse(){
    //   $state.go("house")
    //   $state.go("house", {houseId: res.data.id});
    // }
    //
    //   movielVm.goToMovie = goToMovie;
    //
    // 	function goToMovie(movie){
    // 		$location.path('/movie/'+movie.imdbID);
    // 	}

    function goToHouse(house){
      // $location.path("/houses/"+house.id)
      // $location.path("houses")
      $state.go("base.house", {houseId: house.id});
    }

    userVm.houseShow = true;



}

})();
