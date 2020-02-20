import React from 'react';
import NavBar from '../navbar/NavBar';
import SearchBar from '../searchbar/SearchBar';

import './MainArea.css';


const MainAreaComponent = (props) =>
{
  return (
    <div className="mainArea flexItemsRow">
      <SearchBar
        sectionState={props.sectionState}
        setSectionState={props.setSectionState}
      />
      <NavBar
        sectionState={props.sectionState}
        setSectionState={props.setSectionState}
      />
      <props.contentArea
        sectionState={props.sectionState}
        setSectionState={props.setSectionState}
      />
      <div className="flexItemsCol">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}


export default MainAreaComponent;