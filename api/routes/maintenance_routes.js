var router 	= require('express').Router();
var models	= require('./../models');


//get all maintenance
router.get('/',function(req,res){
  // res.send('get all maintenances');
  models.Maintenance.findAll().then(function(maintenances){
    res.json(maintenances);
  });
});

//get specific maintenance
router.get('/:maintenanceId',function(req,res){
  // res.send('get one');
  console.log('Getting Maintenance with ID: '+req.params.maintenanceId);
  var where = {where:{id:req.params.maintenanceId}};
  models.Maintenance.find(where).then(function(maintenance){
    res.json(maintenance);
  });
});


//update a maintenance
router.put('/:maintenanceId',function(req,res){
  // res.send('update a maintenance');
  var where = {where:{id:req.params.maintenanceId}};
  var __maintenance = req.body;
  models.Maintenance.find(where).then(function(maintenance){
    maintenance.updateAttributes({
        photo:__maintenance.photo,
        description:__maintenance.description,
        price:__maintenance.price,
        date:__maintenance.date,
      });

      __maintenance.id = req.params.maintenanceId;
      res.json(maintenance);
  });
});

//add new maintenance
router.post('/',function(req,res){
  //code for retrieving maintenance
  // res.send('add new maintenance');
  var maintenance = req.body;
  models.Maintenance.create(maintenance).then(function(maintenance){
    res.json(maintenance);
  });
});

//delete maintenance
router.delete('/:maintenanceId',function(req,res){
  // res.send('delete a maintenance');
  var where = {where:{id:req.params.maintenanceId}}
  models.Maintenance.find(where).then(function(maintenance){
    maintenance.destroy();
    res.json({
      deleted:true
    });
  });
});



module.exports = router;
