import {
  ProductId,
  ProductSKU,
} from 'src/products/interfaces/product.interface';
import { ProductItem } from './shopping-cart';

export enum UpdateAction {
  ADD_PRODUCT_ITEM = 'AddLineItem',
  UPDATE_PRODUCT_ITEM_QUANTITY = 'ChangeLineItemQuantity',
  REMOVE_PRODUCT_ITEM = 'RemoveLineItem',
  SET_SHIPPING_ADDRESS = 'SetShippingAddress',
}

export interface AddProductItemDTO {
  action: UpdateAction.ADD_PRODUCT_ITEM;
  AddLineItem: {
    variantId: ProductSKU;
    quantity: number;
  };
}

export interface UpdateProductItemQtyDTO {
  action: UpdateAction.UPDATE_PRODUCT_ITEM_QUANTITY;
  ChangeLineItemQuantity?: {
    lineItemId: ProductId;
    quantity: number;
  };
}

export interface RemoveProductItemDTO {
  action: UpdateAction.REMOVE_PRODUCT_ITEM;
  RemoveLineItem: {
    productItemId: ProductId;
  };
}

export interface SetShippingAddressDto {
  action: UpdateAction.SET_SHIPPING_ADDRESS;
  SetShippingAddress: {
    country: string;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    region: string;
    email: string;
  };
}

export type UpdateCartDto = { version: number } & (
  | AddProductItemDTO
  | UpdateProductItemQtyDTO
  | RemoveProductItemDTO
  | SetShippingAddressDto
);

// TODO: Use TS Property mapping to avoid re-mapping for a couple of keys on the service
export interface AddUpdateItemResponse extends ProductItem {}

export type RemoveItemResponse = boolean;
