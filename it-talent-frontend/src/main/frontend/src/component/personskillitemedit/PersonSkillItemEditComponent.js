import React from 'react';
import ItemEdit from '../itemedit/ItemEdit';
import './PersonSkillItemEdit.css';

const PersonSkillItemEditComponent = (props) =>
{
  return (
    <div className="personSkillEditItemContent">
      <label className="listItemTitle">
        {props.person.name}
      </label>
      <div className="listItemData">
        <div className="personSkillItemEditData">
          <label>Code: {props.person.id}</label>
          <label>Age: {props.person.age}</label>
          <label>Country: {props.person.country}</label>
          <label>Email: {props.person.email}</label>
        </div>
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