import React, {Component} from 'react';
import SkillFormComponent from './SkillFormComponent';

class SkillForm extends Component
{
  handleSubmit = (event) =>
  {
    event.preventDefault();
    this.props.handleSubmit(event.target, this.state.fields);
  }

  constructor(props)
  {
    super();
    this.state = 
    {
      fields: ["title", "description"],
    }
  }

  render()
  {
    return (
      <SkillFormComponent
        formTitle={this.props.formTitle}
        disabledFieldMap={this.props.disabledFieldMap}
        hideConfirmButton={this.props.hideConfirmButton}
        skill={this.props.data}
        message={this.props.message}
        handleChange={this.props.handleChange}
        handleSubmit={this.handleSubmit}
        handleCancel={this.props.handleCancel}
      />
    );
  }
}


export default SkillForm;