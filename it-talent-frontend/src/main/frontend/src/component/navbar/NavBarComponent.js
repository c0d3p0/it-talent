import React from 'react';
import sectionsInfo from '../../config/SectionsInfo';
import './NavBar.css';

const NavBarComponent = (props) =>
{
  const si = props.sectionInfo;
  const sections = [];
  sectionsInfo.forEach((sectionInfo) => 
  {
    if(sectionInfo.active)
    {
      sections.push((
        <label
          key={sectionInfo.id}
          section-info-id={sectionInfo.id}
          onClick={props.handleClick}
          className={sectionInfo.id === si.id ? "navOn" : "navOff"}
        >
          {sectionInfo.name}
        </label>
      ));
    }
  });

  return (
    <nav className="navBar">
      <div>{sections}</div>
    </nav>
  );
}


export default NavBarComponent;