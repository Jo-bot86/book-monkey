import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import BookDetails from './BookDetails';
import BookList from './BookList';
import CreateBook from './BookCreate';
import EditBook from './BookEdit';
import Home from './Home';

export default function Routes() {
  return (
    <Switch>
      <Route path='/books/new'>
        <CreateBook />
      </Route>
      <Route path='/books/:isbn/edit'>
        <EditBook />
      </Route>
      <Route path='/books/:isbn'>
        <BookDetails />
      </Route>
      <Route exact path='/books'>
        <BookList />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/'>
        <Redirect to='/home' />
      </Route>
    </Switch>
  );
}
