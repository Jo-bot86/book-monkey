import React from 'react'
import { Route, Switch } from 'react-router-dom';
import BookDetails from './BookDetails';
import BookList from './BookList';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/books/:isbn'>
        <BookDetails />
      </Route>
      <Route exact path='/books'>
        <BookList />
      </Route>
      <Route path='/'>
        <h1 className='ui center aligned segment'>Willkommen bei BookMonkey</h1>
      </Route>
    </Switch>
  );
}
