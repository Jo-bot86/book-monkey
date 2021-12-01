import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { bookApi } from '../shared/BookApi';
import Book from '../types/Book';

export function useBookApi<T>(isbn?: string): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [book, setBook] = useState<T>();
  
  useEffect(() => {
    bookApi('GET', `book/${isbn ? isbn : ""}`, setBook);
  }, [isbn]);

  return [book, setBook];
}