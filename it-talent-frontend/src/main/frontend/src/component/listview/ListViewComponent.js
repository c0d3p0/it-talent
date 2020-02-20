import React from 'react'
import './ListView.css';


const ListViewComponent = (props) =>
{
  let itemsComponents;
  
  if(props.hasData())
  {
    itemsComponents = props.data.map((item, index) =>
    {
      return (
        <props.listItem
          key={index}
          data={props.data[index]}
          actionMap={props.actionMap}
        />
      )
    });
  }
  else
  {
    const name = props.listName ? props.listName : "Unknown";
    itemsComponents = (
      <label className="listItem">
        No entries found in {name}s list.
      </label>
    );
  }

  return (
    <div className="listView flexItemsRow">
      {itemsComponents}
    </div>
  );
}


export default ListViewComponent;