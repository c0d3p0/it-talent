import React, {Component} from 'react';
import SkillListItemComponent from './SkillListItemComponent';


class SkillListItem extends Component
{
  handleClick = (event) =>
  {
    const ss = this.state.sectionStateMap[event.target.name];
    const sd = this.props.data ? this.props.data.id : null;
    this.props.actionMap.setSectionState(ss.sectionInfoId,
      ss.operationInfoId, sd);
  }

  getDefaultState = () =>
  {
    const state =
    {
      sectionStateMap:
      {
        findPeople: {sectionInfoId: 0, operationInfoId: 3},
        edit: {operationInfoId: 6},
        remove: {operationInfoId: 7},
      }
    };
    return state;
  }

  constructor(props)
  {
    super();
    this.state = this.getDefaultState();
  }

  render()
  {
    return (
      <SkillListItemComponent
        skill={this.props.data}
        handleClick={this.handleClick}
      />
    );
  }
}


export default SkillListItem;