const { assert } = require('console');
const mocha = require('mocha');

const MarioChar = require('../models/mariochar');

describe('Updating records', function(done) {

    var char;

    beforeEach(function(done) {
        char = new MarioChar({
            name: 'Mario',
            weight: 50
        });

        char.save().then(function() {
            done();
        });
    })

    it('Update a record in the db', function(done) {
        MarioChar.findOneAndUpdate(
            { name: 'Mario' }, 
            { name: 'Luigi' }
        ).then(function() {
            MarioChar.findOne({ 
                _id: char._id 
            }).then(function(result) {
                assert(result.name === 'Luigi');
                done();
            })
        });
    });

    it('Increment weights by 1', function(done) {
        MarioChar.updateMany({}, { $inc: { weight: 1 } }).then(function() {
            MarioChar.findOne({
                name: 'Mario'
            }).then(function(record) {
                assert(record.weight === 51);
                done();
            });
        });
    });

});