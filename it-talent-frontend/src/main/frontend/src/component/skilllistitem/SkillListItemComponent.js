import React from 'react';
import './SkillListItem.css';



const SkillListItemComponent = (props) =>
{
  return (
    <div className="listItem">
      <label className="listItemTitle">
        {props.skill.title}
      </label>
      <div className="listItemData">
        <div className="skillsListItemData">
          <label className="listItemData">
            Code: {props.skill.id}
          </label>
          <label className="listItemData">
            Description: {props.skill.description}
          </label>
        </div>
        <div className="itTalentActions">
          <button
            name="findPeople"
            className="itTalentButton skillsButton"
            onClick={props.handleClick}
          >
            Find People
          </button>
          <button
            name="edit"
            className="itTalentButton skillsButton"
            onClick={props.handleClick}
          >
            Edit
          </button>
          <button
            name="remove"
            className="itTalentButton skillsButton"
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