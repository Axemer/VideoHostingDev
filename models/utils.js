const parseInterval = (interval) => {
    const hours = interval.hours || 0;
    const minutes = interval.minutes || 0;
    const seconds = interval.seconds || 0;

    return { hours, minutes, seconds };
};

const intervalToTime = (interval) => {
    const { hours, minutes, seconds } = interval;

    if (hours === 0) {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const getVideoDuration = (video) => {
    return intervalToTime(parseInterval(video.duration))
}


module.exports = getVideoDuration;