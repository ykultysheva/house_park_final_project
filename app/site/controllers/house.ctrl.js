(function(){
  angular
  .module("houseApp")
  .controller("houseCtrl", houseCtrl);

  function houseCtrl($stateParams, $state, $http, houseSrv, house) {

    var houseVm = this;
    console.log(house);
    // see if logged in
        // if(localStorage.authToken == undefined || localStorage.authToken == null){
        //       $state.go('auth');
        //     }

    houseVm.getHouses = getHouses;
    houseVm.getHouse = getHouse;
    houseVm.addHouse = addHouse;
    houseVm.updateHouse = updateHouse;
    houseVm.deleteHouse = deleteHouse;
    houseVm.house = house;
    houseVm.houses = houseSrv.houses;
    houseVm.toUser = toUser;
    houseVm.editHouse = editHouse;


    function getHouses(){
      houseSrv.getHouses()
    }


    function getHouse(){
      houseSrv.getHouse($stateParams.houseId)
    }


    function addHouse(){
      var newHouse = {
        address: houseVm.house.address,
        description: houseVm.house.description,
        user_id: $stateParams.userId
      }
      console.log(newHouse);
      houseSrv.addHouse(newHouse);
    }


    function updateHouse(){
      console.log(houseVm.house)
      var updHouse = {
        address: houseVm.house.address,
        description: houseVm.house.description
      }
      console.log(updHouse)
      houseSrv.updateHouse(updHouse, $stateParams.houseId)
    }


    function deleteHouse(){
      houseSrv.deleteHouse($stateParams.houseId)
    }


  //
    function toUser(){
      $state.go("user",{userId:house.user_id})
    }

    function editHouse(house){
      $state.go("edit",{houseId:house.id});
    }


  //
  // movielVm.goToMovie = goToMovie;
  //
  // function goToMovie(movie){
  //   $location.path('/movie/'+movie.imdbID);
  // }

//
  }

//
})()
