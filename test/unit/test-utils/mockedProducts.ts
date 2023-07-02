import { Product, ProductShortInfo } from "../../../src/common/types";

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

export const productsShort: ProductShortInfo[] = [
  {
    ...productsVeryShort[0],
    id: 0,
  },
  {
    ...productsVeryShort[1],
    id: 1,
  },
];

export const products: Product[] = [
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

export const productsCart = {
  0: { ...productsVeryShort[0], count: 2 },
  1: { ...productsVeryShort[1], count: 3 },
};
