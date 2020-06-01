var express = require('express');
var knex = require('../db');
var CryptoJS = require("crypto-js");

var router = express.Router();

router.get('/', async function(req, res, next) {

	try {
		var data = await knex.select('*').from('karely_cause_action');
  		res.json(data);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.get('/update', async function(req, res, next) {

	try {
      var data = { updated_on: new Date() };
      if (req.body.action_type != undefined) data.action_type = req.body.action_type;
      if (req.body.action_id != undefined) data.action_id = req.body.action_id;
      if (req.body.title != undefined) data.title = req.body.title;
      if (req.body.description != undefined) data.description = req.body.description;

      var result = await knex('karely_cause_action').where({
  			id: req.body.id
  		}).update(data).returning('id');
      res.json(result);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.post('/add', async function(req, res, next) {
  var data = { created_on: new Date(), updated_on: new Date()};
	try {
    var causedata = await knex.select('id')
    .from('karely_cause')
    .where('id', req.body.cause_id);
    var record = causedata[0];

      if (record==undefined)
      {
        res.status(404);
        res.json({message: 'Cause id not available.'});
        return;
      }

		var data = await knex('karely_cause_action').insert({
			cause_id: req.body.cause_id,
			action_type: req.body.action_type,
			action_id: req.body.action_id,
      title: req.body.title,
      description: req.body.description
		}).returning('id');

    res.json(data);

	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.get('/delete', async function(req, res, next) {

	try {
		var data = await knex('karely_cause_action').where({ id: req.body.id }).delete().returning('id');
    if (data.length == 0)
    {
      res.status(404);
      res.json({message: 'Record not found.'});
    }
      res.json(data);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});


module.exports = router;
