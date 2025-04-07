export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
    color?: string;
    description?: string;
    brand?: string;
  }