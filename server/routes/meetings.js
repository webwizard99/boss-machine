const express = require('express');
const db = require('../db');
const meetingsRouter = express.Router();

meetingsRouter.get('/', (req, res) => {
  const allMeetings = db.getAllFromDatabase('meetings');
  res.status(200).send(allMeetings);
})

meetingsRouter.post('/', (req, res) => {
  let { time, date, day, note } = req.body;
  if (time && typeof time !== 'string') {
    time = time.toString();
  }

  if (day && typeof day !== 'string') {
    day = day.toString();
  }

  if (!time || !date || !day || !note) {
    res.status(400).send('Request to post a meeting is missing fields')
  } else {
    const newMeeting = db.addToDatabase('meetings', {
      time,
      date,
      day,
      note
    });
    res.status(200).send(newMeeting);
  }
});

meetingsRouter.delete('/', (req, res) => {
  const deleted = db.deleteAllFromDatabase('meetings');
  res.status(200).send(deleted);
})

module.exports = meetingsRouter;