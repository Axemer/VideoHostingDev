// Импортируем Express
const express = require('express');
const app = express();

// Настраиваем папку для статических файлов
app.use(express.static('public'));

// Запускаем сервер
app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});



const User = require('./models/User');
const Product = require('./models/Product');

const user1 = new User('Алексей', 25);
console.log(user1.greet());

const product1 = new Product('Ноутбук', 50000);
console.log(product1.getInfo());

