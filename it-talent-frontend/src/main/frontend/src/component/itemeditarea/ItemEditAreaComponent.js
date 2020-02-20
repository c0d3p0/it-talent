import React from 'react';

import './ItemEditArea.css';


const ItemEditAreaComponent = (props) =>
{ 
  let messages = props.message ? props.message : "";
  messages = messages.split('\n');
  const messageElement = messages.map((message, index) =>
  {
    return (
      <label
        key={index}
        style={{display: 'block'}}
      >
        {message}
      </label>
    );
  });

  return (
    <div className="itemEditArea contentArea flexItemsRow">
      <label className="sectionTitle">
        {props.title}
      </label>
      <div className="flexItemsRow">
        <props.componentMap.itemEditManager
          data={props.data}
          sendDataToApi={props.sendDataToApi}
          setMessage={props.setMessage}
        />
        <div className="itTalentFormMessage">
          <label>{messageElement}</label>  
        </div>
        <div className="flexItemsRow">
          <button
            name="return"
            className="itTalentButton"
            onClick={props.handleClick}
          >
            Return
          </button>
        </div>
      </div>
    </div>
  );
}


export default ItemEditAreaComponent;