// Подтягиваем зависимости 
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const pool = require('./models/database'); // Подключаем базу данных
const getVideoDuration = require('./models/utils');

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

// Данные для видео (заменить реальной логикой) DEBUG !!!!!!!!!!
const videos = [
    { id: '1', title: 'Test video placeholder', path: '/videos/Test video placeholder.mp4', thumbnail: '/Debug/Images/brainless confusion.jpg', author: 'Канал 1', views: 1000, duration: '10:23', description: 'Описание видео 1', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] },
    { id: '2', title: 'AI Minecraft', path: '/videos/AI Minecraft.mp4', thumbnail: '/Debug/Images/Ai Minecraft.png', author: 'Канал 2', views: 2000, duration: '5:12', description: 'Описание видео 2', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] },
    { id: '3', title: 'Cat Video', path: '/videos/Cat Video.mp4', thumbnail: '/Debug/Images/Cat Video.jpg', author: 'Канал 3', views: 1500, duration: '8:45', description: 'Описание видео 3', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] },
    { id: '4', title: 'pokemon anim', path: '/videos/pokemon anim.mp4', thumbnail: '/Debug/Images/pokemon anim.PNG', author: 'Канал 4', views: 3000, duration: '7:20', description: 'Описание видео 4', comments: [{ author: 'Пользователь 1', text: 'Отличное видео!' },{ author: 'Пользователь 2', text: 'Спасибо за информацию.' }] }
];
// Данные для видео (заменить реальной логикой) DEBUG !!!!!!!!!!

function listVideos() {
//// Часть с фетчером видео с папки
// Главная страница
app.get('/', async (req, res) => {
    try {
        // Запрос для получения списка видео
        const result = await pool.query('SELECT * FROM videos');
        const videos = result.rows;

        // Обогащение каждого видео его длительностью
        const enrichedVideos = videos.map(video => ({
            ...video,
            duration: getVideoDuration(video) // Добавляем поле "duration" с вызовом функции
        }));

        res.render('index', { videos: enrichedVideos });
    } catch (err) {
        console.error('Ошибка обработки видео:', err);
        res.status(500).send('Ошибка сервера');
    }
});

}

// инитка для листа видео на главной странице
listVideos();

function SetVideo(){
    app.get('/video/:id', async (req, res) => {
        const videoId = req.params.id;
    
        try {
            // Получение данных о выбранном видео
            const videoResult = await pool.query('SELECT * FROM videos WHERE id = $1', [videoId]);
            const video = videoResult.rows[0];
    
            if (!video) {
                return res.status(404).send('Видео не найдено');
            }
    
            console.log(video.id);           
            console.log(video.title);        
            console.log(video.description); 
            console.log(video.uploaded_at)
            console.log(video.video_file)
            console.log(video.duration)
            // Получение комментариев к видео
            const commentsResult = await pool.query('SELECT * FROM post_comments WHERE video_id = $1 ORDER BY created_at DESC', [videoId]);
            const comments = commentsResult.rows;
    
            // Получение списка рекомендуемых видео
            const suggestedResult = await pool.query('SELECT * FROM videos WHERE id != $1 LIMIT 10', [videoId]);
            const suggestedVideos = suggestedResult.rows;

            // Получение даты выхода
            //const uploadDate = video.uploaded_at
            const uploadDate = new Date(video.uploaded_at).toLocaleDateString('ru-RU');

            // указываем путь на видеофайл
            const path = video.video_file

            const videoDuration = getVideoDuration(video)
    
            res.render('video', { video, comments, suggestedVideos, uploadDate, path, videoDuration });
        } catch (err) {
            console.error('Ошибка загрузки видео:', err);
            res.status(500).send('Ошибка загрузки видео');
        }
    });
}

SetVideo();

/// Обработка маршрута для просмотра видео
// app.get('/video/:id', (req, res) => {
//     const videoId = req.params.id;

//     // Найти выбранное видео
//     const video = videos.find(v => v.id === videoId);

//     if (!video) {
//         return res.status(404).send('Видео не найдено');
//     }

//     // Исключить текущее видео из предложений
//     const suggestedVideos = videos.filter(v => v.id !== videoId);

//     res.render('video', { video, suggestedVideos });
// });
/// Обработка маршрута для просмотра видео

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
