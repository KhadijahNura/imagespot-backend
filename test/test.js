import {
  getUserByEmail,
  getUserById,
  getUserByUsername,
} from '../models/UsersModel.js';

import { getImageById, getImagesByUserID } from '../models/ImageModel.js';

describe('Users', function () {
  describe('get user by username', function () {
    it('should throw an error because user with this username does not exist', function (done) {
      getUserByUsername('wee').then(done).catch(done);
    });
  });
  describe('get user by email', function () {
    it('should throw an error because user with this email does not exist', function (done) {
      getUserByEmail('wee').then(done).catch(done);
    });
  });
  describe('get user by id', function () {
    it('should throw an error because user with this id does not exist', function (done) {
      getUserById('wee').then(done).catch(done);
    });
  });
});

describe('Images', function () {
  describe('get image by id', function () {
    it('should throw an error because image with this id does not exist', function (done) {
      getImageById('wee').then(done).catch(done);
    });
  });
  describe('get images by user id', function () {
    it('should run without an error', function () {
      return getImagesByUserID(1);
    });
  });
});
