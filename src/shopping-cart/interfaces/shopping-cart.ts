import {
  Product,
  ProductId,
  ProductSKU,
  ProductType,
} from 'src/products/interfaces/product.interface';

export type ShoppingCartId = string;
export type CustomerId = string;

export interface Price {
  currencyCode: string;
  centAmount: number;
}

export interface ProductItem {
  item_id: ProductId;
  sku: ProductSKU;
  qty: number;
  name: Product['name'];
  price: number;
  product_type: ProductType;
  quote_id: string;
}

export interface ShoppingCart {
  id: ShoppingCartId;
  version: number;
  customerId: CustomerId;
  lineItems: ProductItem[];
  totalPrice: Price;
  totalQuantity: number;
}
