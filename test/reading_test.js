'use strict';

const assert = require('assert');
const User = require('../src/user');

describe('Reading Users', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name : 'Joe'});
    joe.save().then(() => done());
  });

  it('Find all users with a name joe', (done) => {
    User.find({name : 'Joe'}).then((users) => {
      assert(users[0]._id.toString() == joe._id.toString()); //_id is ObjectId, so can't compare directly.
      done();
    });
  });
});
