const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection.once('open', () => {done();})
                     .on('error', (error) => {
                          console.log('Error' + error);
                     });
});



beforeEach((done) => {
  const users = mongoose.connection.collections.users;
  const comments = mongoose.connection.collections.comments;
  const blogposts = mongoose.connection.collections.blogposts; //mongoose will lowercase the collection name
  users.drop(() => {
    comments.drop( () => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
