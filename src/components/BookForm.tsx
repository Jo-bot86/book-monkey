import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { bookApi } from '../shared/BookApi';

export default function BookForm() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [published, setPublished] = useState(((new Date()).toISOString()).slice(0,10));
  const [authors, setAuthors] = useState(['']);
  const [thumbnails, setThumbnails] = useState([{ title: '', url: '' }]);
  const [description, setDescription] = useState('');
  const history = useHistory();

  const createBook = () => ({
    title: '',
    subtitle: '',
    isbn: '',
    authors: [''],
    published: new Date,
    description: '',
    thumbnails: [{}],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newBook = createBook();
    newBook.title = title;
    newBook.subtitle = subtitle;
    newBook.isbn = isbn;
    newBook.authors = authors;
    newBook.published = new Date(published)
    newBook.description = description;
    newBook.thumbnails = thumbnails;
    console.log(newBook)
    bookApi('POST','books', onShowList,newBook)
    
  };

  const onShowList = () => {
    history.push('/books');
  };

  const handleAuthor = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newAuthors = [...authors];
    newAuthors[index] = e.target.value;
    setAuthors(newAuthors);
  };

  const handleThumbnails = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    key: string
  ) => {
    const newThumbnails = [...thumbnails];
    newThumbnails[index] = { ...newThumbnails[index], [key]: e.target.value };
    setThumbnails(newThumbnails);
  };

  const handlePublished = (e: ChangeEvent<HTMLInputElement>) => {
    setPublished(e.target.value);
  };

  const addAuthorInput = () => {
    setAuthors((currAuthors) => [...currAuthors, '']);
  };

  const removeAuthorInput = (index: number) => {
    authors.length > 1 &&
      setAuthors((currAuthors) => [
        ...[...currAuthors].splice(0, index),
        ...[...currAuthors].splice(index + 1),
      ]);
  };

  const addThumbnail = () => {
    setThumbnails((currThumbnails) => [
      ...currThumbnails,
      { title: '', url: '' },
    ]);
  };

  const removeThumbnail = (index: number) => {
    setThumbnails((currThumbnails) => [
      ...[...currThumbnails].splice(0, index),
      ...[...currThumbnails].splice(index + 1),
    ]);
  };

  return (
    <form className='ui form' onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor='title'>Buchtitel</label>
      <input
        placeholder='Titel'
        id='title'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        required
      />

      <label htmlFor='subtitle'>Untertitel</label>
      <input
        placeholder='Subtitle'
        id='subtitle'
        onChange={(e) => setSubtitle(e.target.value)}
        value={subtitle}
      />

      <label htmlFor='isbn'>Isbn</label>
      <input
        placeholder='Isbn'
        id='isbn'
        onChange={(e) => setIsbn(e.target.value)}
        value={isbn}
        required
      />

      <label htmlFor='published'>Erscheinungsdatum</label>
      <input
        placeholder='Published'
        type='date'
        id='published'
        required
        onChange={(e) => handlePublished(e)}
        value = {published}
      />

      <label>Authoren</label>
      <button className='ui mini button' type='button' onClick={addAuthorInput}>
        +
      </button>

      <div className='fields'>
        {authors.map((author, index) => (
          <div key={index} className='sixteen wide field'>
            <input
              className='fourteen wide field'
              placeholder='author'
              value={author}
              onChange={(e) => handleAuthor(e, index)}
              required
            />
            <button
              className='ui normal button'
              type='button'
              onClick={() => removeAuthorInput(index)}
            >
              -
            </button>
          </div>
        ))}
      </div>
      <label htmlFor='description'>Beschreibung</label>
      <input
        placeholder='Description'
        id='description'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label>Bilder</label>
      <button className='ui mini button' type='button' onClick={addThumbnail}>
        +
      </button>
      {thumbnails.map((thumbnail, index) => (
        <div key={index} className='field'>
          <input
            placeholder='Url'
            className='seven wide field'
            onChange={(e) => handleThumbnails(e, index, 'url')}
            value={thumbnail.url}
          />
          <input
            placeholder='Titel'
            className='seven wide field'
            onChange={(e) => handleThumbnails(e, index, 'title')}
            value={thumbnail.title}
          />
          <button
            className='ui normal button'
            type='button'
            onClick={() => removeThumbnail(index)}
          >
            -
          </button>
        </div>
      ))}

      <button className='ui button'>Submit</button>
    </form>
  );
}
