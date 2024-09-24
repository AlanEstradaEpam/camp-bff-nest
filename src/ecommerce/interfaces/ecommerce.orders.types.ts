import { CartId } from 'src/shopping-cart/interfaces/shopping-cart';

export interface EcommerceOrdersService {
  createOrderFromCart(cartId: CartId, cartVersion: number): Promise<void>;
}
