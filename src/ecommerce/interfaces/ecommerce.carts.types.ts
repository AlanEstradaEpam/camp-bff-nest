import {
  AddLineItemDto,
  AddUpdateItemResponse,
  ChangeLineItemQuantityDto,
  RemoveLineItemDto,
  RemoveLineItemResponse,
  SetShippingAddressDto,
  SetShippingAddressResponse,
} from 'src/shopping-cart/interfaces/shopping-cart-dto.interface';
import { Cart, CartId } from 'src/shopping-cart/interfaces/shopping-cart';

export interface EcommerceCartsService {
  createCart(): Promise<Cart>;

  getCart(cartId: CartId): Promise<Cart>;

  addLineItem(
    cartId: CartId,
    addLineItemDto: AddLineItemDto,
  ): Promise<AddUpdateItemResponse>;

  changeLineItemQuantity(
    cartId: CartId,
    changeLineItemQtyDto: ChangeLineItemQuantityDto,
  ): Promise<AddUpdateItemResponse>;

  removeLineItem(
    cartId: CartId,
    removeLineItemDto: RemoveLineItemDto,
  ): Promise<RemoveLineItemResponse>;

  setShippingAddress(
    cartId: CartId,
    setShippingAddressDto: SetShippingAddressDto,
  ): Promise<SetShippingAddressResponse>;

  createOrderFromCart(cartId: CartId): Promise<void>;
}
