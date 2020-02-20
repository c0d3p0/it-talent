import React from 'react';
import sectionsInfo from '../../config/SectionsInfo';
import './NavBar.css';

const NavBarComponent = (props) =>
{
  const si = props.sectionInfo;
  const sections = [];
  sectionsInfo.forEach((sectionInfo) => 
  {
    let cssSection = "flexItemsCol";

    if(sectionInfo.id === si.id)
      cssSection += " navOn";

    if(sectionInfo.active)
    {
      sections.push((
        <label
          key={sectionInfo.id}
          section-info-id={sectionInfo.id}
          onClick={props.handleClick}
          className={cssSection}
        >
          {sectionInfo.name}
        </label>
      ));
    }
  });

  return (
    <nav className="navBar flexItemsCol">
      <span></span>
      <div className="flexItemsCol">{sections}</div>
      <span></span>
    </nav>
  );
}


export default NavBarComponent;