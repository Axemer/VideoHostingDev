// Подтягиваем зависимости 
const express = require('express');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const app = express();
const PORT = 3000;

// Устанавливаем папки для видео и изображений
const videosPath = path.join(__dirname, './Debug/Videos');
const imagesPath = path.join(__dirname, './Debug/Images');
const placeholderImage = '/Debug/Images/brainless confusion.jpg'; // Заглушка для иконок

// Устанавливаем статические папки
app.use('/videos', express.static(videosPath));
app.use('/Debug/Images', express.static(imagesPath));
app.use(express.static('public'));

// Настройка шаблонизатора
app.set('view engine', 'ejs');
app.set('views', './public/views');

// Функция для получения длительности видео
function getVideoDuration(videoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) return reject(err);
            const durationInSeconds = metadata.format.duration || 0;
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = Math.floor(durationInSeconds % 60).toString().padStart(2, '0');
            resolve(`${minutes}:${seconds}`);
        });
    });
}
// Функция для получения длительности видео

function getVideoId(videoName){
    videos.forEach(element => {
        if (element.title == videoName)
            return element.id
    });
}

// Данные для видео (заменить реальной логикой) DEBUG !!!!!!!!!!
const videos = [
    { id: '1', title: 'Test video placeholder', path: '/videos/Test video placeholder.mp4', thumbnail: '/Debug/Images/thumbnail1.jpg', author: 'Канал 1', views: 1000, duration: '10:23', description: 'Описание видео 1', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] },
    { id: '2', title: 'AI Minecraft', path: '/videos/AI Minecraft.mp4', thumbnail: '/Debug/Images/thumbnail2.jpg', author: 'Канал 2', views: 2000, duration: '5:12', description: 'Описание видео 2', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] },
    { id: '3', title: 'Cat Video', path: '/videos/Cat Video.mp4', thumbnail: '/Debug/Images/thumbnail3.jpg', author: 'Канал 3', views: 1500, duration: '8:45', description: 'Описание видео 3', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] },
    { id: '4', title: 'pokemon anim', path: '/videos/pokemon anim.mp4', thumbnail: '/Debug/Images/pokemon anim.PNG', author: 'Канал 4', views: 3000, duration: '7:20', description: 'Описание видео 4', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] }
];
// Данные для видео (заменить реальной логикой) DEBUG !!!!!!!!!!

function listVideos() {
//// Часть с фетчером видео с папки
// Главная страница
app.get('/', async (req, res) => {
    try {

        // Старая реализация в старой копии там все в коментах есть
        // БЫЛА УСТАНОВЛЕНА ВРЕМЕННАЯ СИСТЕМА С МАССОВОМ ПОТОМ НАДО УБРАТЬ НЕ ПОТЕРЯЙ ЭТУ МЫСЛЬ ПЖ
        // ТУТ РАНЕЕ БЫЛА ЛОГИКА ПО ФЕТЧУ ВИДЕО БЕЗ ГОТОВОГО МАССИВА

        res.render('index', { videos });
    } catch (err) {
        console.error('Ошибка обработки видео:', err);
        res.status(500).send('Ошибка сервера');
    }
});
}

// инитка для листа видео на главной странице
listVideos();

/// Обработка маршрута для просмотра видео
app.get('/video/:id', (req, res) => {
    const videoId = req.params.id;

    // Найти выбранное видео
    const video = videos.find(v => v.id === videoId);

    if (!video) {
        return res.status(404).send('Видео не найдено');
    }

    // Исключить текущее видео из предложений
    const suggestedVideos = videos.filter(v => v.id !== videoId);

    res.render('video', { video, suggestedVideos });
});
/// Обработка маршрута для просмотра видео

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
