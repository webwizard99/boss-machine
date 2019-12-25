const express = require('express');
const db = require('../db');
const workRouter = require('./work');
const minionRouter = express.Router();


minionRouter.param('id', (req, res, next, id) => {
  const minion = db.getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

minionRouter.use('/', workRouter);

minionRouter.get('/', (req, res) => {
  const allMinions = db.getAllFromDatabase('minions');
  res.status(200).send(allMinions);
});

minionRouter.get('/:id', (req, res) => {
  const thisMinion = req.minion;
  res.status(200).send(thisMinion);
});

minionRouter.post('/', (req, res) => {
  const { name, salary, title, weaknesses } = req.body;
  if (!name || !salary || !title || !weaknesses) {
    res.status(400).send('Missing parameters for minion post request');
  } else {
    const newMinion = db.addToDatabase('minions', {
      name,
      salary,
      title,
      weaknesses
    });
    res.status(200).send(newMinion);
  }
});

minionRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, salary, title, weaknesses } = req.body;
  if (!name || !salary || !title || !weaknesses) {
    res.status(400).send('Missing parameters for minion put request');
  } else {
    const updatedMinion = db.updateInstanceInDatabase('minions', {
      id,
      name,
      salary,
      title,
      weaknesses
    });
    res.status(200).send(updatedMinion);
  }
});

minionRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).send();
  } else {
    const deleted = db.deleteFromDatabasebyId('minions', id);
    res.status(200).send(deleted);
  }
})

module.exports = minionRouter;