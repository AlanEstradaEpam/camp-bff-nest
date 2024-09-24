import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart, ShoppingCartId } from './interfaces/shopping-cart';
import { AddProductItemDTO, AddUpdateItemResponse, RemoveItemResponse, RemoveProductItemDTO, UpdateAction, UpdateCartDto, UpdateProductItemQtyDTO } from './interfaces/shopping-cart-dto.interface';

@Controller('carts')
export class ShoppingCartController {
    constructor(private readonly shoppingCartService: ShoppingCartService) {}

    @Get()
    getHello(): string {
        return this.shoppingCartService.getHello();
    }

    @Get(':cartId')
    get(@Param('cartId') cartId: ShoppingCartId): Promise<ShoppingCart> {
        return this.shoppingCartService.get(cartId);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(): Promise<ShoppingCart> {
        return this.shoppingCartService.create();
    }

   @Put(':cartId')
   update(
    @Param('cartId') cartId: ShoppingCartId,
    @Body() updateCartDTO: UpdateCartDto
   ): Promise<AddUpdateItemResponse | RemoveItemResponse> {
    switch (updateCartDTO.action) {
        case UpdateAction.ADD_PRODUCT_ITEM:
            return this.shoppingCartService.addProductItem(cartId, updateCartDTO)
        case UpdateAction.UPDATE_PRODUCT_ITEM_QUANTITY:
            return this.shoppingCartService.updateItemQty(cartId, updateCartDTO)
        case UpdateAction.REMOVE_PRODUCT_ITEM:
            return this.shoppingCartService.remove(cartId, updateCartDTO)
        default:
            return;
    }
   }
}
