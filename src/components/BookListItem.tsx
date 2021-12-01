import React from 'react';
import { useHistory } from 'react-router-dom';
import Book from '../types/Book';

interface Props {
  book: Book;
}

export default function BookListItem(props: Props) {
  const history = useHistory();
  const { book } = props;

  const handleShowDetail = () => {
    history.push(`/books/${book.isbn}`)
  }

  return (
    <div className='item' onClick={handleShowDetail}>
      {book.thumbnails ? (
        book.thumbnails.length > 0 ? (
          <img className='ui tiny image' alt='' src={book.thumbnails[0].url} />
        ) : (
          <img
            className='ui tiny image'
            src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
          />
        )
      ) : (
        <img
          className='ui tiny image'
          src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
        />
      )}
      <div className='content'>
        <div className='header'>{book.title}</div>
        <div className='description'>{book.subtitle}</div>
        <div className='metadata'>
          {book.authors.map((author) => (
            <span key={author}>{author}</span>
          ))}
          <br />
          {book.isbn}
        </div>
      </div>
    </div>
  );
}
