import React, { ReactElement, createContext, useContext, useReducer } from 'react';
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
      cart: [...store.cart, action.book],
    };
  case 'REMOVE_FROM_CART': {
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

interface StoreContextProps {
  store: Store;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext({} as StoreContextProps);
StoreContext.displayName = 'StoreContext';

interface Props {
  children: ReactElement;
}

export const useStoreContext = () => useContext(StoreContext);

export default function StoreContextProvider(props: Props): ReactElement {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <div>
      <StoreContext.Provider value={{ store, dispatch }}>
        {props.children}
      </StoreContext.Provider>
    </div>
  );
}
