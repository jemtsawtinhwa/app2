var express = require('express');
var knex = require('../db');
var CryptoJS = require("crypto-js");

var router = express.Router();
var key = "Super123";

router.get('/', async function(req, res, next) {

	try {
		var data = await knex.select('id', 'first_name', 'last_name', 'email', 'phone_number', 'created_at', 'updated_at' ).from('user');
  		res.json(data);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.get('/:id', async function(req, res, next) {

	try {
		var data = await knex.select('id', 'first_name', 'last_name', 'email', 'phone_number', 'created_at', 'updated_at')
			.from('user')
			.where('id', req.params.id);

		if (data.length == 0)
		{
			res.status(404);
  			res.json({message: 'Record not found.'});
		}
		else res.json(data[0]);

	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.post('/add', async function(req, res, next) {

	try {
		var password = undefined;
		var hash = CryptoJS.HmacSHA256(req.body.password, key);
		password = hash.toString(CryptoJS.enc.Hex);
		console.log("Password: [" + password + "]");

		var data = await knex('user').insert({
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			phone_number: req.body.phone_number,
			password: password,
		}).returning('id');
  		res.json(data);

	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.post('/update', async function(req, res, next) {
	try {
		var data = { updated_at: new Date() };
		if (req.body.first_name != undefined) data.first_name = req.body.first_name;
		if (req.body.last_name != undefined) data.last_name = req.body.last_name;
		if (req.body.phone_number != undefined) data.phone_number = req.body.phone_number;
		if (req.body.email != undefined) data.email = req.body.email;
		if (req.body.password != undefined)
		{
			var password = undefined;
			var hash = CryptoJS.HmacSHA256(req.body.password, key);
			password = hash.toString(CryptoJS.enc.Hex);
			console.log("Password: [" + password + "]");
			data.password = password;
		}

		var result = await knex('user').where({
			id: req.body.id
		}).update(data).returning('id');
  		res.json(result);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.post('/delete', async function(req, res, next) {
	try {
		var data = await knex('user').where({ id: req.body.id }).delete().returning('id');
		if (data.length == 0)
		{
			res.status(404);
  			res.json({message: 'Record not found.'});
		}
		else res.json(data[0]);
	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

router.post('/login', async function(req, res, next) {
	try {
		var data = await knex.select('*')
			.from('user')
			.where('phone_number', req.body.phone_number)
			.orWhere('email', req.body.email);

		if (data.length == 0)
		{
			res.status(404);
  			res.json({message: 'Invalid phone number or email.'});
			return;
		}

		var record = data[0];
		var password = undefined;

		var hash = CryptoJS.HmacSHA256(req.body.password, key);
		password = hash.toString(CryptoJS.enc.Hex);

		console.log("Password 1", password);
		console.log("Password 2", record.password);
		if (password == record.password)
		{
			res.status(200);
  			res.json({message: "Successfully login", code: 0});

		}
		else
		{
			res.status(400);
  			res.json({message: "Invalid password", code: 1001});
		}

	} catch (err) {
		console.log("Exception", err);
		res.status(400);
  		res.json({message: err.detail, code: err.code});
	}
});

module.exports = router;
