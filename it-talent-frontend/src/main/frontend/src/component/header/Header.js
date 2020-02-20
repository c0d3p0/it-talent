import React from 'react';
import './Header.css';
import logo from '../../logo.svg';

const Header = () =>
{
  return (
    <header className="header flexItemsRow">
      <div className="flexItemsCol">
        <img src={logo} alt="logo"/>
        <span>IT Talent</span>
      </div>
    </header>
  );
}


export default Header;