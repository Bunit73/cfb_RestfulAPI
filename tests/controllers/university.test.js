const chai = require('chai');
const expect = chai.expect;

const University = require('../../models/university');

describe('university', () => {
  it('should be invalid if name is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it('should be invalid if nick_name is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.nick_name).to.exist;
      done();
    });
  });
  it('should be invalid if website is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.website).to.exist;
      done();
    });
  });
  it('should be invalid if city is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.city).to.exist;
      done();
    });
  });
  it('should be invalid if state is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.state).to.exist;
      done();
    });
  });
  it('should be invalid if primary_color is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.primary_color).to.exist;
      done();
    });
  });
  it('should be invalid if secondary_color is empty', (done) => {
    const uni = new University();
    uni.validate((err) => {
      expect(err.errors.secondary_color).to.exist;
      done();
    });
  });
});
