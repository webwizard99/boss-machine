const express = require('express');
const db = require('./db');
const apiRouter = express.Router();

// specific routers
const minionRouter = require('./routes/minions');
const ideaRouter = require('./routes/ideas');
const meetingRouter = require('./routes/meetings');

// hook specific routers into routes
apiRouter.use('/minions', minionRouter);
apiRouter.use('/ideas', ideaRouter);
apiRouter.use('/meetings', meetingRouter);

module.exports = apiRouter;
