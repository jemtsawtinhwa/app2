
exports.up = function(knex) {
	return knex.schema.createTable('user', function(t) {
		t.increments();
		t.string('first_name').notNullable();	
		t.string('last_name').notNullable();	
		t.string('phone_number').notNullable();	
		t.string('email').notNullable();	
		t.string('password').notNullable();	
		t.timestamps(true, true);
		t.unique('phone_number');
		t.unique('email');
	});  
};

exports.down = function(knex) {
	return knex.schema.dropTable('user');
  
};
