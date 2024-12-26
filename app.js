// Подтягиваем зависимости 
const express = require('express');
const path = require('path');
const app = express();
const listVideos = require('./models/Index');
const SetVideo = require('./models/watch')

// порт на котором будет хостится сайт
const PORT = 3000;

// Устанавливаем папки для видео и изображений
const videosPath = path.join(__dirname, './Debug/Videos');
const imagesPath = path.join(__dirname, './Debug/Images');
const placeholderImage = '/Resorces/brainless confusion.jpg'; // Заглушка для иконок

// Устанавливаем статические папки
app.use('/videos', express.static(videosPath));
app.use('/Debug/Images', express.static(imagesPath));
app.use(express.static('public'));

// Настройка шаблонизатора
app.set('view engine', 'ejs');
app.set('views', './public/views');

// инициализация для списка видео на главной странице
listVideos(app);

// инициализация видео
SetVideo(app);

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
