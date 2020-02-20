import React from 'react';
import './SkillForm.css';


const SkillFormComponent = (props) =>
{
  const skill = props.skill;
  const dfm = props.disabledFieldMap;
  const hc = props.handleChange;

  return (
    <div className="skillForm flexItemsRow">
      <div className="flexItemsCol">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={skill.title ? skill.title : "" }
          disabled={dfm["title"]}
          onChange={dfm["title"] ? null : hc}
          className="itTalentTextField"
        />
      </div>

      <div className="flexItemsRow">
        <label>Description:</label>
        <textarea
          name="description"
          value={skill.description ? skill.description : ""}
          disabled={dfm["description"]}
          onChange={dfm["description"] ? null : hc}
        />
      </div>
    </div>
  );
}


export default SkillFormComponent;