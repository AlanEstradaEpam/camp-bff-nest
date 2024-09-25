import { CategoriesModule } from "./categories";
import { ProductsModule } from "./products";
import { PromosModule } from "./promos";
import { ShoppingCartModule } from "./shopping-cart/shopping-cart.module";

export const rootModules = [
    CategoriesModule,
    ProductsModule,
    ShoppingCartModule,
    PromosModule
]