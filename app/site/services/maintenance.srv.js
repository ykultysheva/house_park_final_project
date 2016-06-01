(function(){

angular
  .module("houseApp")
  .service("maintSrv", maintSrv);

  function maintSrv($state, $http, $stateParams){
    var self = this;

    self.maintenances = [];

    self.getHoueseMaintenances = getMaintenances;
    self.getMaintenance = getMaintenance;
    self.addMaintenance = addMaintenance;
   self.updateMaintenance = updateMaintenance;
   self.removeMaintenance = removeMaintenance;
   self.deleteMaintenance = deleteMaintenance;
   self.updateMaintenanceList = updateMaintenanceList;


    function getMaintenances(){
      console.log('maintenances');
      return $http.get("/api/maintenances/")
      .then(function(res){
        // should be an array
        self.maintenances = res.data;
        console.log(res.data);
      }, function(err){
        console.log(err);
      })
    }


    function getMaintenance(id){
      var maintenanceId = $stateParams.maintenanceId;
      console.log(maintenanceId);
      if (maintenanceId == undefined) {
        maintenanceId = id
      };
      console.log(maintenanceId);
      return $http.get("/api/maintenances/" + maintenanceId)
        .then(function(res){
          this.maintenance = res.data;
          console.log(res.data);
          return res.data;
        }, function(err){
          console.log(err);
        }
      )}

    function addMaintenance(maintenance){
      return $http.post("/api/maintenances/", maintenance)
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            self.maintenances.push(res.data);
          }
        })
    }

    function updateMaintenance(maintenance,maintenanceId){
      // var maintenanceId = $stateParams.maintenanceId;
      return $http.put("api/maintenances/" + maintenanceId, maintenance)
        .then(function(res){
          console.log(res);
          if(res.status === 200){
            self.updateMaintenanceList(maintenance,maintenanceId);
            //Should go back to house profile
            console.log($stateParams.maintenanceId);
            $state.go("house",{houseId:maintenance.house_id});
          }
        })
    }

    function updateMaintenanceList(maintenance,maintenanceId){
      for(var i=0; i<self.maintenances.length;i++){
        if(self.maintenances[i].id == maintenanceId){
          self.maintenances[i].photo = maintenance.photo,
          self.maintenances[i].description = maintenance.description,
          self.maintenances[i].price = maintenance.price,
          self.maintenances[i].date = maintenance.date
        }
      }
    }


    function deleteMaintenance(maintenanceId){
      var maintenanceId = $stateParams.maintenanceId;
      return $http.delete("api/maintenances/" + maintenanceId)
      .then(function(res){
        console.log(res);
        if(res.status === 200){
          self.removeMaintenance(maintenanceId);
          // $state.go('house');
          $state.go("house",{houseId:maintenance.house_id})
        }
      })
    }

    function removeMaintenance(maintenanceId){
      for(var i=0;i < self.maintenances.length;i++){
        if(self.maintenances[i].id == maintenanceId){
          delete self.maintenances[i];
        }
      }
    }




  }

})()
