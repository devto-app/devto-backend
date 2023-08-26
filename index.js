require('dotenv').config();
const mongoose = require('mongoose');

const app = require('./src/server');
const port = 8080;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

mongoose
    .connect(URL)
    .then(() => {
        console.log('Dev.to DB connected 🟢');
        app.listen(port, () => {
            console.log(`Server listening on port ${port} 🔊`);
        });
    })
    .catch(() => {
        console.log('Oooops, smth went wrong 🔴');
    });
