"use strict";

// var express = require('express');
var moment = require('moment');
// var uuid = require('uuid');
const { v4: uuidv4 } = require('uuid');

var knex = require('./db');
var mailer = require('./mailer');
var CryptoJS = require("crypto-js");
var config = require('./config.js')['application'];

// console.log(config);
console.log('Load user API ...');

var api = {};

var userFieldList = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'status', 'created_on', 'updated_on' ];

var groupTableName = "karely_user_group";
var userGroupLinkTableName = "karely_user_group_link";
var userTableName = "karely_user";
var sessionTableName = "karely_user_session";

api.getUserList = async function() {

	var sql = knex.select(userFieldList);
	sql = sql.from(userTableName);
	console.log("SQL:", sql.toString());

	var data = await sql;
	console.log("Data:", data);
	if (data.length == 0) throw new Error("Record not found");
	else if (data.length == 1) return data[0];
	else return data;
};

api.getUser = async function(id) {

	if (id == undefined) 
		throw new Error("Invalid parameter");
	var sql = knex.select(userFieldList);
	sql = sql.from(userTableName);
	sql = sql.where("id", id);
	console.log("SQL:", sql.toString());

	var data = await sql;
	console.log("Data:", data);

	if (data.length == 0) throw new Error("Record not found");
	else if (data.length == 1) return data[0];
	else return data;
};

api.getUserWithEmail = async function(email) {

	if (email == undefined) 
		throw new Error("Invalid parameter");
	var sql = knex.select('*');
	sql = sql.from(userTableName);
	sql = sql.where("email", email);
	console.log("SQL:", sql.toString());

	var data = await sql;
	console.log("Data:", data[0]);

	if (data.length == 0) throw new Error("Record not found");
	else if (data.length == 1) return data[0];
	else return data;
};

api.addUser = async function(data)
{
 	var result = await knex(userTableName).insert(data).returning('*'); 
	if (result.length == 0) throw new Error("Insert fail");
	else if (result.length == 1) return result[0];
	else return result;
};

api.updateUserWithID = async function(data, id)
{
 	var result = await knex(userTableName).update(data).where({ 'id': id }).returning('id'); 
	if (result.length == 0) throw new Error("Update fail");
	return result[0];
};

api.deleteUserWithID = async function(id)
{
 	var result = await knex(userTableName).where({ 'id': id }).delete().returning('id'); 
	if (result.length == 0) throw new Error("Delete fail");
	return result[0];
};

api.encodePassword = function(password) {
	var hash = CryptoJS.HmacSHA256(password, config.passwordKey);
	var s = hash.toString(CryptoJS.enc.Hex);
	console.log("Encode password: [" + s + "]");
	return s;
};

api.deleteSession = async function(token)
{
 	var result = await knex(sessionTableName).where({ 'token': token }).delete().returning('token'); 
	if (result.length == 0) throw new Error("Delete fail");
	return result[0];
};

api.getSession = async function(token, type) {

	if (type == undefined) type = 0;
	var dt = new Date();
	if (token == undefined) throw new Error("Invalid parameter");
	var sql = knex.select('*');
	sql = sql.from(sessionTableName);
	sql = sql.where("token", token);
	sql = sql.andWhere("session_type", type);
	sql = sql.andWhere("expired_on", ">", dt);
	// console.log("SQL:", sql.toString());

	var data = await sql;
	// console.log("Data:", data[0]);

	if (data.length == 0) throw new Error("Invalid token");
	else if (data.length == 1) return data[0];
	else return data;
};

api.addNormalUserSession = async function(id)
{
	var expired = moment().add(config.sessionDuration.value, config.sessionDuration.type).toDate();
	var data = {
		token: uuidv4(),
		user_id: id,
		session_type: 0,
		expired_on: expired,
		remark: "Normal user session",
	};
 	var result = await knex(sessionTableName).insert(data).returning('*'); 
	console.log("Result:", result);

	if (result.length == 0) throw new Error("Add session fail");
	return result[0];
};

