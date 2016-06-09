(function(){

angular
  .module("houseApp")
  .service("houseSrv", houseSrv);

  function houseSrv($state, $http, $stateParams){
    var self = this;

    self.houses = [];

    self.getHouses = getHouses;
    self.getHouse = getHouse;
    self.addHouse = addHouse;
   self.updateHouse = updateHouse;
   self.removeHouse = removeHouse;
   self.deleteHouse = deleteHouse;
   self.updateHouseList = updateHouseList;


    function getHouses(){
      console.log('houses');
      return $http.get("/api/houses/")
      .then(function(res){
        // should be an array
        self.houses = res.data;
        console.log(res.data);
      }, function(err){
        console.log(err);
      })
    }


    // function getUsersHouses(){
    //   var userId = $stateParams.userId;
    //   console.log(userId);
    //   return $http.get("/api/houses/users/"+userId)
    //   .then(function(res){
    //     // should be an array
    //     self.houses = res.data;
    //     console.log(res.data);
    //     return res.data
    //   }, function(err){
    //     console.log(err);
    //     return err
    //   })
    // }



    function getHouse(id){
      var houseId = $stateParams.houseId;
      console.log(houseId);
      if (houseId == undefined) {
        houseId = id
      };
      console.log(houseId);
      return $http.get("/api/houses/" + houseId)
        .then(function(res){
          this.house = res.data.house;
          console.log(res.data.house);
          return res.data.house;
        }, function(err){
          console.log(err);
        }
      )}

    function addHouse(house){
      return $http.post("/api/houses/", house)
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            self.houses.push(res.data.house);
          }
        })
    }

    function updateHouse(house,houseId){
      console.log('HOUSE ID: ' +houseId);
      // var houseId = $stateParams.houseId;
      return $http.put("api/houses/" + houseId, house)
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            self.updateHouseList(house,houseId);
            // Does not go back to the house profile
            $state.go("base.house",{houseId:houseId});
          }
        })
    }

    function updateHouseList(house,houseId){
      for(var i=0; i<self.houses.length;i++){
        if(self.houses[i].id == houseId){
          self.houses[i].address = house.address,
          self.houses[i].description = house.description,
          self.houses[i].photo = house.photo,
          self.houses[i].price = house.price,
          self.houses[i].mortgage = house.mortgage,
          self.houses[i].tax = house.tax,
          self.houses[i].insurance = house.insurance,
          self.houses[i].rent = house.rent
        }
      }
    }


    function deleteHouse(houseId){
      var houseId = $stateParams.houseId;
      return $http.delete("api/houses/" + houseId)
      .then(function(res){
        console.log(res);
        if(res.status === 200){
          self.removeHouse(houseId);
          // self.getHouses();
          // $state.go('user');
          $state.go("user",{userId:house.user_id})
        }
      })
    }

    function removeHouse(houseId){
      for(var i=0;i < self.houses.length;i++){
        if(self.houses[i].id == houseId){
          delete self.houses[i];
        }
      }
    }




  }

})()
