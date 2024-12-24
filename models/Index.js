//const express = require('express');
const pool = require('./database'); // Подключаем базу данных
//const app = express();
const getVideoDuration = require('./utils');



function listVideos(app) {
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

    module.exports = listVideos;