const getVideoDuration = require('./utils');
const pool = require('./database'); // Подключаем базу данных

// выделяем поля 
let commentsResult = null;
let videoResult = null;
let video = null;
let videoId = null;
let comments = null;
let suggestedResult = null;
let suggestedVideos = null;
let uploadDate = null;
let path = null;
let videoDuration = null;

function SetVideo(app){
    app.get('/watch/:id', async (req, res) => {
        videoId = req.params.id;
    
        try {
            // Получение данных о выбранном видео
            videoResult = await pool.query('SELECT * FROM videos WHERE id = $1', [videoId]);
            video = videoResult.rows[0];
    
            if (!video) {
                return res.status(404).send('Видео не найдено');
            }
    
            // console.log(video.id);           
            // console.log(video.title);        
            // console.log(video.description); 
            // console.log(video.uploaded_at)
            // console.log(video.video_file)
            // console.log(video.duration)

            // Получение комментариев к видео
            commentsResult = await pool.query('SELECT * FROM post_comments WHERE video_id = $1 ORDER BY created_at DESC', [videoId]);
            comments = commentsResult.rows;
    
            // Получение списка рекомендуемых видео
            suggestedResult = await pool.query('SELECT * FROM videos WHERE id != $1 LIMIT 20', [videoId]);
            suggestedVideos = suggestedResult.rows;

            // Получение даты выхода
            uploadDate = new Date(video.uploaded_at).toLocaleDateString('ru-RU');

            // указываем путь на видеофайл
            path = video.video_file

            // Вычисляем сколько длится видио
            videoDuration = getVideoDuration(video)

            // Увеличиваем число просмотров
            await pool.query('UPDATE videos SET views = views + 1 WHERE id = $1', [videoId]);
    
            res.render('watch', { video, comments, suggestedVideos, uploadDate, path, videoDuration });
        } catch (err) {
            console.error('Ошибка загрузки видео:', err);
            res.status(500).send('Ошибка загрузки видео');
        }
    });
}

module.exports = SetVideo;