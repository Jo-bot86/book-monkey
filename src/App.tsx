import React, { ReactElement, useState } from 'react';
import 'semantic-ui-css/semantic.css';
import BookDetails from './components/BookDetails';
import BookList from './components/BookList';
import Book from './types/Book';

function App(): ReactElement {
  const [book, setBook] = useState<Book>();

  const onShowDetails = (book: Book) => {
    setBook(book);
  };

  const onShowList = () => {
    setBook(undefined);
  }

  return (
    <div className='ui container'>
      {book ? (
        <BookDetails isbn={book.isbn} onShowList={onShowList}/>
      ) : (
        <BookList onShowDetails={onShowDetails} />
      )}
    </div>
  );
}

export default App;
