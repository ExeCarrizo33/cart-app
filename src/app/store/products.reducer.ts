import { createReducer, on } from '@ngrx/store';
import { load } from './products.action';

const products: any[] = [];
const initialState = {
  products
};

export const productsReducer = createReducer(
  initialState,
  on(load, (state, { products }) => ({ products: [...products] }))
);
