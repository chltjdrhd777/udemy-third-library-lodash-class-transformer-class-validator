///////////////////////////////////
//normal way

/* 

import { Products } from "./product.model";

const products = [
  { title: "A crapet", price: 30 },
  { title: "A ring", price: 10.11 }
];

const loadedProducts = products.map(things => {
  return new Products(things.title, things.price);
});
console.log(loadedProducts); //[Products,Products] each products element has {title, price}

for (const things of loadedProducts) {
  console.log(things.getInformation());
} 

*/

///////////////////////////////////////////////////////
// by using class-transformer
// in terminal, install webpack
// in terminal, npm install class-transformer --save
// in terminal, npm install reflect-metadata --save
import "reflect-metadata"; // import this
import { plainToClass } from "class-transformer"; // and this
import { validate } from "class-validator";

import { Products } from "./product.model";

const products = [
  { title: "A crapet", price: 30 },
  { title: "A ring", price: 10.11 }
];

const newProd = new Products("", -5.99);
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log("Validation errors!");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
}); // class-validator(about newProd) => after that, if there are errors, errors.legth>0 means validator screens these errors

/*
const loadedProducts = products.map(things => {
  // .map() = about every component, apply the following rules and make a new array
  return new Products(things.title, things.price);
});
*/
const loadedProducts = plainToClass(Products, products); // plainToClass(a,b): "a" is what I want to target, "b" is what I want to apply "a" to. basically, it contains for()

console.log(loadedProducts); //[Products,Products] each products element has {title, price}

for (const things of loadedProducts) {
  console.log(things.getInformation());
}
