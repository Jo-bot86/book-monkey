import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import BookSearch from './BookSearch';

interface Props {
  children: ReactElement;
}

export default function Layout(props: Props) {
  return (
    <div className='ui container'>
      <div className='ui menu'>
        <NavLink className='item' to='/home'>
          Home
        </NavLink>
        <NavLink className='item' exact to='/books'>
          Books
        </NavLink>
        <NavLink className='item' to='/books/new'>
          Add New Book
        </NavLink>
        <NavLink className='item' to='/cart'>
          Shoping Cart
        </NavLink>
        <div className='item right'>
          <BookSearch />
        </div>
      </div>
      {props.children}
    </div>
  );
}
