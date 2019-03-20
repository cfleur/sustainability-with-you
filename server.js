const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 5007;
const formRouter = require('./server/routes/formRoutes/formRoutes');

app.use(morgan('dev'));

// BodyParser decode data in different formats.
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({ info: ' Postgresql DB, Express & Nodejs App' });
});

// REST API end points under '/'
app.use('/api/formData', formRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

if (process.env.node_env === 'production') {
  //The catchall handler : if some request that does not match, send back React's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
