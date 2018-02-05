import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import faker from 'faker';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Characters APIs', () => {

  let character = {
    name: faker.name.findName(),
    description: faker.random.alphaNumeric()
  };

  describe('# POST /characters', () => {
    it('should create a new character', (done) => {
      request(app)
        .post('/characters')
        .send(character)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.name).to.equal(character.name);
          expect(res.body.description).to.equal(character.description);
          character = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /characters/:id', () => {
    it('should get character details', (done) => {
      request(app)
        .get(`/characters/${character._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(character.name);
          expect(res.body.description).to.equal(character.description);
          done();
        })
        .catch(done);
    });

    it('should report error - Not found, when character does not exists', (done) => {
      request(app)
        .get('/characters/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.error).to.be.undefined;
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /characters/:id', () => {
    it('should update character details', (done) => {
      character.name = faker.name.findName();
      request(app)
        .put(`/characters/${character._id}`)
        .send(character)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(character.name);
          expect(res.body.description).to.equal(character.description);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /characters', () => {
    it('should get all characters', (done) => {
      request(app)
        .get('/characters')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('Object');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /characters', () => {
    it('should delete character', (done) => {
      request(app)
        .delete(`/characters/${character._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('Object');
          done();
        })
        .catch(done);
    });
  });

  describe('# Error Handling', () => {
    it('should handle express validation error - isbn is required', (done) => {
      request(app)
        .post('/characters')
        .send({
          description: faker.name.findName()
        })
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.error).to.be.undefined;
          done();
        })
        .catch(done);
    });
  });
});
