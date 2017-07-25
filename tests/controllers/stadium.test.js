const chai = require('chai');

const expect = chai.expect;

const Stadium = require('../../models/stadium');

describe('stadium', () => {
  it('should be invalid if name is empty', (done) => {
    const stadium = new Stadium();
    stadium.validate((err) => {
      expect(err.errors.name).to.be.exist;
      done();
    });
  });
  it('should be invalid if city is empty', (done) => {
    const stadium = new Stadium();
    stadium.validate((err) => {
      expect(err.errors.city).to.be.exist;
      done();
    });
  });
  it('should be invalid if state is empty', (done) => {
    const stadium = new Stadium();
    stadium.validate((err) => {
      expect(err.errors.state).to.be.exist;
      done();
    });
  });
});
