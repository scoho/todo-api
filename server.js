var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [ {
	id: 1,
	description: 'meet friend for lunch',
	completed: false,
}, {
	id: 2,
	description: 'go to market',
	completed: false
}, {
	id: 3,
	description: 'drink coffee',
	completed: true
}];

app.get('/', function (req, res) {
	res.send('todo API root');
});

// GET /todos
// in Postman, choose GET and enter http://localhost:3000/todos to check the request
app.get('/todos', function (req, res) {
	res.json(todos); // automatically converts info to json, since we can only work with strings
})

// GET /todos/:id
// in Postman, choose GET and enter http://localhost:3000/todos/:id where :id is the id code (without :) of the item to get
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10); // this grabs the :id entered by user; parseInt converts string id to a number
	var matchedTodo;
	// res.send('...requesting todo with id of ' + todoId + '...');

	for (i = 0; i < todos.length && !matchedTodo; i++) {
		if (todoId === todos[i].id) {
			matchedTodo = true;
			res.json(todos[i]);
		}
	}

	if (!matchedTodo) {
		res.status(404).send();
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});