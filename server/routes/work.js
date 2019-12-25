const express = require('express');
const db = require('../db');
const workRouter = express.Router();

workRouter.param('minionId', (req, res, next, id) => {
  req.minionId = id;
  next();
})

workRouter.get('/:minionId/work', (req, res) => {
  const { id } = req.params;
  const minionWork = db.getAllFromDatabase('work', id);
  if (!minionWork) {
    res.status(404).send();
  } else {
    res.status(200).send(minionWork);
  }
});

workRouter.post('/:minionId/work', (req, res) => {
  
  const minionId = req.minionId;
  
  let { title, description, hours } = req.body;

  if (hours && typeof hours !== 'number') {
    hours = Number.parseInt(hours);
  }

  if (!title || !description || !hours) {
    res.status(400).send();
  } else {
    const newWork = db.addToDatabase('work', {
      title,
      description,
      hours,
      minionId
    });
    res.status(200).send(newWork);
  }
});

workRouter.put('/:minionId/work/:workId', (req, res) => {
  const minionId = req.minionId;
  const id = req.params.workId;

  let { title, description, hours } = req.body;

  if (hours && typeof hours !== 'number') {
    hours = Number.parseInt(hours);
  }

  if (!title || !description || !hours) {
    res.status(400).send();
  } else {
    const updatedWork = db.updateInstanceInDatabase('work', {
      id,
      title,
      description,
      hours,
      minionId
    });
    res.status(200).send(updatedWork);
  }
});

workRouter.delete('/:minionId/work/:workId', (req, res) => {
  const id = req.params.workId;

  const deleted = db.deleteFromDatabasebyId('work', id);
  res.status(200).send(deleted);
});

module.exports = workRouter;
