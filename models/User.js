// File: User.js

class User {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
  
    greet() {
      return `Привет, меня зовут ${this.name}, и мне ${this.age} лет.`;
    }
  }
  
  module.exports = User;
  