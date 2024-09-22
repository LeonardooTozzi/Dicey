const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', require('./roll/dice'));

app.listen(port, () => {
  console.log(`Server is running`);
});
