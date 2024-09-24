import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsModule } from 'src/products';
import { EcommerceModule } from 'src/ecommerce';
import { EcommerceCartsFactory } from 'src/ecommerce/ecommerce.carts.factory';

@Module({
  imports: [ProductsModule, EcommerceModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, EcommerceCartsFactory],
})
export class ShoppingCartModule {}
