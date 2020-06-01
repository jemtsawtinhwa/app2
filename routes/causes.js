var express = require('express');
var knex = require('../db');
var CryptoJS = require("crypto-js");
<<<<<<< HEAD
var api = require('../causeAPI');
=======
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d

var router = express.Router();
var key = "Super123";

router.get('/', async function(req, res, next) {

	try {
<<<<<<< HEAD
        var data = await api.getCauseList();
        
        res.json(data);
=======
		var data = await knex.select('id', 'user_id', 'title', 'story', 'visibility', 'cause_type', 'cause_related_1','cause_related_2', 'cause_related_3', 'photo', 'beneficiary_flag', 'beneficiary_first_name', 'beneficiary_last_name', 'beneficiary_email', 'updated_on', 'created_on').from('karely_cause');
  		res.json(data);
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
<<<<<<< HEAD
    }
    

    
});
router.get('/:id', async function(req, res, next) {

	try {
		var data = await api.getCause(req.body.id);
		res.json(data);

	} catch (err) {
		console.log("Exception", err);
		if (err.detail != undefined)
		{
			res.status(400);
  			res.json({message: err.detail, code: err.code});
		}
		else
		{
			res.status(400);
  			res.json({message: err.message });
		}
=======
	}
});

router.get('/update', async function(req, res, next) {

	try {
      var data = { updated_on: new Date() };
      if (req.body.title != undefined) data.title = req.body.title;
      if (req.body.story != undefined) data.story  = req.body.story ;
      if (req.body.visibility != undefined) data.visibility  = req.body.visibility ;
      if (req.body.cause_type != undefined) data.cause_type  = req.body.cause_type ;
      if (req.body.cause_related_1 != undefined) data.cause_related_1  = req.body.cause_related_1 ;
      if (req.body.cause_related_2 != undefined) data.cause_related_2  = req.body.cause_related_2 ;
      if (req.body.cause_related_3 != undefined) data.cause_related_3  = req.body.cause_related_3 ;
      if (req.body.photo != undefined) data.photo  = req.body.photo ;
      if (req.body.beneficiary_flag != undefined) data.beneficiary_flag  = req.body.beneficiary_flag ;
      if (req.body.beneficiary_first_name != undefined) data.beneficiary_first_name   = req.body.beneficiary_first_name  ;
      if (req.body.beneficiary_last_name != undefined) data.beneficiary_last_name   = req.body.beneficiary_last_name  ;
      if (req.body.beneficiary_email != undefined) data.beneficiary_email   = req.body.beneficiary_email  ;

      var result = await knex('karely_cause').where({
  			id: req.body.id
  		}).update(data).returning('id');
      res.json(result);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
	}
});



<<<<<<< HEAD

router.post('/update', async function(req, res, next) {

    try {
        var data = { updated_on: new Date() };
        if (req.body.title != undefined) data.title = req.body.title;
        if (req.body.story != undefined) data.story  = req.body.story ;
        if (req.body.visibility != undefined) data.visibility  = req.body.visibility ;
        if (req.body.cause_type != undefined) data.cause_type  = req.body.cause_type ;
        if (req.body.cause_related_1 != undefined) data.cause_related_1  = req.body.cause_related_1 ;
        if (req.body.cause_related_2 != undefined) data.cause_related_2  = req.body.cause_related_2 ;
        if (req.body.cause_related_3 != undefined) data.cause_related_3  = req.body.cause_related_3 ;
        if (req.body.photo != undefined) data.photo  = req.body.photo ;
        if (req.body.beneficiary_flag != undefined) data.beneficiary_flag  = req.body.beneficiary_flag ;
        if (req.body.beneficiary_first_name != undefined) data.beneficiary_first_name   = req.body.beneficiary_first_name  ;
        if (req.body.beneficiary_last_name != undefined) data.beneficiary_last_name   = req.body.beneficiary_last_name  ;
        if (req.body.beneficiary_email != undefined) data.beneficiary_email   = req.body.beneficiary_email  ;
  
        var result = await api.updateCauseWithID(data, req.body.id);
        res.json(result);
      } catch (err) {
          console.log("Exception", err);
          res.status(400);
            res.json({message: err.detail, code: err.code});
      }
});



=======
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
router.post('/add', async function(req, res, next) {
  var data = { created_on: new Date(), updated_on: new Date()};

	try {
<<<<<<< HEAD
    /*var userdata = await knex.select('id', 'first_name', 'last_name')
    .from('user')
    .where('id', req.body.user_id);


    
=======
    var userdata = await knex.select('id', 'first_name', 'last_name')
    .from('user')
    .where('id', req.body.user_id);
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
    var record = userdata[0];


      if (record==undefined)
      {
        res.status(404);
        res.json({message: 'User id not available.'});
        return;
      }
      else if (req.body.user_id != record.id)
      {
        res.status(404);
        res.json({message: 'User id invalid.'});
        return;

      }
<<<<<<< HEAD
*/

var result = await api.addCause(
    {
        user_id: req.body.user_id,
        title: req.body.title,
        story: req.body.story,
        visibility: req.body.visibility,
        cause_type: req.body.cause_type,
        cause_related_1 : req.body.cause_related_1,
        cause_related_2 : req.body.cause_related_2,
        cause_related_3 : req.body.cause_related_3,
        photo : req.body.photo,
        beneficiary_flag : req.body.beneficiary_flag,
        beneficiary_first_name : req.body.beneficiary_first_name,
        beneficiary_last_name : req.body.beneficiary_last_name,
        beneficiary_email : req.body.beneficiary_email
    });

    res.json(result);
=======
//id: req.body.id,
		var data = await knex('karely_cause').insert({
			user_id: req.body.user_id,
			title: req.body.title,
			story: req.body.story,
			visibility: req.body.visibility,
      cause_type: req.body.cause_type,
      cause_related_1 : req.body.cause_related_1,
      cause_related_2 : req.body.cause_related_2,
      cause_related_3 : req.body.cause_related_3,
      photo : req.body.photo,
      beneficiary_flag : req.body.beneficiary_flag,
      beneficiary_first_name : req.body.beneficiary_first_name,
      beneficiary_last_name : req.body.beneficiary_last_name,
      beneficiary_email : req.body.beneficiary_email
		}).returning('id');

    res.json(data);
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d

	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

<<<<<<< HEAD
router.post('/delete', async function(req, res, next) {

	try {
        var result = await api.deleteCauseWithID(req.body.id);
		
    if (result.length == 0)
=======
router.get('/delete', async function(req, res, next) {

	try {
		var data = await knex('karely_cause').where({ id: req.body.id }).delete().returning('id');
    if (data.length == 0)
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
    {
      res.status(404);
      res.json({message: 'Record not found.'});
    }
<<<<<<< HEAD
      res.json(result);
=======
      res.json(data);
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});


<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 8563cb1b8be44ecea5064df458ed09c1b4d2552d
