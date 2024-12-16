const ffmpeg = require('fluent-ffmpeg'); // ранее использовалось для вычисления сколько видос длится

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

module.exports = VideoPuller;