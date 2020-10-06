const express = require('express');


const db = require('../data/dbConfig');

const router = express.Router();

//CRUD Opps

// Post new
router.post('/', (req, res) => {
  const postData = req.body;
  const name = req.body.name;
  const budget = req.body.budget;
  (!name || !budget || !Number.isInteger(budget))
    ? res.status(400).json({ message: "Please include a name and numerical budget" })
    : db('accounts').insert(postData, 'id')
      .then(indexModified => {
        res.status(200).json({ data: indexModified })
      })
      .catch(error => {
        res.status(500).json({ error: error.message })
      })
})

router.get('/', (req, res) => {
  db.select('*').from('accounts')
    .then(accounts => {
      res.status(200).json({ data: accounts })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

router.get('/:id', (req, res) => {
  db('accounts').where('id', '=', req.params.id)
    .then(accounts => {
      res.status(200).json({ data: accounts })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

router.put('/:id', (req, res) => {
  const changes = req.body;
  const name = req.body.name;
  const budget = req.body.budget;
  (!req.body.name || !req.body.budget || !Number.isInteger(req.body.budget) )
  ? res.status(400).json({ message: "Please include either a name and numerical budget" })
  : db('accounts').where({ id: req.params.id }).update(changes)
    .then(accountsModified => {
      res.status(200).json({ data: accountsModified })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

router.delete('/:id', (req, res) => {
  db('accounts').where({ id: req.params.id }).delete()
    .then(accountsModified => {
      res.status(200).json({ data: accountsModified })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
})

module.exports = router;
