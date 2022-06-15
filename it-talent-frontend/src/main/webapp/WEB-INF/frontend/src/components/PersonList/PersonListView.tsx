import { IAppAction } from "../../data/AppActionMap";
import Person from "../../model/Person";

import "./PersonList.css";


export default function PersonListView(props: IProps) {
  if(!props.message && props.appAction) {
    const peopleElements = createPeopleElements(props);


    return (
      <div className="person-list box">
        <div className="box-title">
          <h1>Person List</h1>
          {createAddButton(props)}
        </div>
        <div className="box-content">
          {peopleElements}
        </div>
      </div>
    );
  } else {
    return (
      <div className="person-list box">
        <div className="box-title">
          <h1>Person List</h1>
          {createAddButton(props)}
        </div>
        <div className="message">
          {props.message}
        </div>
      </div>
    );
  }
}


const createAddButton = (props: IProps) => {
  return props.editMode ? (
    <div className="box-actions">
      <button
        title="Add Person"
        className="squared-button bi bi-clipboard2-plus"
        onClick={(e) => props.onAddPersonClick()}
      />
    </div>
  ) : null;
}

const createPeopleElements = (props: IProps) => {
  const elements: JSX.Element[] = [];
  props?.people.forEach((person) => {
    if(person.id !== undefined)
      elements.push(createPersonElement(props, person));
  });
  return elements;
}

const createPersonElement = (props: IProps, person: Person) => {
  return (
    <div key={person.id} className="person-list-item">
      <div className="person-data">
        <h2>{person.name}</h2>
        <div>
          <label>ID: </label>
          <span>{person.id}</span>
        </div>
        <div>
          <label>Name: </label>
          <span>{person.name}</span>
        </div>
        <div>
          <label>Age: </label>
          <span>{person.age}</span>
        </div>
        <div>
          <label>Country: </label>
          <span>{person.country}</span>
        </div>
        <div>
          <label>Email: </label>
          <span>{person.email}</span>
        </div>
        {createSkillListElement(props, person)}
        <div className="separator"></div>
      </div>
      {createPersonActionElement(props, person)}
    </div>
  );
}


const createPersonActionElement = (props: IProps, person: Person) => {
  if(props.editMode) {
    return (
      <div className="person-action">
        <button
          title="Show Person Skills"
          className="squared-button bi bi-eye"
          onClick={(e) => {props.onShowPersonSkillsClick(person.id?.toString())}}
        />
        <button
          title="Edit Person Skills"
          className="squared-button bi bi-award"
          onClick={(e) => {props.onEditPersonSkillsClick(person.id?.toString())}}
        />
        <button
          title="Edit Person"
          className="squared-button bi bi-bandaid"
          onClick={(e) => {props.onEditClick(person.id?.toString())}}
        />
        <button
          title="Remove Person"
          className="squared-button bi bi-clipboard2-minus"
          onClick={(e) => {props.onRemoveClick(person)}}
        />
      </div>
    )
  }

  return (
    <div className="person-action">
      <button
        title="Show Person Skills"
        className="squared-button bi bi-eye"
        onClick={(e) => {props.onShowPersonSkillsClick(person.id?.toString())}}
      />
    </div>
  );
}

const createSkillListElement = (props: IProps, person: Person) => {
  const items = person.skillList?.map((skill) => {
    return (
      <button
        title="Show Skill"
        onClick={(e) => props.onSkillClick(skill.id?.toString())}
      >
        {skill.title}
      </button>
    );
  });

  return items && items.length > 0 ? (
    <div>
      <label>Skills: </label>
      <div className="item-list">{items}</div>
    </div>
  ) : null;
}

interface IProps {
  editMode: boolean;
  appAction?: IAppAction;
  people: Person[];
  message?: string;
  onAddPersonClick(): void;
  onSkillClick(id? : string): void;
  onEditClick(id?: string): void;
  onRemoveClick(person: Person): void;
  onShowPersonSkillsClick(id?: string): void;
  onEditPersonSkillsClick(id?: string): void;
}