const express = require('express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boardRouter')

const app = express();

// middleware로 던져줌 -> 원하는 url로 분기를 시킬 수 있음
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/board', boardsRouter)

module.exports = app;
