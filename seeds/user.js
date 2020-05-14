
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        { first_name: 'CS', last_name: 'Goh', email: 'csgoh@hotmail.com', phone_number: '+60126196911', password: 'May@2020'},
        { first_name: 'CK', last_name: 'Goh', email: 'ckgoh@hotmail.com', phone_number: '+60126196912', password: 'May@2020'}
      ]);
    });
};
