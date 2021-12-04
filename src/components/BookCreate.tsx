import React from 'react';
import BookForm from './BookForm';

export default function CreateBook() {
  return (
    <BookForm
      title=''
      subtitle=''
      isbn=''
      authors={['']}
      published=''
      description=''
      thumbnails={[{ title: '', url: '' }]}
      isEdit={false}
    />
  );
}
