import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookApi } from '../hooks/UseBookApi';
import { bookApi } from '../shared/BookApi';
import Book from '../types/Book';
import LoadingSpinner from './LoadingSpinner';

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>();
  const [visible, setVisible] = useState(false);
  console.log(books);
  useEffect(() => {
    searchTerm.length > 0 &&
      bookApi('GET', `books/search/${searchTerm}`, setBooks);
  }, [searchTerm]);

  const onHideResults = () => {
    setVisible(false);
    setSearchTerm('');
    setBooks([]);
  };

  const onShowResults = () => {
    setVisible(true);
  };


  return (
    <div className='ui search'>
      <div className='ui icon input'>
        <input
          type='text'
          className='prompt'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={onShowResults}
        />
        <i className='search icon' />
      </div>
      <div className={`results transition ${visible && 'visible'}`}>
        {books &&
          books.map((book, index) => (
            <Link
              key={index}
              className='result'
              onClick={onHideResults}
              to={`/books/${book.isbn}`}
            >
              {book.title}
              <p className='description'>{book.subtitle}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
