import React from 'react';
import { useStoreContext } from '../Store';
import Book from '../types/Book';
import BookListItem from './BookListItem';


export default function Cart() {
  const { store, dispatch } = useStoreContext();

  const addToCart = (e: React.MouseEvent, book: Book) => {
    dispatch({ type: 'ADD_TO_CART', book });
    e.stopPropagation();
  };

  const removeFromCart = (e: React.MouseEvent, book: Book) => {
    dispatch({ type: 'REMOVE_FROM_CART', book });
    e.stopPropagation();
  };

  const countBooks = (isbn: string): number => {
    let counter = 0;
    for (let i = 0; i < store.cart.length; i++) {
      if (store.cart[i].isbn == isbn) {
        counter++;
      }
    }
    return counter;
  };

  const cartWithNoDuplicates = store.cart.filter(
    (filterBook, filterIndex) =>
      store.cart.map((mapBook) => mapBook.isbn).indexOf(filterBook.isbn) ==
      filterIndex
  );

  return (
    <div className='ui middle aligned selection divided list'>
      {cartWithNoDuplicates.map((book, index) => (
        <BookListItem key={index} book={book}>
          <div className='right floated content'>
            <div className='ui buttons'>
              <label className='ui button'>
                <i className='shopping cart icon'>
                  {countBooks(book.isbn)}
                </i>
              </label>
              <button
                className='ui button green'
                onClick={(e) => addToCart(e, book)}
              >
                Add One
              </button>
              <button
                className='ui button red'
                onClick={(e) => removeFromCart(e, book)}
              >
                Remove One
              </button>
            </div>
          </div>
        </BookListItem>
      ))}
    </div>
  );
}
