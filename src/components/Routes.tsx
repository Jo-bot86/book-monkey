import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import BookDetails from './BookDetails';
import BookList from './BookList';
import Home from './Home';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/books/:isbn'>
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
