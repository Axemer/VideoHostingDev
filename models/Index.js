const pool = require('./database');
const getVideoDuration = require('./utils');

function listVideos(app) {
    app.get('/', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM videos');
            const videos = result.rows;

            const enrichedVideos = videos.map(video => ({
                ...video,
                duration: getVideoDuration(video)
            }));

            res.render('index', { videos: enrichedVideos });
        } catch (err) {
            console.error('Ошибка обработки видео:', err);
            res.status(500).send('Ошибка сервера');
        }
    });
}

module.exports = listVideos;