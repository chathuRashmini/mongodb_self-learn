const { assert } = require('console');
const mocha = require('mocha');

const MarioChar = require('../models/mariochar');

describe('Finding records', function(done) {

    var char;

    beforeEach(function(done) {
        char = new MarioChar({
            name: 'Mario'
        });

        char.save().then(function() {
            done();
        });
    })

    it('Finds a record from the db', function(done) {
        MarioChar.findOne({
            name: 'Mario'
        }).then(function(result) {
            assert.apply(result.name === 'Mario');
            done();
        });
    });

    it('Finds a record from the db by ID', function(done) {
        MarioChar.findOne({
            _id: char._id
        }).then(function(result) {
            assert.apply(result._id.toString() === char._id.toString());
            done();
        });
    });

});