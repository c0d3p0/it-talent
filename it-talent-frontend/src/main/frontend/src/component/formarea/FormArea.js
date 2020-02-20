import React, {Component} from 'react';
import FormAreaComponent from './FormAreaComponent';

import itTalentService from '../../service/ItTalentService';
import jsonApiService from '../../service/JsonApiService';


class FormArea extends Component
{
  getFormTitle = () =>
  {
    const type = itTalentService.getOperationInfo().type;
    let title = itTalentService.getSectionName();

    if(type)
    {
      if(type === "add")
        return title + " New Entry";
      else if(type === "edit")
        return title + " Edit";
      else if(type === "remove")
        return title + " Remove";
    }

    return title;
  }

  obtainDataFromApi = () =>
  { 
    if(itTalentService.getOperationInfo().type !== 'add')
    {
      let ad;
      const adm = itTalentService.getRequestApiDataMap();
      Object.keys(adm).forEach((key) =>
      {
        ad = adm[key];
        const sd = ad.appendData ?
          itTalentService.getSearchData() : null;
        jsonApiService.executeRequest(ad.url, ad.method, sd, null,
          null, this.handleGetDataCallback, this.handleGetDataErrorCallback);
      });
    }
    else
      this.getDefaultState();
  }

  handleGetDataErrorCallback = (error) =>
  {
    console.log(error.message);
    const errorObject = {}
    errorObject.hideConfirmButton = true;
    errorObject.message = "There was a problem retrieving the data!";
    this.setState(errorObject);
  }

  handleGetDataCallback = (data) =>
  {
    this.setState(this.getDefaultState(data));
  }

  handleSubmit = (event) =>
  {
    event.preventDefault();
    const validation = this.validateFields(event.target);

    if(validation.valid)
    {
      const adm = itTalentService.getSendApiDataMap();
      const admFields = Object.keys(adm);
      const ad = admFields.length > 0 ? adm[admFields[0]] : null;

      if(ad)
      {
        jsonApiService.executeRequest(ad.url, ad.method,
          this.state.data.id, null, JSON.stringify(validation.data),
          this.handleSubmitCallback, this.handleSubmitErrorCallback, {});
      }
      else
      {
        let m = "There was a problem sending the data. \n";
        m += "Information about the API not found!";
        this.setState({message: m});
      }
    }
    else
      this.setState({message: validation.message});
  }

  handleSubmitCallback = (json) =>
  {
    const oi = itTalentService.getOperationInfo();
    const sd = oi.type !== "remove" ? json.id : null;
    this.props.setSectionState(null, oi.nextOperationId, sd);
    this.props.setSectionState(null, oi.nextOperationId, sd);
  }

  handleSubmitErrorCallback = (error) =>
  {
    console.log(error.message);
    const m = "There was a problem sending the data. \n";
    this.setState({message: m + error.message})
  }

  validateFields = (form) =>
  {
    const validation = {data: {}}

    for(let index in this.state.fieldsNames)
    {
      let field = this.state.fieldsNames[index];

      if(!this.state.disabledFieldMap[field])
      {
        const element = form[field];

        if(!element || !element.value)
        {
          validation.message = "Please fill out the field ";
          validation.message += field + "!";
          validation.valid = false;
          return validation;
        }

        validation.data[field] = element.value;
      }
      else
        validation.data[field] = undefined;
    }

    validation.valid = true;
    return validation;
  }

  handleCancel = (event) =>
  {
    let oiId = itTalentService.getOperationInfo().returnOperationId;
    this.props.setSectionState(null, oiId, this.state.data.id);
  }

  handleChange = (event) =>
  {
    const data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({data: data, message: ""});
  }

  getDefaultState = (initData) =>
  {
    const data = initData ? initData : {};
    const oi = itTalentService.getOperationInfo();
    const dfm = itTalentService.getDisabledFieldMap();
    const state = {};
    state.data = data;
    state.hideConfirmButton = false;
    state.disabledFieldMap = dfm;
    state.fieldsNames = itTalentService.getFormFieldsNames();
    state.message = (oi && oi.type === "remove") ?
      "Do you really want to remove this entry?" : "";
    return state;
  }

  componentDidMount()
  {
    this.obtainDataFromApi();
  }

  componendDidUpdate(prevProps, prevState)
  {
    if(this.props !== prevProps)
      this.obtainDataFromApi();
  }

  constructor(props)
  {
    super();
    this.state = this.getDefaultState();
  }

  render()
  {
    return (
      <FormAreaComponent
        sectionState={this.props.sectionState}
        setSectionState={this.props.setSectionState}
        componentMap={itTalentService.getComponentMap()}
        disabledFieldMap={this.state.disabledFieldMap}
        hideConfirmButton={this.state.hideConfirmButton}
        formTitle={this.getFormTitle()}
        message={this.state.message}
        data={this.state.data}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCancel={this.handleCancel}
      />
    );
  };
}


export default FormArea;