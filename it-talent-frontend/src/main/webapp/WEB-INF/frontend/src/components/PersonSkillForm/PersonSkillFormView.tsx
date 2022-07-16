import { IState } from "./PersonSkillForm";
import Skill from "../../model/Skill";

import "./PersonSkillForm.css";


export default function PersonSkillFormView(props: IProps) {
  if(props.editMode && !props.state.message) {
    return (
      <div className="person-skill-form box">
        <div className="box-title">
          <h1>Edit Person Skills</h1>
          <div className="box-actions">
            <button
              title="Go Back"
              className="squared-button bi bi-door-open"
              onClick={(e) => props.onReturnClick()}
            />
          </div>
        </div>
        <div className="box-content">
          <div className="form-field">
            <label htmlFor="person-id">ID: </label>
            <span>{props.state.person?.id}</span>
          </div>
          <div className="form-field">
            <label htmlFor="person-id">Name: </label>
            <span>{props.state.person?.name}</span>
          </div>
          <div className="form-field">
            <div className="item-groups">
              <label>Available: </label>
              {createAvailableSkillsElements(props)}
            </div>
            <div className="item-groups">
              <label>Added: </label>
              {createAddedSkillsElements(props)}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="person-skill-form box">
        <div className="box-title">
          <h1>Edit Person Skills</h1>
          <div className="box-actions">
            <button
              title="Go Back"
              className="squared-button bi bi-door-open"
              onClick={(e) => props.onReturnClick()}
            />
          </div>
        </div>
        <div className="message">
          {props.state.message}
        </div>
      </div>
    );
  }
}


const createAvailableSkillsElements = (props: IProps) => {
  const elements = props.state.availableSkills?.map((skill) => (
    <button
      className="button"
      title={`Remove Skill ${skill.title}`}
      onClick={(e) => props.onAddSkillClick(skill)}
    >
      {skill.title}
    </button>
  ));

  return (<div>{elements}</div>);
}

const createAddedSkillsElements = (props: IProps) => {
  const elements = props.state.person?.skillList?.map((skill) => (
    <button
      className="button"
      title={`Remove Skill ${skill.title}`}
      onClick={(e) => props.onRemoveSkillClick(skill)}
    >
      {skill.title}
    </button>
  ));

  return (<div>{elements}</div>);
}


interface IProps {
  editMode: boolean;
  state: IState;
  onReturnClick(): void;
  onAddSkillClick(skill: Skill): void;
  onRemoveSkillClick(skill: Skill): void;
}