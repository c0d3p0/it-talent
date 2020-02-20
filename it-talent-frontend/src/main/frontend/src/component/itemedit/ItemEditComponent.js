import React from 'react';
import './ItemEdit.css';


const ItemEditComponent = (props) =>
{
  function getItemElements(itemMap, action, buttonSign)
  {
    const elements = [];
    let item;
    Object.keys(itemMap).forEach((key, index) =>
    {
      item = itemMap[key];
  
      if(item)
      {
        elements.push((
          <button
            key={index}
            item-id={item.id}
            item-action={action}
            onClick={props.handleClick}
            className="itTalentDarkButton flexItemsCol"
          >
            {item.text} 
            <label onClick={props.handleClick}>{buttonSign}</label>
          </button>
        ));
      }
    });
    return elements;
  }

  const added = getItemElements(props.addedItemMap, "remove", "-");
  const available = getItemElements(props.availableItemMap, "add", "+");
  
  return (
    <div className="itemEdit flexItemsRow">
      <div className="flexItemsRow">
        <label>Added</label>
        <div className="flexItemsCol">{added}</div>
      </div>      
      <div className="flexItemsRow">
        <label>Available</label>
        <div className="flexItemsCol">{available}</div>
      </div>
    </div>
  )
}


export default ItemEditComponent;