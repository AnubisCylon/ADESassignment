const express = require('express');
const path = require('path');
const ApiRouter = require('./router/api');
const createHttpErrors = require('http-errors')
const pool = require('./database')
const cors = require('cors')
const Quote = require('inspirational-quotes');

const app = express();
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.get("/", function(req, res) {
  res.send(Quote.getQuote());
});
app.use(cors())

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client')));

app.use('/api', ApiRouter);

app.use((req, res, next) => {
    next(
      createHttpErrors(404, `Unknown Resource ${req.method} ${req.originalUrl}`),
    );
    
  });

app.use((error, req, res, next) => {
    console.error(error);
    return res.status(error.status || 500).json({
        error: error.message || 'Unknown Error boi!!',
    })
})

pool.connect()

app.listen(5000, function() {
    console.log('Now listening on Gou-zen')
})