export class Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

export class CartItem {
  quantity: number;
  product: Product;
}

export class ProductOrder {
  productId: number;
  quantity: number;
}

export class Order {
  customer: string;
  products: ProductOrder[];
}
