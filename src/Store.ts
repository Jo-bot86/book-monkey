import React from 'react';
import Book from './types/Book';

export interface Store {
  cart: Book[];
}

export const initialStore: Store = {
  cart: [],
};

export interface AddToCart {
  type: 'ADD_TO_CART';
  book: Book;
}

export interface RemoveFromCart {
  type: 'REMOVE_FROM_CART';
  book: Book;
}

export type Action = AddToCart | RemoveFromCart;

export function reducer(store: Store, action: Action) {
  switch (action.type) {
  case 'ADD_TO_CART':
    return {
      ...store,
      cart: [...store.cart, action.book]
    }
  case 'REMOVE_FROM_CART':{
    const index = store.cart
      .map((book) => book.isbn)
      .lastIndexOf(action.book.isbn);
    return {
      ...store,
      cart: store.cart.filter((_book, i) => i !== index),
    };
  }
  default:
    return store;
  }
}
