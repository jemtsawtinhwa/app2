
var nodemailer = require('nodemailer');

var config = require('./config.js')['application'];

console.log("Load mailer ...");
// console.log(config);

var transporter = nodemailer.createTransport({
	service: config.mailServer.service,
	auth: {
		user: config.mailServer.user,
		pass: config.mailServer.password 
	}
});

module.exports = transporter;

/*
var mailOptions = {
	from: config.mailServer.user,
	to: 'cheowkwee@hotmail.com',
	subject: 'Sending Email using Node.js',
	text: 'That was easy! ' + new Date()
};


var main = async function() {
	// transporter.sendMail(mailOptions, function(error, info) {
	// 	if (error) console.log(error);
	// 	else console.log('Email sent: ' + info.response);
	// });
	var result = await transporter.sendMail(mailOptions); 
	console.log("Message ID:", result.messageId);
	console.log("Result:", result);
};

main().catch(console.error);

*/
