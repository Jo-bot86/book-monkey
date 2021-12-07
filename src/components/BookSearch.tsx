import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useBookApi } from '../hooks/UseBookApi';
import { bookApi } from '../shared/BookApi';
import Book from '../types/Book';
import LoadingSpinner from './LoadingSpinner';

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<Book[]>();
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  useEffect(() => {
    searchTerm.length > 0 &&
      bookApi('GET', `books/search/${searchTerm}`, setBooks);
  }, [searchTerm]);

  const onHideResults = (e: React.MouseEvent<HTMLElement>, index: number) => {
    setVisible(false);
    setSearchTerm('');
    setBooks([]);
    history.push(`/books/${books && books[index].isbn}`);
  };

  const onShowResults = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    e.target.value.length > 0 && setVisible(true);
  };

  const handleOnBlur= () => {
    setVisible(false);
  };

  return (
    <div className='ui search'>
      <div className='ui icon input'>
        <input
          type='text'
          className='prompt'
          value={searchTerm}
          onChange={onShowResults}
          onBlur={handleOnBlur}
        />
        <i className='search icon' />
      </div>
      <div className={`results transition ${visible ? 'visible' : ''}`}>
        {books &&
          books.map((book, index) => (
            <Link
              key={index}
              className='result'
              onMouseDown={(e) => onHideResults(e, index)}
              to=''
            >
              {book.title}
              <p className='description'>{book.subtitle}</p>
            </Link>
          ))}
      </div>
    </div>
  );
}
