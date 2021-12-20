const { assert } = require('console');
const mongoose = require('mongoose');

const Author = require('../models/author');

describe('Nesting records', function(done) {
    
    beforeEach(function(done) {
        mongoose.connection.collections.authors.drop(function() {
            done();
        })
    });

    it('Create an author with sub-documents', function(done) {
        var pat = new Author({
            name: 'Stephanie Mayer',
            age: 43,
            books: [
                {
                    title: 'Twilight',
                    pages: 740
                }
            ]
        });

        pat.save().then(function() {
            Author.findOne({
                name: 'Stephanie Mayer'
            }).then(function(record) {
                assert(record.books.length === 1)
            });
            done();
        });

    });

    it('Adds a book to an author', function(done) {

        var pat = new Author({
            name: 'Stephanie Mayer',
            age: 43,
            books: [
                {
                    title: 'Twilight',
                    pages: 740
                }
            ]
        });

        pat.save().then(function() {
            Author.findOne({ 
                name: 'Stephanie Mayer' 
            }).then(function(record) {
                record.books.push({
                    title: 'New Moon',
                    pages: 1240
                });
                record.save().then(function() {
                    Author.findOne({ 
                        name: 'Stephanie Mayer' 
                    }).then(function(record) {
                        assert(record.books.length === 2);
                        done();
                    })
                })
            })
        })

    });

});