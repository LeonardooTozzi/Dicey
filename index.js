const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/roll', (req, res) => {

    console.log('post')

    let roll = "ALOU"

    res.json({ roll });

});

app.get('/getRoll', (req) => {

    console.log('get')

});



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
