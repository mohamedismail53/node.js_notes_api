// setup server
const express = require('express');
const cors = require('cors');
let bodyParser = require('body-parser');
const noteRoute = require('./routes/noteRoute');
const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World Server');
});

app.use('/api/v1', noteRoute);

app.listen(port, () => {
    console.log('Connected To The Server');
});