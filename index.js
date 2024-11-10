const express = require('express');

const app = express();
const port = process.env.PORT || 8080

app.use(express.json());
app.use('/', require('./roll/dice'));

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Dicey is running`);
});
