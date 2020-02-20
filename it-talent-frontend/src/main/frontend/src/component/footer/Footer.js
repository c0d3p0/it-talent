import React from 'react';
import "./Footer.css";

const Footer = () =>
{
  let appVersion = "Version 0.3, \u00A9 2019-2020";

  return (
    <footer className="footer flexItemsCol">
      <label>{appVersion}</label>
    </footer>
  );
}


export default Footer;