import React from 'react';
import NavBar from '../navbar/NavBar';

import './MainArea.css';


const MainAreaComponent = (props) =>
{
  return (
    <div className="mainArea">
      <NavBar
        sectionState={props.sectionState}
        setSectionState={props.setSectionState}
      />
      <props.contentArea
        sectionState={props.sectionState}
        setSectionState={props.setSectionState}
      />
    </div>
  );
}


export default MainAreaComponent;