const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

const bodyparser = require('body-parser');

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyparser.urlencoded({
    extended: true
}))
const appRouter = require('./routes/app.routes');
app.use(appRouter);


const port = process.env.PORT;

require(path.join(__dirname, '/config', 'database'))();

app.listen(port, () => {
    console.log(`Server is connected @ http://127.0.0.1:${port}`);
})
