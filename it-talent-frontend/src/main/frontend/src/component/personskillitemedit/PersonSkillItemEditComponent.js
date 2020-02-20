import React from 'react';
import ItemEdit from '../itemedit/ItemEdit';
import './PersonSkillItemEdit.css';

const PersonSkillItemEditComponent = (props) =>
{
  return (
    <div className="personSkillItemEdit flexItemsRow">
      <h3>{props.person.name}</h3>
      <div className="flexItemsCol">
        <label>Code: {props.person.id}</label>
        <label>Age: {props.person.age}</label>
        <label>Country: {props.person.country}</label>
        <label>Email: {props.person.email}</label>
      </div>
      <ItemEdit
        allItemList={props.allItemList}
        addedItemList={props.addedItemList}
        handleAction={props.handleAction}
      />
    </div>
  );
}


export default PersonSkillItemEditComponent;