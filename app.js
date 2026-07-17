require('dotenv').config();

const express = require('express');

const app = express();
const listVideos = require('./models/Index');
const SetVideo = require('./models/watch')

const PORT = 3000;

app.use('/Debug/Images', express.static('Debug/Images'));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './public/views');

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/chanel', (req, res) => {
    res.render('chanel');
});

listVideos(app);
SetVideo(app);

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
