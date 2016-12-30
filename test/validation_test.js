'use strict';

const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    assert(message == 'Name is required.');
  });

  it('require a user name longer than 2 characters', () => {
    const user = new User({ name: 'AL'});
    const validationResult = user.validateSync();
    const message = validationResult.errors.name.message;
    assert(message == 'Name must be longer than 2 characters.');
  });

  it('disallow invalid record to be saved', (done) => {
    const user = new User({ name: 'AL'});
    user.save()
      .catch((validationResult) => {
        const message = validationResult.errors.name.message;
        assert(message == 'Name must be longer than 2 characters.');
        done();
      });
  });
});
