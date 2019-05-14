import React from 'react';
import SearchBar from '../searchbar/SearchBar';

import './ListArea.css';

const ListAreaComponent = (props) =>
{
  let contentElement;

  if(props.componentMap)
  {
    contentElement =
    (
      <div className="itTalentContentArea">
        <label className="sectionTitle">
          {props.listTitle}
        </label>
        <props.componentMap.listView
          listItem={props.componentMap.listItem}
          actionMap={props.actionMap}
          listName={props.listName}
          data={props.data}
        />
        <div className="listAreaActions">
          <button
            name="newEntry"
            onClick={props.handleClick}
            className="itTalentButton"
          >
            New Entry
          </button>
        </div>
      </div>
    );
  }
  else
    contentElement = <div>Loading list area.</div>

  return (
    <div className="itTalentContentArea">
      <SearchBar
        sectionState={props.sectionState}
        setSectionState={props.setSectionState}
      />
      {contentElement}
    </div>
  );
}


export default ListAreaComponent;