import React, { useReducer } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import BookDetails from './BookDetails';
import BookList from './BookList';
import CreateBook from './BookCreate';
import EditBook from './BookEdit';
import Home from './Home';
import { reducer, initialStore } from '../Store';
import Cart from './Cart';

export default function Routes() {
  const [store, dispatch] = useReducer(reducer, initialStore);
  return (
    <Switch>
      <Route path='/books/new'>
        <CreateBook />
      </Route>
      <Route path='/books/:isbn/edit'>
        <EditBook />
      </Route>
      <Route path='/books/:isbn'>
        <BookDetails dispatch={dispatch}/>
      </Route>
      <Route exact path='/books'>
        <BookList />
      </Route>
      <Route path='/cart'>
        <Cart store={store} dispatch={dispatch}/>
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
