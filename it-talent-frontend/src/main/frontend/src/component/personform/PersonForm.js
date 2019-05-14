import React, {Component} from 'react';
import PersonFormComponent from './PersonFormComponent';


class PersonForm extends Component
{
  render()
  {
    return (
      <PersonFormComponent
        disabledFieldMap={this.props.disabledFieldMap}
        person={this.props.data}
        handleChange={this.props.handleChange}
      />
    )
  }
}


export default PersonForm;