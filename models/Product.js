// File: Product.js

class Product {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  
    getInfo() {
      return `Продукт: ${this.name}, Цена: ${this.price} руб.`;
    }
  }
  
  module.exports = Product;
  