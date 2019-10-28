export class Product {
  id: number;
  name: string;
  category: string;
  image?: string;
  price: number;
  description?: string;

  constructor(id: number, name: string, category: string, price: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
  }
}

export class CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

export class ProductOrder {
  productId: number;
  quantity: number;
}

export interface Order {
  customer: string;
  products: ProductOrder[];
}

export interface User {
  username: string;
  fullname: string;
  roles: string[];
}

export enum Role {
  USER = 'user',
  CUSTOMER = 'customer',
  ADMIN = 'admin'
}
