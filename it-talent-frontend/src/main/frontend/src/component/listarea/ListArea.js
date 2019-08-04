import React, {Component} from 'react';
import ListAreaComponent from './ListAreaComponent';

import itTalentService from '../../service/ItTalentService';
import jsonApiService from '../../service/JsonApiService';


class ListArea extends Component
{
  handleGetDataCallback = (content) =>
  {
    let data;

    if(content)
    {
      if(!Array.isArray(content))
      {
        if(content.list)
          data = content.list;
        else if(Object.keys(content).length > 0)
          data = [content];
      }
      else
        data = content;
    }
    
    data = data ? data : [];
    this.setState({data: data, message: ""});
    console.log("ListArea Loaded Data");
    console.log(data);
  }

  handleErrorCallback = (error) =>
  {
    let errorMesssage = "Error loading data! ";
    errorMesssage += error ? error.message : "";
    errorMesssage.trim();
    console.log(errorMesssage);
    this.setState({data: [], message: errorMesssage});
  }

  obtainDataFromApi = () =>
  {
    let ad;
    const adm = itTalentService.getRequestApiDataMap();
    Object.keys(adm).forEach((key) =>
    {
      ad = adm[key];
      const sd = ad.appendData ?
        itTalentService.getSearchData() : null;
      jsonApiService.executeRequest(ad.url, ad.method, sd, null,
        null, this.handleGetDataCallback, this.handleErrorCallback);
    });
  }

  handleClick = (event) =>
  {
    const oiId = this.state.operationIdMap[event.target.name];
    this.props.setSectionState(null, parseInt(oiId), "");
  }

  constructor(props)
  {
    super();
    this.state =
    {
      data: [],
      operationIdMap:
      {
        newEntry: 5
      },
      actionMap:
      {
        setSectionState: props.setSectionState
      }
    };
  }

  componentDidMount()
  {
    this.obtainDataFromApi();
  }
  
  componentDidUpdate(prevProps, prevState)
  {
    if(this.props !== prevProps)
      this.obtainDataFromApi();
  }

  render()
  {
    const listName = itTalentService.getSectionName();
    const listTitle = listName + " Found";

    return (
      <ListAreaComponent
        sectionState={this.props.sectionState}
        setSectionState={this.props.setSectionState}
        componentMap={itTalentService.getComponentMap()}
        listName={listName}
        listTitle={listTitle}
        actionMap={this.state.actionMap}
        data={this.state.data}
        message={this.state.message}
        handleClick={this.handleClick}
      />
    );
  }
}



export default ListArea;