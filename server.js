const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  Todo = require('./models/todo'),
  port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost:27017/vuenodedb', { useNewUrlParser: true }).then(
  () => {
    console.log('Database connection is successful')

    const app = express();
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(cors());

    app.post('/api/todos/create', (req, res) => {
      const todo = new Todo(req.body);
      todo.save(err => {
        if (err) res.status(500).send('Error when saving to database');
        else res.json({ status: 200, message: 'Todo successfully created' });
      });
    });
    
    app.get('/api/todos', (req, res) => {
      Todo.find((err, todos) => {
        if (err) res.status(500).send('Error when getting data from database');
        else res.json({ status: 200, message: 'Todos successfully received', data: todos });
      });
    });

    app.delete('/api/todos/delete/:id', (req, res) => {
      Todo.findByIdAndRemove({ _id: req.params.id }, { useFindAndModify: false }, err => {
        if (err) res.status(500).send('Error when deleting from database');
        else res.json({ status: 200, message: 'Todo successfully removed' });
      });
    });

    app.listen(port, () => {
      console.log('Listening on port ' + port);
    });
  
  },
  err => { console.log('Error when connecting to the database' + err) }
);
