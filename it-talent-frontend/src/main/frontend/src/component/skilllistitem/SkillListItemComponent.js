import React from 'react';
import './SkillListItem.css';



const SkillListItemComponent = (props) =>
{
  return (
    <div className="skillListItem listItem flexItemsRow">
      <h3>{props.skill.title}</h3>
      <div className="flexItemsRow">
        <div className="flexItemsRow">
        <label>Code: {props.skill.id}.</label>
          <label>Description: {props.skill.description}</label>
        </div>
        <div className="flexItemsCol">
          <button
            name="findPeople"
            className="itTalentButton"
            onClick={props.handleClick}
          >
            Find People
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



export default SkillListItemComponent;