import React from 'react';

import './ListArea.css';


const ListAreaComponent = (props) =>
{
  let listContent;

  if(props.componentMap)
  {
    if(!props.message)
    {
      listContent = (
        <props.componentMap.listView
          listItem={props.componentMap.listItem}
          actionMap={props.actionMap}
          listName={props.listName}
          data={props.data}
        />
      );
    }
    else
    {
      listContent = (
        <span className="listItem">
          {props.message}
        </span>
      );
    }
  }
  else
  {
    listContent = (
      <div className="flexItemsRow">
        <label className="listItem">
          Loading list area.
        </label>
      </div>
    );
  }

  return (
    <div className="listArea contentArea flexItemsRow">
      <div className="flexItemsRow">
        <label className="sectionTitle">
          {props.listTitle}
        </label>
        {listContent}
        <div className="flexItemsCol">
          <button
            name="newEntry"
            onClick={props.handleClick}
            className="itTalentButton"
          >
            New Entry
          </button>
        </div>
      </div>
    </div>
  );
}


export default ListAreaComponent;