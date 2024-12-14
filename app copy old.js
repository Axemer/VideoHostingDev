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

// Возвращает список всех файлов видео из папки
// function getVideos(videosPath) {
//     const files = fs.readdirSync(videosPath);
//     // Фильтруем видеофайлы
//     return files.filter(file => /\.(mp4|avi|mkv|mov)$/i.test(file));
// }
// НЕ РАБОТАЕТ ОШИБКА ПРИ ПОПЫТКЕ ИСПОЛЬЗОВАТЬ .MAP

// Функция по выводу всписка видосов на главной странице
/// фетчит видосы из папки просто 
//// УСТАРЕЛО

function listVideos() {
//// Часть с фетчером видео с папки
// Главная страница
app.get('/', async (req, res) => {
    try {

        ////////////////////////// Реализация через обзор папки с видео
        // СТАРАЯ реализация на месте
        // const files = fs.readdirSync(videosPath);
        // const videoFiles = files.filter(file => /\.(mp4|avi|mkv|mov)$/i.test(file));
        // УБРАТЬ

        // Формируем данные для каждого видео
        // const videos = await Promise.all(
        //     videoFiles.map(async (file) => {
        //         const videoName = path.parse(file).name;
        //         const filePath = path.join(videosPath, file);
        //         const iconPath = path.join(imagesPath, `${videoName}.jpg`);

        //         // Получаем длительность
        //         const duration = await getVideoDuration(filePath);

        //         //const id = getVideoId(videoName);

        //         return {
        //             //id: id ,
        //             title: videoName,
        //             filePath: `/videos/${file}`,
        //             thumbnail: fs.existsSync(iconPath) ? `/Debug/Images/${videoName}.png` : placeholderImage, // работает странно
        //             duration,
        //             views: Math.floor(Math.random() * 10000),
        //             author: 'Unknown',
        //         };
        //     })
        // );
        ////////////////////////// Реализация через обзор папки с видео

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

//// Часть с фетчером видео с папки на главной странице
//// Часть с видео для страници видео
// app.get('/video/:id', (req, res) => {
//     const videoId = req.params.id;
//     //const videoName = path.parse(file).name;

//     // Пример данных для одного видео
//     const video = {
//         id: videoId,
//         title: 'videoName',
//         path: `/videos/Test video placeholder.mp4`,
//         likes: 120,
//         dislikes: 10,
//         channelIcon: '/Debug/Images/sample-channel.png',
//         channelName: 'Канал Пример',
//         subscribers: 5200,
//         views: 34567,
//         dateAdded: '2024-12-01',
//         description: 'Это пример описания видео.',
//         comments: [
//             { author: 'Пользователь 1', text: 'Отличное видео!' },
//             { author: 'Пользователь 2', text: 'Спасибо за информацию.' }
//         ]
//     };

//     // Пример предложенных видео
//     const suggestedVideos = [
//         { id: '2', title: 'Следующее видео 1' },
//         { id: '3', title: 'Следующее видео 2' },
//         { id: '4', title: 'Следующее видео 3' }
//     ];

//     res.render('video', { video, suggestedVideos });
// });
//// Часть с видео

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