api.addAuthorizationCodeSession = async function(id)
{
	var expired = moment().add(config.shortSessionDuration.value, config.shortSessionDuration.type).toDate();
	var data = {
		token: uuidv4(),
		user_id: id,
		session_type: 9,
		expired_on: expired,
		authorization_code: api.randomNumber(1000, 9999),
		remark: "Email authorization code",
	};
 	var result = await knex(sessionTableName).insert(data).returning('*'); 
	console.log("Result:", result);

	if (result.length == 0) throw new Error("Add session fail");
	return result[0];
};

api.addResetPasswordSession = async function(id)
{
	var expired = moment().add(config.shortSessionDuration.value, config.shortSessionDuration.type).toDate();
	var data = {
		token: uuidv4(),
		user_id: id,
		session_type: 8,
		expired_on: expired,
		remark: "Reset password",
	};
 	var result = await knex(sessionTableName).insert(data).returning('*'); 
	console.log("Result:", result);

	if (result.length == 0) throw new Error("Add session fail");
	return result[0];
};

// login
// lock account when 3 times failed
// add account status check for email verification (status field)

api.login = async function(email, password) {
	var user = await api.getUserWithEmail(email);
	console.log(user);
	var hash = api.encodePassword(password);
	if (user.password != hash && user.status == 1) 
		throw new Error("Invalid password");
	console.log("Password ok");
	// add user sesion record
	var session = await api.addNormalUserSession(user.id);

	// add session/token to user record
	delete user.password;
	delete session.authorization_code;
	user.session = session;
	return user;
};

// Verify access token
// 	the web API verison only return user id
api.verifyAccessToken = async function(token) {
	
	var session = await api.getSession(token);
	var user = await api.getUser(session.user_id);

	user.session = session;
	return user;
};

api.randomNumber = function(min, max)
{
	// include min value but not include max value
	return Math.floor(Math.random() * (max - min)) + min;
};

// Sign up normal user
// 	add user
//	??? link user to group
//	generate authentication code (4 digit code)
//	send email (4 digit code)
api.signUpUser = async function(data) {
	var hash = api.encodePassword(data.password);
	data.password = hash;
	delete data.status;

	var user = await api.addUser(data);
	
	// user.id = userId;
	console.log(user);

	var session = await api.addAuthorizationCodeSession(user.id);
	var result = await mailer.sendMail({
		from: 'Karely <noreply@karely.com>',
		to: user.email,
		subject: 'Email authorization code for Karely user sign up',
		text: 'You email authorization code ' + session.authorization_code + '\nGenerated on ' + new Date(),
	}); 
	console.log("Email ID:" + result.messageId);

	delete user.password;
	delete session.authorization_code;
	user.session = session;
	return user;
};

// Verify authorization code
api.verifyAuthorizationCode = async function(token, code) {
	var session = await api.getSession(token, 9);
	if (session.authorization_code != code)	throw new Error("Invalid code");
	var result = await api.updateUserWithID({ status: 1 }, session.user_id);
	return result;
};

// Reset password
// 	add token
// 	send link to user
api.resetPassword = async function(email) {
	var user = await api.getUserWithEmail(email);
	var session = await api.addResetPasswordSession(user.id);

	// var url = "http://localhost:8000/app2/resetPasswordView.html?token=" + session.token;
	var url = config.resetPasswordURL + "?token=" + session.token;
	var result = await mailer.sendMail({
		from: 'Karely <noreply@karely.com>',
		to: user.email,
		subject: 'Karely user reset password request',
		text: 'Reset password link ' + url + '\nGenerated on ' + new Date(),
	}); 
	console.log("Email ID:" + result.messageId);

	delete user.password;
	delete session.authorization_code;
	user.session = session;
	return user;
	
};

// Update user password
// 	verify password token
// 	update only password
api.updateUserPassword = async function(token, password) {
	var session = await api.getSession(token, 8);
	var hash = api.encodePassword(password);
	var result = await api.updateUserWithID({ status: 1, password: hash }, session.user_id);
	var token1 = await api.deleteSession(token);
	return result;
};

// Logout
api.logout = async function(token) {
	var session = await api.getSession(token);
	var result = await api.deleteSession(token);
	delete session.authorization_code;
	return session.user_id;
};

// CRUD for group
// Get single user group list by id

module.exports = api;

