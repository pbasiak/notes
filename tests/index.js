
var assert = require('assert');

suite('MeteoNote Test', function() {


    test('#0 server initialization', function(done, server) {
    server.eval(function() {
      var td = Todos.find().fetch();
      emit('td', td);
    }).once('td', function(td) {
      assert.equal(td.length, 0);
      done();
    });
  });

  test('#1 dodaj listę - klient', function(done, client) {
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

  test('#2 dodaj listę - nazwa dwuczlonowa - klient', function(done, client) {
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

  test('#3 dodaj listę - pusta wartosc - klient', function(done, client) {
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

  test('#4 usunięcie listy - klient', function(done, client) {
    client.eval(function() {
    	Lists.insert({
    		name: "testowaD",
    	});
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

  test('#5 dodawanie zadania - klient', function(done, client) {
    client.eval(function() {
    	Lists.insert({
    		name: "Lista1",
    	});
    	Todos.insert({
    		todotext: "Kupić mleko",
    		listid: "Lista1",
    	});
    var todos = Todos.find({ todotext: 'Kupić mleko'}).fetch();
    emit('todos', todos);
    });

    client.once('todos', function(todos) {
         assert.equal(todos.length, 1);
         done();
       });
  });

  test('#6 dodawanie zadania - puste pole - klient', function(done, client) {
    client.eval(function() {
    	Lists.insert({
    		name: "Lista1",
    	});
    	Todos.insert({
    		todotext: "",
    		listid: "Lista1",
    	});
    var todos2 = Todos.find({ todotext: ''}).fetch();
    emit('todos2', todos2);
    });

    client.once('todos2', function(todos2) {
         assert.equal(todos2.length, 1);
         done();
       });
  });

  test('#7 dodawanie zadania - długa nazwa - klient', function(done, client) {
    client.eval(function() {
    	Todos.insert({
    		todotext: "Bardzo dluga nazaw.....................asdsadaddsaad&&24q2eadsajhsafsasadasdsaadssadads",
    	});
    var todos3 = Todos.find({ todotext: 'Kupić mleko'}).fetch();
    emit('todos3', todos3);
    });

    client.once('todos3', function(todos3) {
         assert.equal(todos3.length, 0);
         done();
       });
  });

  test('#8 usuwanie zadania - klient', function(done, client) {
    client.eval(function() {
    	Todos.insert({
    		todotext: "Kupić mleko",
    	});
    	Todos.remove({
    		todotext: "Kupić mleko"
    	});
    var todos4 = Todos.find({ todotext: 'Kupić mleko'}).fetch();
    emit('todos4', todos4);
    });

    client.once('todos4', function(todos4) {
         assert.equal(todos4.length, 0);
         done();
       });
  });

  test('#9 dodawanie zadania - zadanie wykonane - klient', function(done, client) {
    client.eval(function() {
    	Lists.insert({
    		name: "Lista1",
    	});
    	Todos.insert({
    		todotext: "Kupić mleko",
    		listid: "Lista1",
    		done: true;
    	});
    var todos5 = Todos.find({ todotext: 'Mleko kupione'}).fetch();
    emit('todos5', todos5);
    });

    client.once('todos5', function(todos5) {
         assert.equal(todos5.length, 1);
         done();
       });
  });

  test('#10 dodawanie zadania - zadanie niewykonane - klient', function(done, client) {
    client.eval(function() {
    	Lists.insert({
    		name: "Lista1",
    	});
    	Todos.insert({
    		todotext: "Kupić mleko",
    		listid: "Lista1",
    		done: false;
    	});
    var todos6 = Todos.find({ todotext: 'Kupić mleko'}).fetch();
    emit('todos6', todos6);
    });

    client.once('todos6', function(todos6) {
         assert.equal(todos6.length, 1);
         done();
       });
  });

});