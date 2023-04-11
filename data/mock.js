const fs = require('fs');
const faker = require('faker');

const data = Array(10).fill().map((_, index) => {
    return {
      id: index,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price()
    };
  });

const jsonString = JSON.stringify(data, null, 2);
fs.writeFileSync('data/products.json', jsonString);

console.log('Data written to products.json');
