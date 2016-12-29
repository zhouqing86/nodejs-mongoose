const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection.once('open', () => {
  console.log('Good to go!');
}).on('error', (error) => {
  console.log('Error' + error);
});


beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  }); //Add callback here to make test run after the users dropped.
});
