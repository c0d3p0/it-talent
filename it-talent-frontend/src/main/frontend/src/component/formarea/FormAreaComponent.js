import React from 'react';


const FormAreaComponent = (props) =>
{ 
  let messageElement = props.message ? props.message : "";
  messageElement = messageElement.split('\n').map(
    (message, index) =>
    {
      return (
        <label
          key={index}
          style={{display: 'block'}}
        >
          {message}
        </label>
      );
    }
  );
  let cbtn = (<button className="itTalentButton">Confirm</button>);

  return (
    <div className="itTalentContentArea">
      <label className="sectionTitle">{props.formTitle}</label>

      <div className="itTalentForm">
        <form onSubmit={props.handleSubmit}>
          <props.componentMap.form
            disabledFieldMap={props.disabledFieldMap}
            data={props.data}
            handleChange={props.handleChange}
          />

          <div className="itTalentFormMessage">
            {messageElement}
          </div>

          <div className="itTalentActions">
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