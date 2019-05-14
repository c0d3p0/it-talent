import React from 'react';
import './Header.css';
import logo from '../../logo.svg';

const Header = () =>
{
  return (
      <header className="header">
        <div className="appTitle">
          <img className="appLogo" src={logo} alt="logo"/>
          <span className="appTitleLabel">IT Talent</span>
        </div>
      </header>
  );
}


export default Header;