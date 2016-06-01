(function(){
  angular
  .module("houseApp")
  .controller("houseCtrl", houseCtrl);

  function houseCtrl($scope, $stateParams, $state, $http, houseSrv, house,maintSrv, maintenances) {
    var houseVm = this;
    //console.log(house);
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

    // maintenance
    houseVm.getMaintenances = getMaintenances;
    houseVm.getMaintenance = getMaintenance;
    houseVm.addMaintenance = addMaintenance;
    houseVm.updateMaintenance = updateMaintenance;
    houseVm.deleteMaintenance = deleteMaintenance;
    houseVm.maintenance = {};
    houseVm.maintenances = maintSrv.maintenances;
    //console.log(houseVm.maintenances)
    // houseVm.maintenances = maintSrv.maintenances;
    // houseVm.toHouse = toHouse;
    // houseVm.editMaintenance = editMaintenance;


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
        user_id: $stateParams.userId,
        photo: houseVm.house.photo,
        price: houseVm.house.price,
        mortgage: houseVm.house.mortgage,
        tax: houseVm.house.tax,
        insurance: houseVm.house.insurance,
        rent: houseVm.house.rent
      }
      console.log(newHouse);
      houseSrv.addHouse(newHouse);
    }


    function updateHouse(){
      console.log('UPDATE HOUSE');
      console.log(houseVm.house)
      var updHouse = {
        address: houseVm.house.address,
        description: houseVm.house.description,
        photo: houseVm.house.photo,
        price: houseVm.house.price,
        mortgage: houseVm.house.mortgage,
        tax: houseVm.house.tax,
        insurance: houseVm.house.insurance,
        rent: houseVm.house.rent
      }
      console.log(updHouse);
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


// maintenance

function getMaintenances(){
  maintSrv.getMaintenances()
}
//
//
function getMaintenance(){
  maintSrv.getMaintenance($stateParams.maintenanceId)
}

//
function addMaintenance(){
  var newMaintenance = {
    photo: houseVm.maintenance.photo,
    description: houseVm.maintenance.description,
    house_id: $stateParams.houseId,
    price: houseVm.maintenance.price,
    date: houseVm.maintenance.date
  }
  console.log(newMaintenance);
  maintSrv.addMaintenance(newMaintenance);
}


function updateMaintenance(){
  console.log(houseVm.maintenance)
  var updMaintenance = {
    photo: houseVm.maintenance.photo,
    description: houseVm.maintenance.description,
    house_id: $stateParams.houseId,
    price: houseVm.maintenance.price,
    date: houseVm.maintenance.date
  }
  console.log(updMaintenance)
  maintSrv.updateMaintenance(updMaintenance, $stateParams.maintenanceId)
}


function deleteMaintenance(){
  maintSrv.deleteMaintenance($stateParams.maintenanceId)
}


//
// function toHouse(){
//   $state.go("house",{houseId:maintenance.house_id})
// }

// function editMaintenance(maintenance){
//   $state.go("edit_maint",{maintenanceId:maintenance.id});
// }











//
  }

//
})()
