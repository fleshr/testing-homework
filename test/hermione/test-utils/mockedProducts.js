const productsVeryShort = [
  {
    name: "Test product name 1",
    price: 100,
  },
  {
    name: "Test product name 2",
    price: 200,
  },
];

const productsShort = [
  {
    ...productsVeryShort[0],
    id: 0,
  },
  {
    ...productsVeryShort[1],
    id: 1,
  },
];

const products = [
  {
    ...productsShort[0],
    description: "Test product description 1",
    color: "silver",
    material: "Concrete",
  },
  {
    ...productsShort[1],
    description: "Test product description 2",
    color: "magenta",
    material: "Metal",
  },
];

const productsCart = {
  0: { ...productsVeryShort[0], count: 1 },
  1: { ...productsVeryShort[1], count: 2 },
};

module.exports = { products, productsShort, productsCart };
