import React from 'react';
import './PersonListItem.css';


const PersonListItemComponent = (props) =>
{
  let skills = props.skills ? props.skills : "No skills.";

  return (
    <div className="listItem">
      <label className="listItemTitle">
        {props.person.name}
      </label>
      <div className="listItemData">
        <div className="personListItemMainData">
          <label>Code: {props.person.id}</label>
          <label>Age: {props.person.age}</label>
          <label>Country: {props.person.country}</label>
          <label>Email: {props.person.email}</label>
        </div>
        <div className="personListItemSkillsData">
          <label className="personListItemSkillsLabel">
            Skills
          </label>
          <label>{skills}</label>
        </div>
        <div className="itTalentActions">
          <button
            name="editSkills"
            className="itTalentButton"
            onClick={props.handleClick}
          >
            Edit Skills
          </button>
          <button
            name="edit"
            className="itTalentButton"
            onClick={props.handleClick}
          >
            Edit
          </button>
          <button
            name="remove"
            className="itTalentButton"
            onClick={props.handleClick}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}



export default PersonListItemComponent;