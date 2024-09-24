import { Injectable, Logger } from '@nestjs/common';
import { MagentoService } from 'src/magento/magento.service';
import { v4 as uuidv4 } from 'uuid';
import { ProductItem, ShoppingCart, ShoppingCartId } from './interfaces/shopping-cart';
import { AddProductItemDTO, AddUpdateItemResponse, RemoveItemResponse, RemoveProductItemDTO, UpdateProductItemQtyDTO } from './interfaces/shopping-cart-dto.interface';
import { MagentoGuestCart, MagentoGuestCartId } from './interfaces/magento.carts.interface';
import { CurrencyCode, ProductType } from 'src/products/interfaces/product.interface';
import { MagentoAddUpdateItemDto, MagentoAddUpdateItemResponse } from './interfaces/magento.carts.add-update-item.dto.interface';

@Injectable()
export class ShoppingCartService {
    constructor(private readonly magentoService: MagentoService) {}

    getHello(): string {
        return 'Hello Carts! 😎';
    }

    async get(id: ShoppingCartId): Promise<ShoppingCart> {
        const guestCart = await this.magentoService.get<MagentoGuestCart>(`guest-carts/${id}`);

        let totalAmount = 0;

        const productItems: ProductItem[] = guestCart.items.map((item) => {
            totalAmount += item.price * item.qty;
            return {
                item_id: item.item_id,
                sku: item.sku,
                qty: item.qty,
                name: item.name,
                price: item.price,
                product_type: item.product_type as ProductType,
                quote_id: item.quote_id,
            }
        });

        return {
            id,
            version: 0, // TODO: Implement versioning
            customerId: guestCart.customer.id
                ? `${guestCart.customer.id}`
                : uuidv4(), // TODO: Implement customer
            lineItems: productItems,
            totalPrice: {
                currencyCode: guestCart.currency.global_currency_code, // TODO: Verify currency code
                centAmount: totalAmount * 100, // Cent ammount
            },
            totalQuantity: guestCart.items_qty,
        }
    };
    async create(): Promise<ShoppingCart> {
        const guestCartId = await this.magentoService.post<MagentoGuestCartId>('guest-carts');

        return {
            id: guestCartId,
            version: 0,
            customerId: uuidv4(),
            lineItems: [],
            totalPrice: {
                currencyCode: CurrencyCode.USD,
                centAmount: 0,
            },
            totalQuantity: 0
        }
    }
    async addProductItem(id: ShoppingCartId, add: AddProductItemDTO): Promise<AddUpdateItemResponse> {
        const body = {
            cartItem: {
                quote_id: id,
                qty: add.AddLineItem.quantity,
                sku: add.AddLineItem.variantId,
            }
        };
        const path = `guest-carts/${id}/items`;
        const response = await this.magentoService.post<MagentoAddUpdateItemResponse, MagentoAddUpdateItemDto>(path, body);
        return {
            item_id: response.item_id ?? '', // Ensure item_id is present
            sku: response.sku,
            qty: response.qty,
            name: response.name,
            price: response.price,
            product_type: response.product_type as ProductType,
            quote_id: response.quote_id,
        } as AddUpdateItemResponse;
    }
    async updateItemQty(id: ShoppingCartId, updateItemQty: UpdateProductItemQtyDTO): Promise<AddUpdateItemResponse> {
        const body = {
            cartItem: {
                item_id: updateItemQty.ChangeLineItemQuantity.lineItemId,
                quote_id: id,
                qty: updateItemQty.ChangeLineItemQuantity.quantity
            }
        };
        const path = `guest-carts/${id}/${updateItemQty.ChangeLineItemQuantity.lineItemId}`;
        const response = await this.magentoService.put<MagentoAddUpdateItemResponse, MagentoAddUpdateItemDto>(path, body);
        return {
            item_id: response.item_id ?? '', // Ensure item_id is present
            sku: response.sku,
            qty: response.qty,
            name: response.name,
            price: response.price,
            product_type: response.product_type as ProductType,
            quote_id: response.quote_id,
        } as AddUpdateItemResponse;
    }
    async remove(id: ShoppingCartId, remove: RemoveProductItemDTO): Promise<RemoveItemResponse> {
        const itemId = remove.RemoveLineItem.productItemId;
        return await this.magentoService.delete<boolean>(`guest-carts/${id}/items/${itemId}`)
    }
}
