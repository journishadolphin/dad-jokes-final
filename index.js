const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./api/auth/auth-router');
const jokesRouter = require('./api/jokes/jokes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', jokesRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log();
});
