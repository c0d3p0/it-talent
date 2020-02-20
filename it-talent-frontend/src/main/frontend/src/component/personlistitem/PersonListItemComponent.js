import React from 'react';
import './PersonListItem.css';


const PersonListItemComponent = (props) =>
{
  let skills = props.skills ? props.skills : "No skills.";

  return (
    <div className="personListItem listItem">
      <h3>{props.person.name}</h3>
      <div className="flexItemsRow">
        <div className="flexItemsCol">
          <label>Code: {props.person.id}</label>
          <label>Age: {props.person.age}</label>
          <label>Country: {props.person.country}</label>
          <label>Email: {props.person.email}</label>
        </div>
        <div className="flexItemsRow">
          <label>Skills</label>
          <label>{skills}</label>
        </div>
        <div className="flexItemsCol">
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