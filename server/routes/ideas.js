const express = require('express');
const db = require('../db');
const checkMillion = require('../checkMillionDollarIdea');
const ideaRouter = express.Router();

ideaRouter.param('id', (req, res, next, id) => {
  const idea = db.getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
})

ideaRouter.get('/', (req, res) => {
  const allIdeas = db.getAllFromDatabase('ideas');
  res.status(200).send(allIdeas);
});

ideaRouter.get('/:id', (req, res) => {
  const thisIdea = req.idea;
  res.status(200).send(thisIdea);
});

ideaRouter.post('/', checkMillion, (req, res) => {
  const { name, description, numWeeks, weeklyRevenue } = req.body;

  if (!name || !description || !numWeeks || !weeklyRevenue) {
    res.status(400).send('Missing information to add idea to database!')
  } else {
    const newIdea = db.addToDatabase('ideas', {
      name,
      description,
      numWeeks,
      weeklyRevenue
    });
    res.status(200).send(newIdea);
  }
});

ideaRouter.put('/:id', checkMillion, (req, res) => {
  const { id } = req.params;
  const { name, description, numWeeks, weeklyRevenue } = req.body;

  if (!name || !description || !numWeeks || !weeklyRevenue) {
    res.status(400).send('Missing information to update idea in database!')
  } else {
    const updatedIdea = db.updateInstanceInDatabase('ideas', {
      id,
      name,
      description,
      numWeeks,
      weeklyRevenue
    });
    res.status(200).send(updatedIdea);
  }
});

ideaRouter.delete(':/id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).send();
  } else {
    const deleted = db.deleteFromDatabasebyId('ideas', id);
    res.status(200).send(deleted);
  }
});

module.exports = ideaRouter;