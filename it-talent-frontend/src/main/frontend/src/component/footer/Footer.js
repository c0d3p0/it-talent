import React from 'react';
import "./Footer.css";

const Footer = () =>
{
  var appVersion = "Version 0.1, ";
  appVersion += "\u00A9";
  appVersion += " 2019";

  return (
    <footer className="footer">
      <label className="appVersion">{appVersion}</label>
    </footer>
  );
}


export default Footer;