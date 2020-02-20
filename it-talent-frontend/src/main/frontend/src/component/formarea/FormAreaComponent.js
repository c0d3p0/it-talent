import React from 'react';

import "./FormArea.css";


const FormAreaComponent = (props) =>
{ 
  let messages = props.message ? props.message : "";
  messages = messages.split('\n');
  const messageElement = messages.map((message, index) =>
  {
    return (
      <label
        key={index}
        style={{display: 'block'}}
      >
        {message}
      </label>
    );
  });
  let cbtn = (<button className="itTalentButton">Confirm</button>);

  return (
    <div className="formArea contentArea flexItemsRow">
      <label className="sectionTitle">{props.formTitle}</label>
      <div className="flexItemsRow">
        <form onSubmit={props.handleSubmit}>
          <props.componentMap.form
            disabledFieldMap={props.disabledFieldMap}
            data={props.data}
            handleChange={props.handleChange}
          />

          <div className="itTalentFormMessage">
            {messageElement}
          </div>

          <div className="flexItemsCol">
            <button
              type="button"
              onClick={props.handleCancel}
              className="itTalentButton"
            >
              Cancel
            </button>
            {!props.hideConfirmButton ? cbtn : null}
          </div>
        </form>
      </div>
    </div>
  );
}


export default FormAreaComponent;