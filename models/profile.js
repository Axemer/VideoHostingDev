
function profile(app){
    // Данные профиля пользователя
    const userProfile = {
    name: 'Иван Иванов',
    avatar: 'https://via.placeholder.com/150',
    description: 'Любитель видео и технологий. Здесь вы найдете мои любимые видео и проекты!'
    };

    // Маршрут для профиля
    app.get('/profile', (req, res) => {
    res.render('profile', { user: userProfile });
    });
}


module.exports = profile;