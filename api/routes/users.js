var express = require('express');
var router = express.Router();
var pool = require('../db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

router.post('/', function (req, res) {
  const name = req.body.name;

  pool.query('INSERT INTO users (name) VALUES ($1)', [name], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.insertId}`)
  })
});

router.put('/:id', function (req, res) {
  const id = req.params.id;
  const { name } = req.body;

  pool.query(
    'UPDATE users SET name = $1 WHERE id = $2',
    [name, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
});

router.delete('/:id', function (req, res) {
  const id = req.params.id;
  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`User deleted with ID: ${id}`)
  })
});

module.exports = router;