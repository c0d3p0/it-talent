import { IAppAction } from "../../data/AppActionMap";
import Skill from "../../model/Skill";

import "./SkillList.css";


export default function SkillListView(props: IProps) {
  if(props.skills && !props.message) {
    const skillElements = createSkillElements(props);

    return (
      <div className="skill-list box">
        <div className="box-title">
          <h1>Skill List</h1>
          {createAddButton(props)}
        </div>
        <div className="box-content">
          {skillElements}
        </div>
      </div>
    );
  } else {
    const m = props.skills ? props.message : "Please wait, loading the data...";

    return (
      <div className="skill-list box">
        <div className="box-title">
          <h1>Skill List</h1>
          {createAddButton(props)}
        </div>
        <div className="message">
          {m}
        </div>
      </div>
    );
  }
}


const createAddButton = (props: IProps) => {
  return props.editMode ? (
    <div className="box-actions">
      <button
        title="Add Skill"
        className="squared-button bi bi-clipboard2-plus"
        onClick={(e) => props.onAddSkillClick()}
      />
    </div>
  ) : null;
}

const createSkillElements = (props: IProps) => {
  const elements: JSX.Element[] = [];
  props?.skills?.forEach((skill) => {
    if(skill.id !== undefined)
      elements.push(createSkillElement(props, skill));
  });
  return elements;
}

const createSkillElement = (props: IProps, skill: Skill) => {
  return (
    <div key={skill.id} className="skill-list-item">
      <div className="skill-data">
        <h2>{skill.title}</h2>
        <div>
          <label>ID: </label>
          <span>{skill.id}</span>
        </div>
        <div>
          <label>Title: </label>
          <span>{skill.title}</span>
        </div>
        <div>
          <label>Description: </label>
          <span>{skill.description}</span>
        </div>
        <div className="separator"></div>
      </div>
      {createSkillActionElement(props, skill)}
    </div>
  );
}

const createSkillActionElement = (props: IProps, skill: Skill) => {
  if(props.editMode) {
    return (
      <div className="skill-action">
        <button
          title="Show People With This Skill"
          className="squared-button bi bi-eye"
          onClick={(e) => {props.onShowPeopleWithSkillClick(skill.id?.toString())}}
        />
        <button
          title="Edit Skill"
          className="squared-button bi bi-bandaid"
          onClick={(e) => {props.onEditClick(skill.id?.toString())}}
        />
        <button
          title="Remove Skill"
          className="squared-button bi bi-clipboard2-minus"
          onClick={(e) => {props.onRemoveClick(skill)}}
        />
      </div>
    );
  }

  const m = "Please wait, loading the data..."
  return (
    <div className="skill-action">
      <button
        title="Show People With This Skill"
        className="squared-button bi bi-eye"
        onClick={(e) => {props.onShowPeopleWithSkillClick(skill.id?.toString())}}
      />
    </div>
  )
}

interface IProps {
  editMode: boolean;
  skills: Skill[] | null;
  message?: string;
  onAddSkillClick(): void;
  onShowPeopleWithSkillClick(id?: string): void;
  onEditClick(id?: string): void;
  onRemoveClick(skill: Skill): void;
}