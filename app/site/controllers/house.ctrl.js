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
    houseVm.sort = 0;
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

    houseVm.maintSortOptions = [
      {label: 'Jan',
      value: '0',
      sortField: 'month'},
      {label: 'Feb',
      value: '1',
      sortField: 'month'},
      {label: 'Mar',
      value: '2',
      sortField: 'month'},
      {label: 'Apr',
      value: '3',
      sortField: 'month'},
      {label: 'May',
      value: '4',
      sortField: 'month'},
      {label: 'Jun',
      value: '5',
      sortField: 'month'},
      {label: 'Jul',
      value: '6',
      sortField: 'month'},
      {label: 'Aug',
      value: '7',
      sortField: 'month'},
      {label: 'Sep',
      value: '8',
      sortField: 'month'},
      {label: 'Oct',
      value: '9',
      sortField: 'month'},
      {label: 'Nov',
      value: '10',
      sortField: 'month'},
      {label: 'Dec',
      value: '11',
      sortField: 'month'},
      {label: 'Show All',
      value: '',
      sortField: 'month'},
    ]

    houseVm.maintShow = true;

// var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

for (var i = 0; i < houseVm.maintenances.length; i++) {
  // create New Date string where getMonth property can be applied
  var dateString = new Date(houseVm.maintenances[i].date);
  var monthNum = dateString.getMonth();
  // houseVm.maintenances[i].month = monthNames[monthNum];
  // save monthNum(month number) in month property created for each maintenance object
  houseVm.maintenances[i].month = monthNum;
  // now I can filter list of maintenace by month
}





houseVm.monthlyMaintenancePrice = [0,0,0,0,0,0,0,0,0,0,0,0];

for (var i = 0; i < houseVm.maintenances.length; i++) {
  var monthIndex = houseVm.maintenances[i].month;
  houseVm.monthlyMaintenancePrice[monthIndex] += houseVm.maintenances[i].price;
}

console.log(houseVm.monthlyMaintenancePrice);




// var month = houseVm.maintenance.date.getMonth();

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
      $state.go("base.user",{userId:house.user_id})
    }

    function editHouse(house){
      $state.go("base.edit",{houseId:house.id});
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
  houseVm.maintShow = true;
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
