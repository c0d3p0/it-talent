import React from 'react';
import './PersonForm.css';



const PersonFormComponent = (props) =>
{
  const p = props.person;
  const dfm = props.disabledFieldMap;
  const hc = props.handleChange;

  return (
    <div className="personForm flexItemsRow">
      <div className="flexItemsCol">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={p.name ? p.name : ""}
          disabled={dfm["name"]}
          onChange={dfm["name"] ? null : hc}
          className="itTalentTextField"
        />
      </div>

      <div className="flexItemsCol">
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={p.age ? p.age : ""}
          disabled={dfm["age"]}
          onChange={dfm["age"] ? null : hc}
          className="itTalentTextField"
        />
      </div>

      <div className="flexItemsCol">
        <label>Country:</label>
        <input
          type="text"
          name="country"
          value={p.country ? p.country : ""}
          disabled={dfm["country"]}
          onChange={dfm["country"] ? null : hc}
          className="itTalentTextField"
        />
      </div>

      <div className="flexItemsCol">
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={p.email ? p.email : ""}
          disabled={dfm["email"]}
          onChange={dfm["email"] ? null : hc}
          className="itTalentTextField"
        />
      </div>
    </div>
  );
}


export default PersonFormComponent;