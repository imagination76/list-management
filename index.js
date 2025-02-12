const express = require('express');
const app = express();
const port = 3000;
const app
app.use(express.json());

let todos = [
  { id: 1, title: 'Learn Node.js', completed: false },
  { id: 2, title: 'Build a REST API', completed: false },
];

// Welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List API!');
});

// Get all to-dos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a single to-do by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

// Add a new to-do
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a to-do
app.put('/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');

  todo.title = req.body.title !== undefined ? req.body.title : todo.title;
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;

  res.json(todo);
});

// Delete a to-do
app.delete('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (todoIndex === -1) return res.status(404).send('Todo not found');

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`To-Do List API server running at http://localhost:${port}`);
});
