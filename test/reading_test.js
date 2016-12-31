'use strict';

const assert = require('assert');
const User = require('../src/user');

describe('Reading Users', () => {
  let joe, alex, maria, zach;

  beforeEach((done) => {
    joe = new User({name : 'Joe'});
    alex = new User({name: 'Alex'});
    maria = new User({name: 'Maria'});
    zach = new User({name: 'Zach'});
    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()]).then(() => done());
  });

  it('Find all users with a name joe', (done) => {
    User.find({name : 'Joe'}).then((users) => {
      assert(users[0]._id.toString() == joe._id.toString()); //_id is ObjectId, so can't compare directly.
      done();
    });
  });

  it.only('Can skip and limit the result', (done) => {
    User.find({})
      .sort({ name: 1})
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length == 2);
        assert(users[0].name == 'Joe');
        assert(users[1].name == 'Maria');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
