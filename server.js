var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vuenodedb', { useNewUrlParser: true }).then(
  () => { console.log('Database connection is successful') },
  err => { console.log('Error when connecting to the database' + err) }
);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var Todo = require('./models/Todo');

app.post('/api/create', (req, res) => {
  var todo = new Todo(req.body);
  todo.save().then(todo => {
    res.status(200).json({ 'message': 'Todo successfully added ' });
  })
  .catch(err => {
    res.status(400).send('Error when saving to database');
  });
});

app.get('/api/todos', (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(todos);
    }
  });
});

app.get('/api/todos/:id', (req, res) => {
  var id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

app.delete('/api/delete/:id', (req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }, (err, todo) => {
    if (err) res.json(err);
    else res.json('Todo successfully removed');
  });
});


var port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});