import { Injectable } from '@nestjs/common';
import { Cart, CartId } from './interfaces/shopping-cart';
import {
  AddLineItemDto,
  AddUpdateItemResponse,
  ChangeLineItemQuantityDto,
  RemoveLineItemDto,
  RemoveLineItemResponse,
  SetShippingAddressDto,
  SetShippingAddressResponse,
} from './interfaces/shopping-cart-dto.interface';
import { EcommerceCartsService } from 'src/ecommerce/interfaces/ecommerce.carts.types';
import { EcommerceCartsFactory } from 'src/ecommerce/ecommerce.carts.factory';

@Injectable()
export class ShoppingCartService {
  private ecommerceCartsService: EcommerceCartsService;

  constructor(private readonly ecommerceCartsFactory: EcommerceCartsFactory) {
    this.ecommerceCartsService = this.ecommerceCartsFactory.getCartsService();
  }


  async get(id: CartId): Promise<Cart> {
    return this.ecommerceCartsService.getCart(id);
  }

  async create(): Promise<Cart> {
    return this.ecommerceCartsService.createCart();
  }


  async addLineItem(
    cartId: CartId,
    addLineItemDto: AddLineItemDto,
  ): Promise<AddUpdateItemResponse> {
    return this.ecommerceCartsService.addLineItem(cartId, addLineItemDto);
  }

  async changeLineItemQuantity(
    cartId: CartId,
    changeLineItemQtyDto: ChangeLineItemQuantityDto,
  ): Promise<AddUpdateItemResponse> {
    return this.ecommerceCartsService.changeLineItemQuantity(
      cartId,
      changeLineItemQtyDto,
    );
  }

  async removeLineItem(
    cartId: CartId,
    removeLineItemDto: RemoveLineItemDto,
  ): Promise<RemoveLineItemResponse> {
    return this.ecommerceCartsService.removeLineItem(cartId, removeLineItemDto);
  }

  async setShippingAddress(
    cartId: CartId,
    setShippingAddressDto: SetShippingAddressDto,
  ): Promise<SetShippingAddressResponse> {
    return this.ecommerceCartsService.setShippingAddress(
      cartId,
      setShippingAddressDto,
    );
  }

  async createOrderFromCart(cartId: CartId): Promise<void> {
    return this.ecommerceCartsService.createOrderFromCart(cartId);
  }
}
