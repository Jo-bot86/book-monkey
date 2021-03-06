import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useBookApi } from '../hooks/UseBookApi';
import { bookApi } from '../shared/BookApi';
import { useStoreContext } from '../Store';
import Book from '../types/Book';
import LoadingSpinner from './LoadingSpinner';


export default function BookDetails() {
  const { isbn } = useParams<{ isbn: string }>();
  const [book] = useBookApi<Book>(isbn);
  const history = useHistory();
  const {dispatch} = useStoreContext();

  if (!book) {
    return <LoadingSpinner />;
  }

  const handleDelete = () => {
    bookApi('DELETE', `book/${isbn}`, onShowList);
  };

  const onShowList = () => {
    history.push('/books');
  };

  const getRatings = (): number[] => {
    return Array.from(Array(book.rating || 0).keys());
  };

  const onEditForm = () => {
    history.push(`/books/${isbn}/edit`);
  };

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      book,
    });
  };

  return (
    <>
      <div>
        <h1>{book.title}</h1>
        <div className='ui divider'></div>
        <div className='ui grid'>
          <div className='four wide column'>
            <h4>Autoren</h4>
            {book.authors.join(', ')}
          </div>
          <div className='four wide column'>
            <h4>ISBN</h4>
            {book.isbn}
          </div>
          <div className='four wide column'>
            <h4>Erschienen</h4>
            <p>{new Date(book.published).toLocaleDateString()}</p>
          </div>
          <div className='four wide column'>
            <h4>Rating</h4>
            {getRatings().map((rating, index) => (
              <i key={index} className='yellow star icon'></i>
            ))}
          </div>
        </div>
        <h4>Beschreibung</h4>
        {book.description && book.description}
        <div className='ui small images'>
          {book.thumbnails && book.thumbnails.length > 0 && (
            <img src={book.thumbnails[0].url} />
          )}
        </div>
      </div>
      <button className='ui yellow button' onClick={onEditForm}>
        Bearbeiten
      </button>
      <button className='ui green button' onClick={onShowList}>
        Zur??ck
      </button>
      <button className='ui red button' onClick={handleDelete}>
        L??schen
      </button>
      <button className='ui button' onClick={addToCart}>
        <i className='fas fa-shopping-cart'></i>
      </button>
    </>
  );
}
