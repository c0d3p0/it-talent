import React from 'react';
import './ItemEdit.css';


const ItemEditComponent = (props) =>
{
  const added = [];
  const available = [];
  
  Object.keys(props.addedItemMap).forEach((key, index) =>
  {
    const item = props.addedItemMap[key];

    if(item)
    {
      added.push((
        <button
          key={index}
          item-id={item.id}
          item-action="remove"
          onClick={props.handleClick}
          className="itTalentDarkButton itemEditItem"
        >
          {item.text} 
          <label className="itemEditButtonSign">-</label>
        </button>
      ));
    }
  });

  Object.keys(props.availableItemMap).forEach((key, index) =>
  {
    const item = props.availableItemMap[key];

    if(item)
    {
      available.push((
        <button
          key={index}
          item-id={item.id}
          item-action="add"
          onClick={props.handleClick}
          className="itTalentDarkButton itemEditItem"
        >
          {item.text} 
          <div className="itemEditButtonSign">+</div>
        </button>
      ));
    }
  });

  return (
    <div className="itemEdit">
      <div className="itemEditGroupArea">
        <label className="itemEditGroupTitle">Added</label>
        <div className="itemEditGroup">
          {added}
        </div>
      </div>      
      <div className="itemEditGroupArea">
        <label className="itemEditGroupTitle">Available</label>
        <div className="itemEditGroup">
          {available}
        </div>
      </div>
    </div>
  )
}


export default ItemEditComponent;