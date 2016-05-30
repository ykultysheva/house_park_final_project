var router 	= require('express').Router();
var models	= require('./../models');
// var jwt 		 = require('jsonwebtoken');
// var router 		 = express.Router();


//get all house
router.get('/',function(req,res){
  // res.send('get all houses');
  models.Houses.findAll().then(function(houses){
    res.json({
      houses:houses
    });
  });
});

//get specific house
router.get('/:houseId',function(req,res){
  // res.send('get one');
  console.log('Getting House with ID: '+req.params.houseId);
  var where = {where:{id:req.params.houseId}};
  models.Houses.find(where).then(function(house){
    res.json({
      house:house
    });
  });
});

//update a house
router.put('/:houseId',function(req,res){
  // res.send('update a house');
  var where = {where:{id:req.params.houseId}};
  var __house = req.body;
  models.Houses.find(where).then(function(house){
    house.updateAttributes({
        address:__house.address,
        description:__house.description,
      });

      __house.id = req.params.houseId;
      res.json({
      house:__house
    });
  });
});

//add new house
router.post('/',function(req,res){
  //code for retrieving house
  // res.send('add new house');
  var house = req.body;
  models.Houses.create(house).then(function(house){
    res.json({
      house:house
    });
  });
});

//delete house
router.delete('/:houseId',function(req,res){
  // res.send('delete a house');
  var where = {where:{id:req.params.houseId}}
  models.Houses.find(where).then(function(house){
    house.destroy();
    res.json({
      deleted:true
    });
  });
});



module.exports = router;
