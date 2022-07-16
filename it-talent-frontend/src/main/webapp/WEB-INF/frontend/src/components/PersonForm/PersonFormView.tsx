import { IState } from "./PersonForm";

import "./PersonForm.css";


export default function PersonFormView(props: IProps) {
  if(props.editMode && !props.state.message) {
    return (
      <div className="person-form box">
        <div className="box-title">
          <h1>{`${props.state.isEditing ? "Edit" : "Add"} Person`}</h1>
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
              <label htmlFor="person-name">Name: </label>
              <input
                id="person-name"
                className="textfield-dark"
                type="text"
                placeholder="Name"
                value={props.state.name ?? ""}
                onChange={(e) => props.updateState("name", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="person-age">Age: </label>
              <input
                id="person-age"
                className="textfield-dark"
                type="text"
                placeholder="Age"
                value={props.state.age ?? ""}
                onChange={(e) => props.updateState("age", e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div className="form-field">
              <label htmlFor="person-country">Country: </label>
              <input
                id="person-country"
                className="textfield-dark"
                type="text"
                placeholder="Country"
                value={props.state.country ?? ""}
                onChange={(e) => props.updateState("country", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="person-email">Email: </label>
              <input
                id="person-email"
                className="textfield-dark"
                type="text"
                placeholder="Email"
                value={props.state.email ?? ""}
                onChange={(e) => props.updateState("email", e.target.value)}
              />
            </div>
            <div className="person-form-actions">
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
      <div className="person-form box">
        <div className="box-title">
          <h1>{`${props.state.isEditing ? "Edit" : "Add"} Person`}</h1>
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