const pool = require('./database');
const getVideoDuration = require('./utils');

function SetVideo(app) {
    app.get('/watch/:id', async (req, res) => {
        const videoId = req.params.id;

        try {
            const videoResult = await pool.query('SELECT * FROM videos WHERE id = $1', [videoId]);
            const video = videoResult.rows[0];

            if (!video) {
                return res.status(404).send('Видео не найдено');
            }

            const commentsResult = await pool.query('SELECT * FROM comments WHERE video_id = $1 ORDER BY created_at DESC', [videoId]);
            const comments = commentsResult.rows;

            const suggestedResult = await pool.query('SELECT * FROM videos WHERE id != $1 LIMIT 20', [videoId]);
            const suggestedVideos = suggestedResult.rows;

            const uploadDate = new Date(video.uploaded_at).toLocaleDateString('ru-RU');
            const videoPath = video.video_file;
            const videoDuration = getVideoDuration(video);

            res.render('watch', { video, comments, suggestedVideos, uploadDate, path: videoPath, videoDuration });
        } catch (err) {
            console.error('Ошибка загрузки видео:', err);
            res.status(500).send('Ошибка загрузки видео');
        }
    });
}

module.exports = SetVideo;
