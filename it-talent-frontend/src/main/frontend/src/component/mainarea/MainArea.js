import React, {Component} from 'react';
import MainAreaComponent from './MainAreaComponent';

import itTalentService from '../../service/ItTalentService';
import jsUtil from '../../util/JSUtil';


class MainArea extends Component
{
  setSectionState = (sectionInfoId, operationInfoId, searchData) =>
  {
    const attributes = {};

    if(jsUtil.isNumber(sectionInfoId))
      attributes.sectionInfoId = sectionInfoId;

    if(jsUtil.isNumber(operationInfoId))
      attributes.operationInfoId = operationInfoId;

    if(!jsUtil.isEmptyObject(searchData))
      attributes.searchData = searchData;

    if(Object.keys(attributes).length > 0)
    {
      let ss = Object.assign({}, this.state.sectionState);
      ss = Object.assign(ss, attributes);
      this.setState({sectionState: ss});
      itTalentService.setSectionState(ss);
    }
  }

  constructor()
  {
    super();
    this.state = 
    {
      sectionState:
      {
        sectionInfoId: 0,
        operationInfoId: 0,
        searchData: null
      }
    };
    itTalentService.setSectionState(this.state.sectionState);
  }
  
  render()
  {
    return (
      <MainAreaComponent
        sectionState={this.state.sectionState}
        setSectionState={this.setSectionState}
        contentArea={itTalentService.getComponent()}
      />
    )
  }
}


export default MainArea;