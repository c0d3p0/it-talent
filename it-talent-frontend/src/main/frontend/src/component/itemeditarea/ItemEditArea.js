import React, {Component} from 'react';
import ItemEditAreaComponent from './ItemEditAreaComponent';

import itTalentService from '../../service/ItTalentService';
import jsonApiService from '../../service/JsonApiService';


class ItemEditArea extends Component
{
  obtainDataFromApi = () =>
  {
    let ad;
    const adm = itTalentService.getRequestApiDataMap();
    const apiDataFields = Object.keys(adm);
    apiDataFields.forEach((key, index) =>
    {
      ad = adm[key];
      const sd = ad.appendData ?
        itTalentService.getSearchData() : null;
      jsonApiService.executeRequest(ad.url, ad.method, sd, null,
        null, this.handleGetDataCallBack, this.handleGetDataCallBack,
        {apiData: ad});
    });
  }

  handleGetDataCallBack = (responseData, extras) =>
  {
    const state = this.state;
    state.data[extras.apiData.dataKey] = responseData;
    state.message = "";
    this.setState(state);
  }

  handleErrorCallBack = (error, extras) =>
  {
    let msg = "";

    if(extras)
    {
      if(extras.apiData.method === 'GET')
        msg = "Problems to get the data from the server!";
      else if(extras.apiData.method)
        msg = "Problems to send the data to the server!"
    }

    msg += error.message
    this.setState({message: msg});
    console.log(error.message);
  }
  
  sendDataToApi = (apiKey, data, itemEditCallBack,
    itemEditCallBackData) =>
  {
    const adm = itTalentService.getSendApiDataMap();
    const ad = adm[apiKey];

    if(ad)
    {
      const extras = {}
      extras.data = data;
      extras.itemEditCallBack = itemEditCallBack;
      extras.itemEditCallBackData = itemEditCallBackData;
      const appendUrl = ad.appendData ? data : null;
      const appendBody = itemEditCallBackData.action === "add";
      const requestBody =  appendBody ? JSON.stringify(data) : null;
      jsonApiService.executeRequest(ad.url, ad.method, appendUrl,
        null, requestBody, this.handleSendDataCallBack,
        this.handleErrorCallback, extras);
    }
    else
    {
      let m = "There was a problem sending the data. \n";
      m += "Information about the API not found!";
      this.setState({message: m});
    }
  }

  handleSendDataCallBack = (json, extras) =>
  {
    const {data, itemEditCallBack, itemEditCallBackData} = extras;
    let valid = true;

    if(data && itemEditCallBack && itemEditCallBackData)
    {
      for(let identifier in data)
      {
        if(data[identifier] !== json[identifier])
        {
          valid = false;
          break;
        }
      }
    }
    else
      valid = false;

    if(valid)
    {
      const {id, action} = itemEditCallBackData;
      itemEditCallBack(id, action);
    }
    else
      this.setState({message: "Problems sending the data!"});
  }

  handleClick = (event) =>
  {
    if(event.target.name === 'return')
    {
      const oi = itTalentService.getOperationInfo();
      this.props.setSectionState(null, oi.returnOperationId);
    }
  }

  getTitle = () =>
  {
    const si = itTalentService.getSectionInfo();

    if(si.key === 'person')
      return si.name + " Skills Edit";

    return si.name + " Item Edit";
  }

  setMessage = (message) =>
  {
    this.setState({message: message});
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

  constructor(props)
  {
    super();
    this.state =
    {
      data: {},
      message: ""
    }
  }

  render()
  {
    return (
      <ItemEditAreaComponent
        title={this.getTitle()}
        componentMap={itTalentService.getComponentMap()}
        data={this.state.data}
        handleClick={this.handleClick}
        sendDataToApi={this.sendDataToApi}
        setMessage={this.setMessage}
      />
    )
  }
}



export default ItemEditArea;