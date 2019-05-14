import React, {Component} from 'react';
import PersonSkillItemEditComponent from
  './PersonSkillItemEditComponent';


class PersonSkillItemEdit extends Component
{
  handleAction = (id, action, itemEditCallBack) =>
  {
    if(id && this.state.person.id)
    {
      const personSkill = {};
      personSkill.personId = this.state.person.id;
      personSkill.skillId = parseInt(id, 10);
      const itemEditCallBackData = {};
      itemEditCallBackData.id = id;
      itemEditCallBackData.action = action;
      this.props.sendDataToApi(this.state.actionMap[action],
        personSkill, itemEditCallBack, itemEditCallBackData);
    }
    else
      this.props.setMessage("Problems creating the data to send!");
  }

  componentDidMount()
  {
    this.updateStateData();
  }

  componentDidUpdate(prevProps, prevState)
  {
    if(this.props !== prevProps)
      this.updateStateData();
  }

  updateStateData = () =>
  {
    if(this.props.data)
    {
      const state = {}
      state.addedItemList = this.getAddedItemList();
      state.allItemList = this.getAllItemList();
      state.person = this.props.data.person ? this.props.data.person : {};
      this.setState(state);
    }
  }

  getAddedItemList = () =>
  {
    const {person} = this.props.data;

    if(person && person.skillList)
    {
      return person.skillList.map(
        (skill) => {return {id: skill.id, text: skill.title}});
    }

    return [];
  }

  getAllItemList = () =>
  {
    const {skill} = this.props.data;

    if(skill && skill.list)
    {
      return skill.list.map(
        (skill) => {return {id: skill.id, text: skill.title}});
    }

    return [];
  }
  
  constructor(props)
  {
    super();
    this.state = 
    {
      actionMap: {add: 'add1', remove: 'remove1'},
      person: {},
      allItemList: [],
      addedItemList: [],
    }
  }

  render()
  {
    return (
      <PersonSkillItemEditComponent
        person={this.props.data.person ? this.props.data.person : {}}
        allItemList={this.state.allItemList}
        addedItemList={this.state.addedItemList}
        handleAction={this.handleAction}
      />
    );
  }
}


export default PersonSkillItemEdit;