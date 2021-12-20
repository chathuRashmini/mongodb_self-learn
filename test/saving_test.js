const { assert } = require('console');
const mocha = require('mocha');

const MarioChar = require('../models/mariochar');

describe('Saving records', function() {

    it('Saves a record to the db', function(done) {
        var char = new MarioChar({
            name: 'Mario'
        });

        char.save().then(function() {
            //when isNew is true, that means char is not saved in db
            assert(char.isNew === false);
            done();
        });
    });

});