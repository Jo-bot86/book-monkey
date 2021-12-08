import React from 'react'
import { useParams } from 'react-router-dom';
import { useBookApi } from '../hooks/UseBookApi';
import Book from '../types/Book';
import BookForm from './BookForm';
import LoadingSpinner from './LoadingSpinner';

export default function EditBook() {
  const {isbn} = useParams<{isbn: string}>();
  const [book, setBook] = useBookApi<Book>(isbn);
  
  if(!book){
    return <LoadingSpinner />
  }

  const convertDate = (date: Date) => {
    return date.toISOString().slice(0,10)
  }

  return (
    <BookForm
      title={book.title}
      subtitle={book.subtitle ? book.subtitle : ""}
      isbn={book.isbn}
      authors={book.authors}
      published={book.published ? convertDate(new Date(book.published)) : ""}
      description={book.description ? book.description : ""}
      thumbnails={book.thumbnails ? book.thumbnails : [{title: '', url: ''}]}
      isEdit={true}
    />
  );
}
