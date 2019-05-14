import React, {Component} from 'react';
import PersonListItemComponent from './PersonListItemComponent'



class PersonListItem extends Component
{
  handleClick = (event) =>
  {
    const oiId = this.state.operationIdMap[event.target.name];
    const sd = this.props.data ? this.props.data.id : null;
    this.props.actionMap.setSectionState(null, oiId, sd);
  }

  getDefaultState = () =>
  {
    const state = {};
    state.operationIdMap = {};
    state.operationIdMap.edit = 6;
    state.operationIdMap.remove = 7;
    state.operationIdMap.editSkills = 8;
    return state;
  }

  getSkillListAsString = () =>
  {
    let st = "";
    const {skillList} = this.props.data;

    if(skillList && Array.isArray(skillList))
      skillList.forEach((s) => st += (s && s.title) ? s.title + ", " : "");

    if(st.length > 1)
      st = st.substring(0, st.length - 2);

    return st;
  }

  constructor(props)
  {
    super();
    this.state = this.getDefaultState();
  }

  render()
  {
    return (
      <PersonListItemComponent
        person={this.props.data}
        handleClick={this.handleClick}
        skills={this.getSkillListAsString()}
      />
    );
  }
}


export default PersonListItem;