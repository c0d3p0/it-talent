import logoText from "../../images/logo_text.svg";

import "./Footer.css"


export default function Footer() {
  return (
    <footer className="footer">
      <img src={logoText} />
      <p>
        Find the person with the IT skills you're looking 
        for taking advantage of the IT Talent's rich 
        database. It is easy, simple and very effective, 
        there are several ways you can search for the right 
        person in our system.
      </p>
      <span>
        Application built with Java, SpringBoot, Microservices, 
        React.js, 2022
      </span>
    </footer>
  );
}