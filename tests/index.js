
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

  test('dodaj listę - nazwa dwuczlonowa - klient', function(done, client) {
    client.eval(function() {
        Lists.insert({
          name: "testowa lista",
        });
    var lista2 = Lists.find({ name: 'testowa lista'}).fetch();
    emit('lista2', lista2);
    });

    client.once('lista2', function(lista2) {
         assert.equal(lista2.length, 1);
         done();
       });
  });

  test('dodaj listę - pusta wartosc - klient', function(done, client) {
    client.eval(function() {
        Lists.insert({
          name: "",
        });
    var lista3 = Lists.find({ name: ''}).fetch();
    emit('lista3', lista3);
    });

    client.once('lista3', function(lista3) {
         assert.equal(lista3.length, 1);
         done();
       });
  });

  test('usunięcie listy - klient', function(done, client) {
    client.eval(function() {
    	Lists.insert({
    		name: "testowaD",
    	})
        Lists.remove({
          name: "testowaD",
        });
    var lista4 = Lists.find({ name: 'testowaD'}).fetch();
    emit('lista4', lista4);
    });

    client.once('lista4', function(lista4) {
         assert.equal(lista4.length, 0);
         done();
       });
  });

  

});