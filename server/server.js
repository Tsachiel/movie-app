const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(cors());
app.use(json());

const API_KEY = 'd8440475';
const USER_REQUEST = `https://www.omdbapi.com/?apikey=${API_KEY}`;

app.get('/', async (req, res) => {

});

app.get('/Movies', async (req, res) => {
    const response = await axios.get(USER_REQUEST, {
        params: {
            s: req.query.s
        }
    })
    return res.send({ data: response.data });
});

app.get('/MovieData', async (req, res) => {
    const response = await axios.get(USER_REQUEST, {
        params: {
            i: req.query.i
        }
    })
    return res.send({ data: response.data });
});

if(process.env.NODE_ENV === 'production'){
    app.use('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`SERVER RUNNING ON PORT ${PORT}`));