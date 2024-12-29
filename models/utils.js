//const ffmpeg = require('fluent-ffmpeg'); // ранее использовалось для вычисления сколько видос длится
//const parseInterval = require('postgres-interval');

// Старая Функция для получения длительности видео
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

 // старая функция для фетча id видоса
function getVideoId(videoName){
     videos.forEach(element => {
         if (element.title == videoName)
             return element.id
     });
 }

// парсит интервалы posgres в перменные времени
let parseInterval = (interval) => {
    const hours = interval.hours || 0; // Часы, если есть
    const minutes = interval.minutes || 0; // Минуты, если есть
    const seconds = interval.seconds || 0; // Секунды

    return { hours, minutes, seconds };
};

// форматирует из времени в читаемый формат врмение MM:SS или HH:MM:SS
let intervalToTime = (interval) => {
    const { hours, minutes, seconds } = interval;

    // Если меньше часа, возвращаем MM:SS
    if (hours === 0) {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Если больше часа, возвращаем HH:MM:SS
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

/// Форматирование длительности видео в читаемый формаn
function getVideoDuration(video){
    return intervalToTime(parseInterval(video.duration))
}


module.exports = getVideoDuration;