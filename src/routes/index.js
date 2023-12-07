const express = require('express');
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const app = express();

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

module.exports = app;
