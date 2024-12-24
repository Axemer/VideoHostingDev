const getVideoDuration = require('./utils');
const pool = require('./database'); // Подключаем базу данных

//const app = express();

function SetVideo(app){
    app.get('/watch/:id', async (req, res) => {
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
    
            res.render('watch', { video, comments, suggestedVideos, uploadDate, path, videoDuration });
        } catch (err) {
            console.error('Ошибка загрузки видео:', err);
            res.status(500).send('Ошибка загрузки видео');
        }
    });
}

module.exports = SetVideo;