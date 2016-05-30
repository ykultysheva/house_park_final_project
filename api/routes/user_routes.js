var router 	= require('express').Router();
var models	= require('./../models');
// var jwt 		 = require('jsonwebtoken');
// var router 		 = express.Router();


//get all user
router.get('/',function(req,res){
  // res.send('get all users');
  models.Users.findAll().then(function(users){
    res.json({
      users:users
    });
  });
});

//get specific user
router.get('/:userId',function(req,res){
  // res.send('get one');
  console.log('Getting User with ID: '+req.params.userId);
  var where = {where:{id:req.params.userId}};
  models.Users.find(where).then(function(user){
    res.json(user);
  });
});

//update a user
router.put('/:userId',function(req,res){
  // res.send('update a user');
  var where = {where:{id:req.params.userId}};
  var __user = req.body;
  models.Users.find(where).then(function(user){
    user.updateAttributes({
        name:__user.name,
        email:__user.email,
        password:__user.password,
      });

      __user.id = req.params.userId;
      res.json({
      user:__user
    });
  });
});

//add new user - should be in auth routes (registration as well as authentication)


//delete user
router.delete('/remove/:userId',function(req,res){
  // res.send('delete a user');
  var where = {where:{id:req.params.userId}}
  models.Users.find(where).then(function(user){
    user.destroy();
    res.json({
      deleted:true
    });
  });
});



module.exports = router;
