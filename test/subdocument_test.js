'use strict';

const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {
  it('can create a sub document', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [ {title: 'The first post'}]
    });

    joe.save()
      .then((user) => {
        assert(user.posts[0].title == 'The first post');
        done();
      })
  });

  it('Can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title == 'New Post');
        done();
      });
  });

  it('Can remove an existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title: "A Post"}]
    });

    joe.save()
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts.length == 0);
        done();
      });
   });
});
