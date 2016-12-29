'use strict';

const assert = require('assert');
const User = require('../src/user');

describe('Creating a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name : 'Joe'});
    joe.save().then(() => done());
  });

  it('model instance remove', () => {
    joe.remove()
      .then(() => User.findOne({name : 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method remove', () => {
    User.remove({name : 'Joe'})
      .then(() => User.findOne({name : 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', () => {
    User.findOneAndRemove({name : 'Joe'})
      .then(() => User.findOne({name : 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findByIdAndRemove', () => {
    User.findByIdAndRemove(joe.id)
      .then(() => User.findOne({name : 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
