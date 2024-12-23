//const ffmpeg = require('fluent-ffmpeg'); // ранее использовалось для вычисления сколько видос длится
//const parseInterval = require('postgres-interval');

// Функция для получения длительности видео
// function getVideoDuration(videoPath) {
//     return new Promise((resolve, reject) => {
//         ffmpeg.ffprobe(videoPath, (err, metadata) => {
//             if (err) return reject(err);
//             const durationInSeconds = metadata.format.duration || 0;
//             const minutes = Math.floor(durationInSeconds / 60);
//             const seconds = Math.floor(durationInSeconds % 60).toString().padStart(2, '0');
//             resolve(`${minutes}:${seconds}`);
//         });
//     });
// }
// Функция для получения длительности видео

// function getVideoId(videoName){
//     videos.forEach(element => {
//         if (element.title == videoName)
//             return element.id
//     });
// }
const parseInterval = (interval) => {
    const hours = interval.hours || 0; // Часы, если есть
    const minutes = interval.minutes || 0; // Минуты, если есть
    const seconds = interval.seconds || 0; // Секунды

    return { hours, minutes, seconds };
};


const intervalToTime = (interval) => {
    const { hours, minutes, seconds } = interval;

    // Если меньше часа, возвращаем MM:SS
    if (hours === 0) {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Если больше часа, возвращаем HH:MM:SS
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};



/// Форматирование длительности видео в читаемый форма
function getVideoDuration(video){
    // 
    const rawInterval = video.duration; // Значение из базы данных
    const interval = parseInterval(rawInterval);
    const videoDuration = intervalToTime(interval);
    return videoDuration
}


module.exports = getVideoDuration;