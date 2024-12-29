class Channel {
    constructor(name, avatar, description, videos) {
        this.name = name;
        this.avatar = avatar;
        this.description = description;
        this.videos = videos;
    }

    getChannelData() {
        return {
            name: this.name,
            avatar: this.avatar,
            description: this.description,
            videos: this.videos
        };
    }
}

// Пример данных канала
const exampleChannel = new Channel(
    'Иван Иванов',
    'https://via.placeholder.com/150',
    'Любитель видео и технологий. Здесь вы найдете мои любимые видео и проекты!',
    [
        { title: 'Первое видео', url: 'https://www.example.com/video1' },
        { title: 'Второе видео', url: 'https://www.example.com/video2' },
        { title: 'Третье видео', url: 'https://www.example.com/video3' }
    ]
);

module.exports = exampleChannel;


// function chanel(){

// }
// module.exports = chanel;