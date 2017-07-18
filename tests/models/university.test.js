// https://semaphoreci.com/community/tutorials/a-tdd-approach-to-building-a-todo-api-using-node-js-and-mongodb

const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const mongoose = require('mongoose');
require('sinon-mongoose');

const University = require('../../models/university');

describe('Get all Universities', () => {
    // Test will pass if we get all universities
  it('should return all universities', (done) => {
    const UniMock = sinon.mock(University);
    const expectedResults = { status: true, uni: [] };
    UniMock.expects('find').yields(null, expectedResults);
    University.find((err, result) => {
      UniMock.verify();
      UniMock.restore();
      expect(result.status).to.be.true;
      done();
    });
  });
    // Test will pass if we get all universities
  it('should return error', (done) => {
    const UniMock = sinon.mock(University);
    const expectedResults = { status: false, error: 'Something went wrong' };
    UniMock.expects('find').yields(expectedResults, null);
    University.find((err, result) => {
      UniMock.verify();
      UniMock.restore();
      expect(err.status).to.not.be.true;
      done();
    });
  });
});

describe('Create a University', () => {
   // Test will pass if uni is saved
  it('should create a new university', (done) => {
    const uniInfo = {
      name: 'Central Michigan',
      nick_name: 'Chippewas',
      website: 'http:&#x2F;&#x2F;www.cmich.edu',
      city: 'Mount Pleasant',
      state: 'Michigan',
      primary_color: '6a0032',
      secondary_color: 'ffc82e' };
    const UniMock = sinon.mock(new University(uniInfo));
    const uni = UniMock.object;

    UniMock.expects('save').yields(null, uni);
    uni.save((err, result) => {
      UniMock.verify();
      UniMock.restore();
      expect(result.name).to.equal(uniInfo.name);
      expect(result.nick_name).to.equal(uniInfo.nick_name);
      expect(result.website).to.equal(uniInfo.website);
      expect(result.city).to.equal(uniInfo.city);
      expect(result.state).to.equal(uniInfo.state);
      expect(result.primary_color).to.equal(uniInfo.primary_color);
      expect(result.secondary_color).to.equal(uniInfo.secondary_color);
      done();
    });
  });
    // Test will pass if uni is not saved
  it('should return error, if university not saved', (done) => {
    const uniInfo = {
      name: 'Central Michigan',
      nick_name: 'Chippewas',
      website: 'http:&#x2F;&#x2F;www.cmich.edu',
      city: 'Mount Pleasant',
      state: 'Michigan',
      primary_color: '6a0032',
      secondary_color: 'ffc82e' };
    const UniMock = sinon.mock(new University(uniInfo));
    const uni = UniMock.object;

    const expectedResults = uniInfo;
    UniMock.expects('save').yields(expectedResults, null);
    uni.save((err, result) => {
      UniMock.verify();
      UniMock.restore();
      expect(result).to.be.null;
      done();
    });
  });
});

/* TEST DOESNT WORK
describe('Update a university', () => {
    it("should update a university by id", (done) =>{
        let uniInfo = {
            "name": "Central Michigan",
            "nick_name": "Chippewas",
            "website": "http:&#x2F;&#x2F;www.cmich.edu",
            "city": "Mount Pleasant",
            "state": "Michigan",
            "primary_color": "6a0032",
            "secondary_color": "ffc82e",};
        let UniMock = sinon.mock(new University({ completed: true}));
        let uni = UniMock.object;
        var expectedResult = { status: true };
        // expectedResult.primary_color = 'maroon';
        UniMock.expects('save').once().withArgs({_id: 12345}).yields(null, expectedResult);
        uni.save((err,result) => {
            UniMock.verify();
            UniMock.restore();
            expect(result.primary_color).to.equal('maroon');
            done();
        })
    });
});
*/

// TODO: Delete test
