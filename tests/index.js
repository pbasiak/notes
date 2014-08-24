'use strict'

var assert = require('assert');

suite('MeteoNote Test', function() {

  test('dodaj listę - klient', function(done, client) {
    client.eval(function() {
        Lists.insert({
          name: "testowa",
        });
    var lista = Lists.find({ name: 'testowa'}).fetch();
    emit('lista', lista);
    });

    client.once('lista', function(lista) {
         assert.equal(lista.length, 1);
         done();
       });
  });

  

});