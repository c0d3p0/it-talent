import React from 'react';
import './ItemEditArea.css';


const ItemEditAreaComponent = (props) =>
{ 
  let messageElement = props.message ? props.message : "";
  messageElement = messageElement.split('\n').map(
    (message, index) =>
    {
      return (
        <label
          key={index}
          style={{display: 'block'}}
        >
          {message}
        </label>
      );
    }
  );

  return (
    <div className="itTalentContentArea">
      <label className="sectionTitle">
        {props.title}
      </label>
      <div className="itemEditArea">
        <props.componentMap.itemEditManager
          data={props.data}
          sendDataToApi={props.sendDataToApi}
          setMessage={props.setMessage}
        />
        <div className="itTalentFormMessage">
          <label>{messageElement}</label>  
        </div>
        <div className="itTalentActions">
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