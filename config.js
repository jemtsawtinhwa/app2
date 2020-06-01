// Update with your config settings.

module.exports = {
	database: {
 		client: 'pg',
  		connection: 'postgres://postgres:password@localhost:5432/karely',
		debug: true
  	},
	application: {
		passwordKey: 'super@123',
		cors: true,
		resetPasswordURL: 'http://localhost:8000/app2/testResetPasswordView.html',
		sessionDuration: {
			value: 1,
			type: "months",
		},
		shortSessionDuration: {
			value: 1,
			type: "days",
		},
		mailServer: {
			service: 'gmail',
			user: 'calving290@gmail.com',
			password: 'May@2019',
		}
	}
};

