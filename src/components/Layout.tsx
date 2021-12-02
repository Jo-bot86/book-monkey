import React, { ReactElement } from 'react'
import {
  BrowserRouter as Router,
  NavLink,
} from 'react-router-dom';

interface Props{
  children: ReactElement
}

export default function Layout(props: Props) {
  return (
    <div className='ui container'>
      <div className='ui menu'>
        <NavLink className='item' to='/home'>Home</NavLink>
        <NavLink className='item' exact to='/books'>Books</NavLink>
        <NavLink className='item' to='/books/new'>Add New Book</NavLink>
      </div>
      {props.children}
      <div></div>
    </div>
  );
}

/* {
  const onChangeTimes = (key: string, index: number, newValue: string) => {
    setTimes((currentTimes) => {
      const copyTimes = [...currentTimes];
      copyTimes[index] = { ...copyTimes[index], [key]: newValue };
      return copyTimes;
    });
  };
} */