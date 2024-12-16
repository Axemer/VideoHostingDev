const { Pool } = require('pg');

// Настройки подключения к базе данных
const pool = new Pool({
    user: 'VideoHostingWebSite-Alae',        // Имя пользователя PostgreSQL
    host: 'localhost',            // Хост базы данных
    database: 'video_hosting',    // Имя базы данных
    password: "+=UDjoYW99tR:sT&FfRaU^a;37Dmr#sUj.ZtD-o>V%3DyqwW>p9aWcgFY",    // Пароль пользователя
    port: 5432,                   // Порт подключения
});

// Проверка подключения
pool.connect((err, client, release) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.stack);
    } else {
        console.log('Успешное подключение к базе данных');
        release();
    }
});

module.exports = pool;
