import { IState } from "./SkillForm";

import "./SkillForm.css";


export default function SkillFormView(props: IProps) {
  if(props.editMode && !props.state.message) {
    return (
      <div className="skill-form box">
        <div className="box-title">
        <h1>{`${props.state.isEditing ? "Edit" : "Add"} Skill`}</h1>
          <div className="box-actions">
            <button
              title="Go Back"
              className="squared-button bi bi-door-open"
              onClick={(e) => props.onReturnClick()}
            />
          </div>
        </div>
        <div className="box-content">
          <form>
            <div className="form-field">
              <label htmlFor="skill-title">Title: </label>
              <input
                id="skill-title"
                className="textfield-dark"
                type="text"
                placeholder="Title"
                value={props.state.title ?? ""}
                onChange={(e) => props.updateState("title", e.target.value)}
                disabled={props.state.isEditing}
              />
            </div>
            <label htmlFor="skill-description">Description: </label>
            <textarea
              id="skill-description"
              className="textarea"
              placeholder="Description"
              value={props.state.description ?? ""}
              onChange={(e) => props.updateState("description", e.target.value)}
            />
            <div className="skill-form-actions">
              <button
                title="Clear Fields"
                className="squared-button bi bi-eraser-fill"
                onClick={(e) => {e.preventDefault(); props.onClearClick()}}
              />
              <button
                className="squared-button bi bi-check-lg"
                title="Confirm"
                onClick={(e) => {e.preventDefault(); props.onSubmit()}}
              />
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return (
      <div className="skill-form box">
        <div className="box-title">
        <h1>{`${props.state.isEditing ? "Edit" : "Add"} Skill`}</h1>
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


interface IProps {
  editMode: boolean;
  state: IState;
  updateState(type: string, value: string): void;
  onReturnClick(): void;
  onClearClick(): void;
  onSubmit(): void;
}