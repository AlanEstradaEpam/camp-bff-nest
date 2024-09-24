import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { Cart, CartId } from './interfaces/shopping-cart';
import {
  UpdateCartDto,
  UpdateCartAction,
  AddUpdateItemResponse,
  RemoveLineItemResponse,
  SetShippingAddressResponse,
} from './interfaces/shopping-cart-dto.interface';

@Controller('carts')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get(':cartId')
    get(@Param('cartId') cartId: CartId): Promise<Cart> {
        return this.shoppingCartService.get(cartId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(): Promise<Cart> {
        return this.shoppingCartService.create();
    }

   @Put(':cartId')
   update(
    @Param('cartId') cartId: CartId,
    @Body() updateCartDTO: UpdateCartDto
   ): Promise<AddUpdateItemResponse | RemoveLineItemResponse | SetShippingAddressResponse> {
    switch (updateCartDTO.action) {
        case UpdateCartAction.ADD_LINE_ITEM:
            return this.shoppingCartService.addLineItem(cartId, updateCartDTO)
        case UpdateCartAction.CHANGE_LINE_ITEM_QUANTITY:
            return this.shoppingCartService.changeLineItemQuantity(cartId, updateCartDTO)
        case UpdateCartAction.REMOVE_LINE_ITEM:
            return this.shoppingCartService.removeLineItem(cartId, updateCartDTO)
        case UpdateCartAction.SET_SHIPPING_ADDRESS:
            return this.shoppingCartService.setShippingAddress(cartId, updateCartDTO)
        default:
            return;
    }
   }

   @Post(':cartId/order')
    createOrderFromCart(@Param('cartId') cartId: CartId): Promise<void> {
        return this.shoppingCartService.createOrderFromCart(cartId);
    }
}
