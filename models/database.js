require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
});

pool.connect()
    .then(() => console.log('Успешное подключение к базе данных'))
    .catch(err => console.error('Ошибка подключения к базе данных:', err.message));

module.exports = pool;
