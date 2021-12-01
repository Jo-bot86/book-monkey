import axios, { AxiosResponse } from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useBookApi } from '../hooks/UseBookApi';
import { bookApi } from '../shared/BookApi';
import Book from '../types/Book';
import BookListItem from './BookListItem';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  onShowDetails: (book: Book) => void;
}

export default function BookList(props: Props): ReactElement {
  const [books, setBooks] = useBookApi<Book[]>();

  if (!books) {
    return <LoadingSpinner />;
  }

  const resetList = () => {
    bookApi('DELETE', 'books', () => bookApi('GET', 'books', setBooks));
  };

  if (books.length == 0) {
    return (
      <div className='ui message'>
        <div className='header'>No books available </div>
        <button className='ui button' onClick={resetList}>
          Reset
        </button>
      </div>
    );
  }

  return (
    <div className='ui middle aligned selection divided list'>
      {books.map((book) => (
        <BookListItem
          key={book.isbn}
          book={book}
          onShowDetails={() => props.onShowDetails(book)}
        />
      ))}
    </div>
  );
}
